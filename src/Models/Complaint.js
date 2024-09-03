const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    text: { type: String, required: true },
    resolved: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
