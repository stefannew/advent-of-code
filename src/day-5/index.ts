import { fetchInput } from '../utils';
import * as util from 'util';

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

export const getRowColumn = (boardingPass: string) => {
	const firstSeven = boardingPass.slice(0, 7);
	const lastThree = boardingPass.slice(7);

	const row = findValue(firstSeven, ROW_RANGE);
	const column = findValue(lastThree, COL_RANGE);

	return [row, column]
}

export const getSeatNumber = (row: number, column: number) => {
	return row * 8 + column;
}

const buildSeatMatrix = (seatMap: SeatMap) => {
	const map = new Array(127);

	Object.keys(seatMap).forEach(key => {
		const { row, column, id } = seatMap[key];
		if (Array.isArray(map[row])) {
			map[row][column] = id;
		} else {
			map[row] = new Array(7).fill(-1);
			map[row][column] = id;
		}
	});

	return map.filter(Boolean);
}

type SeatMap = Record<string, { row: number, column: number, id: number }>;

const findMySeatNumber = (matrix: Array<Array<number>>) => {
	let number;

	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] === -1) {
				number = matrix[y][x - 1] + 1;
			}
		}
	}

	return number;
}

const init = async () => {
	const boardingPasses = await fetchInput(5).then(data => data.split('\n').filter(Boolean));
	const idRowColumnMap: SeatMap = boardingPasses.reduce((acc: Record<string, { row: number, column: number, id: number }>, curr: string) => {
		const [row, column] = getRowColumn(curr);
		acc[curr] = {
			row,
			column,
			id: getSeatNumber(row, column)
		}
		return acc;
	}, {});


	const highestSeatNumber = Object.keys(idRowColumnMap).reduce((acc, curr) => idRowColumnMap[curr].id > acc ? idRowColumnMap[curr].id : acc, 0);
	const seatIdMatrix = buildSeatMatrix(idRowColumnMap);
	const mySeatNumber = findMySeatNumber(seatIdMatrix);

	console.log('Part 1 - Highest Seat Number:', highestSeatNumber);
	console.log('Part 2 - My Seat Number:', mySeatNumber);
}

init();