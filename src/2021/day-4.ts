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

export const markNumberInBoards = (number: string, boards: string[][]) => {
	for (let i = 0; i < boards.length; i++) {
		for (let j = 0; j < boards[i].length; j++) {
			if (number === boards[i][j]) {
				boards[i][j] = 'x';
			}
		}
	}
}

export const checkBingo = (boards: string[][], findLast = false) => {
	const checkRows = (board: string[]) => {
		for (let i = 0; i < 25; i += 5) {
			let row = board.slice(i, i + 5);
			if (row.every(value => value === 'x')) {
				return true;
			}
		}

		return false;
	}

	const checkCols = (board: string[]) => {
		for (let i = 0; i < 5; i++) {
			const col = [];
			for (let j = i; j < 25; j += 5) {
				col.push(board[j]);
			}

			if (col.every(value => value === 'x')) {
				return true;
			}

		}
		return false;
	}

	for (let i = 0; i < boards.length; i++) {
		const board = boards[i];

		if (checkRows(board) || checkCols(board)) {
			if (findLast) {
				boards.splice(i, 1);
				if (boards.length === 0) {
					return board.filter(value => value !== 'x')
						.reduce((acc, curr) => {
							return acc + parseInt(curr);
						}, 0);
				}
			} else {
				return board.filter(value => value !== 'x')
					.reduce((acc, curr) => {
						return acc + parseInt(curr);
					}, 0);
			}
		}
	}

	return -1;
}

export const bingo = (numbers: string[], boards: string[][], findLast = false) => {
	for (let i = 0; i < numbers.length; i++) {
		markNumberInBoards(numbers[i], boards);
		const sum = checkBingo(boards, findLast);

		if (sum > -1) {
			return sum * parseInt(numbers[i]);
		}
	}
}

(async () => {
	const input = await fetchInput(4);
	const { numbers, boards } = getInputValues(input);

	console.log('BINGO! (Day One)', bingo(numbers, boards));
	console.log('BINGO! (Day Two)', bingo(numbers, boards, true));
})();