const { Teacher } = require('../models');  // Import the Teacher model

// Create teacher function
exports.createTeacher = async (req, res) => {
  try {
    const { name, subject, gender, activeStatus } = req.body;
    const newTeacher = await Teacher.create({
      name,
      subject,
      gender,
      activeStatus
    });
    res.status(201).send(newTeacher);  // Send back the created teacher
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).send({ message: 'Error creating teacher' });
  }
};

// Get all teachers function
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.status(200).send(teachers);  // Send back the list of teachers
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).send({ message: 'Error fetching teachers' });
  }
};

// Get teacher by ID function
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id); // Find teacher by primary key (ID)
    if (!teacher) {
      return res.status(404).send({ message: 'Teacher not found' });
    }
    res.status(200).send(teacher);  // Send back the teacher
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).send({ message: 'Error fetching teacher' });
  }
};

// Update teacher function
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id); // Find the teacher by ID
    if (!teacher) {
      return res.status(404).send({ message: 'Teacher not found' });
    }

    // Update the teacher details
    const { name, subject, gender, activeStatus } = req.body;
    teacher.name = name || teacher.name;
    teacher.subject = subject || teacher.subject;
    teacher.gender = gender || teacher.gender;
    teacher.activeStatus = activeStatus || teacher.activeStatus;

    await teacher.save();  // Save the updated teacher

    res.status(200).send(teacher);  // Send back the updated teacher
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).send({ message: 'Error updating teacher' });
  }
};

// Delete teacher function
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id); // Find the teacher by ID
    if (!teacher) {
      return res.status(404).send({ message: 'Teacher not found' });
    }

    await teacher.destroy();  // Delete the teacher

    res.status(200).send({ message: 'Teacher deleted successfully' });  // Send success message
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).send({ message: 'Error deleting teacher' });
  }
};
