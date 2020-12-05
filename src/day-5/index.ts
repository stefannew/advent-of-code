import { fetchInput } from '../utils';

type Section = 'F' | 'B' | 'L' | 'R';

export const ROW_RANGE = Array.from(Array(128).keys());
export const COL_RANGE = Array.from(Array(8).keys());

export const takeHalf = (array: number[], half: Section) => {
	return (half === 'F' || half === 'L') ? array.slice(0, array.length / 2) : array.slice(array.length / 2);
}

export const findValue = (sections: string, range: number[]) => {
	let res = range;

	sections.split('').forEach(section => {
		res = takeHalf(res, section as Section);
	});

	return res[0];
}

export const getSeatNumber = (boardingPass: string) => {
	const firstSeven = boardingPass.slice(0, 6);
	const lastThree = boardingPass.slice(7);

	const row = findValue(firstSeven, ROW_RANGE);
	const column = findValue(lastThree, COL_RANGE);

	return (row * 8) + column;
}

const init = async () => {
	const boardingPasses = await fetchInput(5).then(data => data.split('\n'));
	const seatNumbers = boardingPasses.map(getSeatNumber);
	const highestSeatNumber = seatNumbers.reduce((acc, curr) => curr > acc ? curr : acc);

	console.log('Part 1 - Highest Seat Number:', highestSeatNumber);
}

init();