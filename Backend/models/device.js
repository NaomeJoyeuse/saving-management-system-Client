'use strict';
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define(
    'Device',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      deviceId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'devices',
      timestamps: false,
      updatedAt: false,
    }
  );

  Device.associate = (models) => {
    Device.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Device;
};