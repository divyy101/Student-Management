const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    num: Number,
    role: {
      type: String,
      enum: ["Student", "Teacher", "Management"],
      default: "Student"
    }
  },
  {
    timestamps: true
  }
);

studentSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) {
      return;
    }

    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw error;
  }
});
module.exports = mongoose.model("Student", studentSchema);