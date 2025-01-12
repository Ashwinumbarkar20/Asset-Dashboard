// models/Asset.js
const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["laptop", "desktop", "workstation"],
    required: true,
  },
  assigned_to: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: [
      "in_use",
      "available",
      "repair",
      "in_transit",
      "delivered",
      "recycle",
      "ready_to_retire",
      "lost_stolen",
    ],
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  purchase_date: {
    type: Date,
    required: true,
  },
  warranty_start_date: {
    type: Date,
    required: true,
  },
  warranty_end_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Asset", assetSchema);
