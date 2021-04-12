module.exports = (sequelize, Sequelize) => {
  const Airfield = sequelize.define("airfield", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Airfield;
};
