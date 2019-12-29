const fs = require("fs");

const writeToFav = (location) => {
  fs.appendFile("./favourites.txt", location, err => {
    if (err) {
      return console.log(err);
    }
  });
};

const readFav = () => {
  return fs.readFile('./favourites.txt', (err, data) => {
    if (err) throw err;
    return data.toString();
  });
}

const addToFav = (loc) => {
  const data = readFav();

}

module.exports = {addToFav, removeFromFav};

