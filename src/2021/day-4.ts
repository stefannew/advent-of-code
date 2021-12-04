import { fetchInput } from '../../utils/fetch-input';

export const getInputValues = (input: string) => {
	const nextFive = (arr: string[]) => {
		const res = [];

		for (let i = 0; i < 5; i++) {
			res.push(arr.shift().split(/\s+/).filter(Boolean));
		}

		return res.flat();
	}

	const trimmed = input.trim().split('\n').filter(Boolean);
	const numbers = trimmed.shift().split(',');
	const boards = [];

	while (trimmed.length !== 0) {
		boards.push(nextFive(trimmed));
	}

	return { numbers, boards };
};

(async () => {
	const input = await fetchInput(4);
	const { numbers, boards } = getInputValues(input);

	console.log({ numbers, boards });

})();