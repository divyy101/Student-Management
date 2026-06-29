const route = require('express').Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { upload } = require('../files/files');

const {
  getStudent,
  addstudent,
  delStudent,
  updateStudent,
  loginStudent,
  uploadFiles,
  getStudentById,
  teachers
} = require('../controllers/crudcontroller');

route.post('/register', addstudent);

route.get('/api/dashboard/:id', getStudentById);

route.get('/details',  getStudent);

route.put('/details/:id',  updateStudent);

route.delete('/details/:id',  delStudent);

route.post('/login', loginStudent);

route.post('/upload', upload.single('files'), uploadFiles);

route.get('/api/teachers', teachers);
route.get('/api/allteachers', teachers);

module.exports = route;