module.exports = (sequelize, Sequelize) => {
  const Airfield = sequelize.define("airfield", {
    name: {
      type: Sequelize.STRING
    },
    airforces: {
      type: Sequelize.STRING
    },
    station_num: {
      type: Sequelize.STRING
    }
    ,
    raf_squadrons: {
      type: Sequelize.STRING
    },
    usaaf_squadrons: {
      type: Sequelize.STRING
    }
    ,
    all_squadrons: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.STRING
    },
    long: {
      type: Sequelize.STRING
    }
    ,
    coordinates: {
      type: Sequelize.STRING
    },
    url_wikipedia: {
      type: Sequelize.STRING
    },
    url_other: {
      type: Sequelize.STRING
    },
    notes: {
      type: Sequelize.STRING
    }
  });

  return Airfield;
};
