import { fetchInput } from '../utils';

type HillMap = Array<string>;

export const findNumberOfTreesInPath = (map: HillMap, placesRight: number, placesDown: number) => {
	let currentY = 0;
	let currentX = 0;
	let numberOfTrees = 0;

	while (map.length > currentY) {
		const line = map[currentY];
		const xOffset = currentX + placesRight;

		numberOfTrees += line[currentX] === '#' ? 1 : 0;
		currentY += placesDown;
		currentX = xOffset >= line.length ? xOffset - line.length : xOffset;
	}

	return numberOfTrees;
}

const init = async () => {
	const input = await fetchInput(3).then(x => x.split('\n'));
	const paths = [
		[1, 1],
		[3, 1],
		[5, 1],
		[7, 1],
		[1, 2]
	];

	console.log('Part 1 - Number of trees in path', findNumberOfTreesInPath(input, 3, 1));
	console.log('Part 2 - Multiply number of trees in all paths', paths.reduce((acc, curr) => {
		const [right, down] = curr;
		acc *= findNumberOfTreesInPath(input, right, down);

		return acc;
	}, 1))
}

init();