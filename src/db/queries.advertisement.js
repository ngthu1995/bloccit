const Advertisement = require("./models").Advertisement;

module.exports = {
  getAllAdvertisement(callback) {
    return Advertisement.all()
      .then(advertisement => {
        callback(null, advertisement);
      })
      .catch(err => {
        callback(err);
      });
  }
};
