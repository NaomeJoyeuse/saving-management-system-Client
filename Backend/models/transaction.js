'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      accountId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'id',
        },
      },
      type: {
        type: DataTypes.ENUM('DEPOSIT', 'WITHDRAW'),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      balanceBefore: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      balanceAfter: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'transactions',
      timestamps: false,
      updatedAt: false,
    }
  );

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Account, { foreignKey: 'accountId' });
  };

  return Transaction;
};