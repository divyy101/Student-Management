const divy = require("../models/studentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { upload } = require("../files/files");

const addstudent = async (req, res) => {
  try {
    const data = await divy.create(req.body);

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const getStudent = async (req, res) => {
  try {
    const data = await divy.find();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const data = await divy.findById(req.params.id).select("name email");

    if (!data) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const responseData = {
      name: data.name,
      email: data.email,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const data = await divy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const delStudent = async (req, res) => {
  try {
    const data = await divy.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Student deleted successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    const loginData = await divy.findOne({ email });

    if (!loginData) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const match = await bcrypt.compare(password, loginData.password);

    if (!match || loginData.role !== role) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        email: loginData.email,
        role: loginData.role,
      },
      "secretkey"
    );

    return res.status(200).json({
      token,
      id: loginData._id,
      role: loginData.role,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const uploadFiles = async (req, res) => {
  try {
    res.status(200).json({
      message: "File Uploaded Successfully",
      file: req.file,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const teachers = async (req, res) => {
  try {
    const allTeachers = await divy.find({
      role: "Teacher",
    });

    res.status(200).json(allTeachers);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  addstudent,
  getStudent,
  getStudentById,
  updateStudent,
  delStudent,
  loginStudent,
  uploadFiles,
  teachers,
};