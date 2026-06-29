const routes = require('express').Router();

const {
  addProject,
  approveProject,
  rejectProject,
  studentProjects,teacherProjects,
  deleteProject
} = require('../controllers/projectController');

routes.post('/api/addproject', addProject);

routes.patch('/project/approve/:id', approveProject);

routes.patch('/project/reject/:id', rejectProject);

routes.delete('/api/delete/project/:id', deleteProject);

routes.get('/api/student/projects', studentProjects);
routes.get("/api/teacher/projects", teacherProjects);

module.exports = routes;