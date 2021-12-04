import * as dotenv from 'dotenv';
import axios  from 'axios';

dotenv.config();

const BASE_URL = 'https://adventofcode.com/2021/day';
const SESSION_TOKEN = process.env.SESSION_TOKEN;

export const fetchInput = async (day: number) => {
	return axios.get<string>(`${BASE_URL}/${day}/input`, {
		headers: {
			Cookie: `session=${SESSION_TOKEN}`
		}
	})
		.then(response => response.data);
}

export const toNumberArray = (response: string) => {
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