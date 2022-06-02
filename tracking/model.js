const mongoose = require('mongoose');

const TrackingSchema = new mongoose.Schema({
  jobId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  resume: String,
  coverLetter: String,
  answers: mongoose.Schema.Types.Mixed,
  date: Date,
  status: {
    type: String,
    enum: ['RECEIVED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED'],
  },
});

const Tracking = mongoose.model('tracking', TrackingSchema);

module.exports = { Tracking };
