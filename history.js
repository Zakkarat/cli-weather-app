const fs = require("fs");

const writeToHistory = (location) => {
  fs.appendFile("./history.txt", location, err => {
    if (err) {
      return console.log(err);
    }
  });
};

const readHistory = () => {
  fs.readFile('./history.txt', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
  });
}

module.exports = {writeToHistory, readHistory};

