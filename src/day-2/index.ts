import { fetchInput } from '../utils';

export const isValidPasswordPartOne = (input: string) => {
	const [policy, password] = input.split(':');
	const [minMax, value] = policy.split(' ');
	const [min, max] = minMax.split('-').map(x => parseInt(x));

	const map = password.trim().split('').reduce((acc, curr) => {
		acc[curr] = acc[curr] ? acc[curr] += 1 : 1;
		return acc;
	}, {});

	if (!map[value]) return false;
	return map[value] >= min && map[value] <= max;
}

const countValidPasswords = (passwords: string[], predicate: (input: string) => boolean) =>
	passwords.reduce((acc, curr) => {
		acc += predicate(curr) ? 1 : 0;
		return acc;
	}, 0);

export const isValidPasswordPartTwo = (input: string) => {
	const [policy, password] = input.split(':');
	const [indices, value] = policy.split(' ');
	const [indexOne, indexTwo] = indices.split('-').map(x => parseInt(x));

	if (password[indexOne] === value && password[indexTwo] === value) return false;
	return password[indexOne] === value || password[indexTwo] === value;

}

const init = async () => {
	const input = await fetchInput(2).then(x => x.split('\n').filter(Boolean));
	console.log('Part 1 - Number of valid passwords', countValidPasswords(input, isValidPasswordPartOne));
	console.log('Part 2 - Number of valid passwords', countValidPasswords(input, isValidPasswordPartTwo))
}

init();