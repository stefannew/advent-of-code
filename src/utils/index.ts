import * as fs from 'fs';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://adventofcode.com/2020/day';
const SESSION_TOKEN = process.env.SESSION_TOKEN;

export const openFileAsList = (path: string) => {
	const buffer = fs.readFileSync(path);
	const value = buffer.toString();

	return value.split('\n');
}

export const fetchInput = (day: number) =>
	axios.get(`${BASE_URL}/${day}/input`, {
		headers: {
			Cookie: `session=${SESSION_TOKEN}`
		}
	})
	.then(response => response.data)
	.catch((error) => {
		console.error(error);
	});