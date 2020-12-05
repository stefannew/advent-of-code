import { fetchInput } from '../utils';

export const getRowColumn = (boardingPass: string) => {
	// they're binary strings (BFFBBFB === 1001101)
	const row = parseInt(boardingPass.slice(0, 7).split('').map(x => x === 'B' ? 1 : 0).join(''), 2);
	const column = parseInt(boardingPass.slice(7).split('').map(x => x === 'R' ? 1 : 0).join(''), 2);

	return [row, column]
}

const init = async () => {
	const boardingPasses = await fetchInput(5).then(data => data.split('\n').filter(Boolean));
	const ids = boardingPasses.map(pass => {
		const [row, column] = getRowColumn(pass);
		return row * 8 + column;
	});

	const highestSeatNumber = Math.max(...ids);
	const mySeatNumber = ids.sort((a, b) => a - b).reduce((acc, curr, index, array) => {
		if (array[index + 1] - array[index] > 1) {
			return array[index] + 1;
		}

		return acc;
	}, 0);

	console.log('Part 1 - Highest Seat Number:', highestSeatNumber);
	console.log('Part 2 - My Seat Number:', mySeatNumber);
}

init();