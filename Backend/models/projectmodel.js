const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      
    },

    project: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    }, status: {
      type: String,
      enum: ["pending", "approved", "rejected", "Pending", "Approved", "Rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Project", projectSchema);