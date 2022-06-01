const { DataTypes } = require('sequelize');

const Tracking = global.DB.define('tracking', {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  employerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const Status = global.DB.define('status', {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  stage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Tracking.hasMany(Status, {
  foreignKey: 'trackingId',
  sourceKey: '_id',
});

Status.belongsTo(Tracking, {
  foreignKey: 'trackingId',
  targetKey: '_id',
});

const runMigration = async (force) => {
  if (!global.DB) {
    return Promise.reject(new Error('please initialize DB'));
  }
  await Tracking.sync({ force });
  await Status.sync({ force });
  return Promise.resolve(global.DB);
};

module.exports = { Tracking, Status, runMigration };
