const axios = require('axios');

const {appIds, currents} = require('./dictionary.json')

const fetcher = async(l = process.argv[2], units, range = 'weather', {type} = appIds[0], {APPID} = appIds[0] ) => {
    if(!currents.some(elem => elem === range)) {
        type = appIds[1].type;
        APPID = appIds[1].APPID;
    }
  return await axios(
    `https://api.openweathermap.org/data/2.5/${
      type
    }?${Array.isArray(l) ? `lat=${l[0]}&lon=${l[1]}` : `q=${l}`}&units=${units}&APPID=${APPID}`
  ).then(response => {
      return response.data;
  })
}

module.exports = fetcher;
