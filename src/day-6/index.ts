import { fetchInput } from '../utils';

export const getNumberOfUniqueAnswersForGroup = (group: string[]) =>
	new Set(group.join('').split('')).size;

export const getNumberOfNonUniqueAnswersForGroup = (group: string[]) => {
	const numberOfPeople = group.length;
	const map = group.join('').split('').reduce((acc, curr) => {
		if (acc[curr]) {
			acc[curr] += 1
		} else {
			acc[curr] = 1;
		}

		return acc;
	}, {})

	return Object.keys(map).reduce((acc, curr) => {
		return map[curr] === numberOfPeople ? acc + 1 : acc;
	}, 0);

}


const init = async () => {
	const groups = await fetchInput(6).then(data => data.split('\n\n'));

	const sumOfAllGroups = groups.reduce((acc, curr) => {
		return acc + getNumberOfUniqueAnswersForGroup(curr.split('\n'));
	}, 0);

	const sumOfAllGroupsEveryone = groups.reduce((acc, curr) => {
		return acc + getNumberOfNonUniqueAnswersForGroup(curr.split('\n'));
	}, 0);

	console.log('Part 1 - Sum of all questions to which anyone answered yes', sumOfAllGroups);
	console.log('Part 1 - Sum of all questions to which EVERYONE answered yes', sumOfAllGroupsEveryone);
};

init();