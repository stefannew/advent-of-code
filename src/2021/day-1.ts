import { fetchInput, toNumberArray } from '../../utils/fetch-input';

const findNumberOfDepthIncreases = (input: number[]) =>
	input.reduce((acc, curr, i, arr) => {
		if (curr > arr[i - 1]) acc += 1;
		return acc;
	}, 0);

const findSumIncreaseSlidingWindow = (input: number[], window: number = 3) => {
	let sums = [];
	let sum = 0;

	for (let i = 0; i < window; i++) {
		sum += input[i];
	}

	sums.push(sum);

	for (let i = window; i < input.length; i++) {
		sum -= input[i - window];
		sum += input[i];

		sums.push(sum);
	}

	return sums;
}

(async () => {
	const input = await fetchInput(1).then(toNumberArray);

	console.log('Number of Depth Increases:', findNumberOfDepthIncreases(input));
	console.log('Number of Depth Increases (Sliding Window):', findNumberOfDepthIncreases(findSumIncreaseSlidingWindow(input)));
})();
