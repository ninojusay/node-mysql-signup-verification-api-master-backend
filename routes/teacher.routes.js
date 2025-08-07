const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller'); // Ensure the controller is imported correctly

// POST route to create a teacher
router.post('/', teacherController.createTeacher);

// GET route to retrieve all teachers
router.get('/', teacherController.getTeachers);

// GET route to retrieve a teacher by ID
router.get('/:id', teacherController.getTeacherById); // Ensure this route exists

// PUT route to update a teacher by ID
router.put('/:id', teacherController.updateTeacher);

// DELETE route to delete a teacher by ID
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
