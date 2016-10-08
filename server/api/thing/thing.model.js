'use strict';

import mongoose from 'mongoose';

var ThingSchema = new mongoose.Schema({
  identityCard: String,
  amount: Number,
  phoneNumber: String,
  type: Number,
  message: String
}, { timestamps: { createdAt: 'created_at' } });

export default mongoose.model('transaction', ThingSchema);
