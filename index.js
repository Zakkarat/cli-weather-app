const fetcher = require("./dataFetcher");
const { celsium, days, currents } = require("./dictionary.json");
const {writeToHistory, readHistory} = require("./history");
const main = async () => {
  const args = toFetchArgs(argsToObject());
  console.log(args)
  const data = await fetcher(args.l, args.units, args.r);
  if(Object.keys(args).some(elem => elem === 'h')) {
    readHistory();
    return 0;
  }
  data.list
    ? toConsoleSpec(data, args.l)
    : toConsoleCurr(data);
  return data;
};

const argsToObject = () => {
  const args = process.argv
    .slice(2, process.argv.length)
    .map(elem => elem.split("="));
  return args.reduce((acc, curr) => {
    acc[curr[0].slice(2, curr[0].length)] = curr[1];
    return acc;
  }, {});
};

const toFetchArgs = args => {
  if (celsium.some(str => str === args.units)) {
    args.units = "metric";
  } else {
    args.units = "imperial";
  }
  if(args.l.includes(',')) {
    args.l = args.l.split(',');
  }
  return args;
};

const toConsoleCurr = (data) => {
  const { name, weather, main, wind, sys, dt } = data;
  const status = weather[0].main;
  let { temp } = main;
  const { speed } = wind;
  const { country } = sys;
  const date = new Date(dt * 1000);
  console.log(`${name} ${country} ${date.toDateString()}`);
  console.log(`Status: ${status}`);
  console.log(`Temperature: ${temp}`);
  console.log(`Wind speed: ${speed}`);
  writeToHistory(name + '\n')
};

const toConsoleSpec = ({ list }, location) => {
  list.forEach(elem => (elem.dt = new Date(elem.dt * 1000)));
  list = list.filter(elem => !(list.indexOf(elem) % 9));
  console.log(`------------------------`)
  console.log(`Day | Temp | Wind Speed `)
  console.log(`------------------------`)
  list.forEach(elem => console.log(`${days[elem.dt.getDay()].slice(0,3)} |  ${Math.floor(elem.main.temp)}  |      ${Math.floor(elem.wind.speed)}`));
  console.log(`------------------------`)
  writeToHistory(location + '\n');
};

main();
