import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const BASE_URL = 'https://adventofcode.com';
const SESSION_TOKEN = process.env.SESSION_TOKEN;

export const fetchInput = async (year: number, day: number) => {
  return axios.get<string>(`${BASE_URL}/${year}/day/${day}/input`, {
    headers: {
      Cookie: `session=${SESSION_TOKEN}`
    }
  })
    .then(response => response.data);
}

export const toNumberArray = (response: string) =>
  response
    .split(',')
    .filter(x => x.length >= 0 || x !== '')
    .map(x => parseInt(x));

export const multiLineToNumberArray = (response: string) => {
  return response
    .split('\n')
    .filter(x => x.length >= 0 || x !== '')
    .map(x => parseInt(x))
}

export const invert = obj => {
  const new_obj = {};

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      new_obj[obj[prop]] = prop;
    }
  }

  return new_obj;
}
