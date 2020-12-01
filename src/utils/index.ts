import * as fs from 'fs';
import axios from 'axios';

const BASE_URL = 'https://adventofcode.com/2020/day';

export const openFileAsList = (path: string) => {
	const buffer = fs.readFileSync(path);
	const value = buffer.toString();

	return value.split('\n');
}

export const fetchInput = (day: number) =>
	axios.get(`${BASE_URL}/${day}/input`, {
		headers: {
			Cookie: 'session=53616c7465645f5fb45ff3d41c12fe79b6f803853309ad0a28504612cfd2ee01110ab5d77d5412dec058e8637024f179'
		}
	})
	.then(response => response.data)
	.catch((error) => {
		console.error(error);
	});