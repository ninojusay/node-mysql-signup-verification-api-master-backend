module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name cannot be empty' },  // Custom validation
      },
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activeStatus: {
      type: DataTypes.STRING,
      defaultValue: 'Active',
    },
  }, {
    timestamps: true, // Automatically handles 'createdAt' and 'updatedAt'
  });

  return Teacher;
};
