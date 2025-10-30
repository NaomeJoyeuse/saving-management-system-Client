'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      balance: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'accounts',
      timestamps: true,
    }
  );

  Account.associate = (models) => {
    Account.belongsTo(models.User, { foreignKey: 'userId' });
    Account.hasMany(models.Transaction, { foreignKey: 'accountId', onDelete: 'CASCADE' });
  };

  return Account;
};