
'use strict';

var fs = require ('fs');
var erisC = require('eris-contracts');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var erisdbURL = "http://172.141.20.7:1337/rpc";

// get the abi and deployed data squared away
var contractData = require('./epm.json');
var idisContractAddress = contractData["Bank"];
var idisAbi = JSON.parse(fs.readFileSync("./abi/" + idisContractAddress));

// properly instantiate the contract objects manager using the erisdb URL
// and the account data (which is a temporary hack)
var accountData = require('./accounts.json');
var contractsManager = erisC.newContractManagerDev(erisdbURL, accountData.mibuspaychain_full_000);

// properly instantiate the contract objects using the abi and address
var idisContract = contractsManager.newContractFactory(idisAbi).at(idisContractAddress);

var addressSetSub;

export function index(req, res) {
  return res.json({ resultado: 10 });
}

// Send recharge to BCE
export function sendRecharge(req, res) {
  var phoneNumber = req.body.phoneNumber;
  var amount = req.body.amount;
  var identityCard = req.body.identityCard;
  var soap = require('soap');

  var auth = "Basic " + new Buffer("UsrVLLumiquingaHK1" + ":" + "fa7d55facc").toString("base64");

  var url = 'https://test.dineroelectronico.ec/mts_bce/services/MTSService?wsdl';
  var moment = require("moment");
  var utfi = moment().unix();

  var args = {"dtoRequestCobroConfirm": {
            "amount": parseFloat(amount),
            "brandId": 1,
            "currency": 1,
            "document": identityCard,
            "language": "ES",
            "msisdnSource": phoneNumber,
            "msisdnTarget": "UsrVLLumiquingaHK1",
            "password": "fa7d55facc",
            "pin": "fa7d55facc",
            "user": "UsrVLLumiquingaHK1",
            "utfi": utfi
          }};
  soap.createClient(url, { wsdl_headers: {Authorization: auth}, endpoint: "https://test.dineroelectronico.ec/mts_bce/services/MTSService.MTSServiceHttpsSoap11Endpoint/" }, function(err, client) {
    if (err) {
      var errorCode = -1;
      var resultMessage = "Ha ocurrido un error intenta nuevamente más tarde.";
      return res.json({errorCode, resultMessage});
    };
    client.setSecurity(new soap.BasicAuthSecurity('UsrVLLumiquingaHK1','fa7d55facc'));

    client.cobroConfirm(args, function(err, result) {
      if (err != null) {
        console.log("1");
        var errorCode = 500;
        var resultMessage = "Ha ocurrido un error intenta nuevamente más tarde.";
        return res.json({errorCode, resultMessage});
      };

      var errorCode = result.return.codeErrorId;
      var resultMessage = result.return.resultText;
      if(errorCode != -1){
        return res.json({ errorCode, resultMessage });
      } else {
        registerNewAccount(identityCard, amount, resultMessage, res);
      }
      console.log("2");
      console.log(errorCode);
      
      console.log(JSON.stringify(result));
      console.log(result.resultText);
      
    });
  });

  
  function registerNewAccount(identityCard, amount, resultMessage, res) {
    var amountinCents = parseInt((parseFloat(amount) * 100), 10);
    var valueHex = toHex(identityCard);
    idisContract.registerNewAccount(valueHex, function(error, result){
      if (error) { return res.json({ errorCode: 500, resultMessage: "Ha ocurrido un error intenta nuevamente más tarde." }); }
      console.log("Create account:\t\t\t" + result.toNumber()); 
      endow(identityCard, amountinCents, resultMessage, res);
    });
  }

  function endow(user, ammount, message, res) {
    var userHex = toHex(user);
    var messageHex = toHex(message);
    idisContract.endow(userHex, ammount, messageHex, function(error, result){
      if (error) {return res.json({ errorCode: 500, resultMessage: "Ha ocurrido un error intenta nuevamente más tarde." });}
      console.log("endow for user\t\t\t" +  user  + " " + result.toNumber()); 
      return res.json({ errorCode: -1, resultMessage: message });
    });
  }

}
