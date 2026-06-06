const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  id: { type: Number, required: true, index: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  user: { type: String, required: true },
  location: { type: String },
  status: { type: String, default: 'Pendiente' },
  time: { type: String },
  approved: { type: Boolean, default: false },
  geocoded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.models.Report || mongoose.model('Report', ReportSchema);
