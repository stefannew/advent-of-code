import { fetchInput } from '../utils';;

export const findTwoValuesInArrayThatEqual = (value: number, array: number[]) => {
	for (let i = 0; i < array.length; i++) {
		const valueOne = array[i];

		for (let j = 0; j < array.length; j++) {
			const valueTwo = array[j];

			if (valueOne + valueTwo === value) {
				return [valueOne, valueTwo];
			}
		}
	}

	return null;
};

export const findThreeValuesInArrayThatEqual = (value: number, array: number[]) => {
	for (let i = 0; i < array.length; i++) {
		const valueOne = array[i];

		for (let j = 0; j < array.length; j++) {
			const valueTwo = array[j];

			for (let l = 0; l < array.length; l++) {
				const valueThree = array[l];

				if (valueOne + valueTwo + valueThree === value) {
					return [valueOne, valueTwo, valueThree];
				}
			}
		}
	}

	return null;
};

const init = async () => {
	const values = await fetchInput(1).then(x => x.split('\n').map(x => parseInt(x)));
	const result = findTwoValuesInArrayThatEqual(2020, values).reduce((acc, curr) => acc * curr, 1);
	const result2 = findThreeValuesInArrayThatEqual(2020, values).reduce((acc, curr) => acc * curr, 1);

	console.log('Part 1 Solution', result);
	console.log('Part 2 Solution', result2);
}

init();

