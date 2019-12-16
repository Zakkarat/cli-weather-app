const axios = require('axios');

const appIds = [
    { type: "weather", APPID: "9b56af47f5baa2ff8c03fde75ad1993a" },
    { type: "forecast", APPID: "e1403e6bd9381734b9ef1b0163cf00f7" }
  ]


const fetcher = async(l = process.argv[2], units, {type} = appIds[0], {APPID} = appIds[0] ) => {
    if(type !== 'today') {
        type = appIds[1].type;
        APPID = appIds[1].APPID;
    } else {
        type = appIds[0].type;
    }
  return await axios(
    `https://api.openweathermap.org/data/2.5/${
      type
    }?q=${l}&units=${units}&APPID=${APPID}`
  ).then(response => {
      console.log(response.data);
      return response.data;
  })
}

module.exports = fetcher;