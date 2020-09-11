'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    idUsers: DataTypes.INTEGER,
    title: DataTypes.INTEGER,
    content: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    models.Event.belongsTo(models.User,{
      foreignkey:{
        allowNull:false
      }
    });
  };
  return Event;
};