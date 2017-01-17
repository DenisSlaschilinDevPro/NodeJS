let pictures = require('./pictures');

class Picture {
  static getRandomUrl() {
    const numberOfUrls = pictures.length;
    let randomPictureUrlIndex = Math.floor((Math.random() * numberOfUrls));

    return pictures[randomPictureUrlIndex];
  }
}

module.exports = Picture;
