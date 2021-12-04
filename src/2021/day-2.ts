import { fetchInput } from '../../utils/fetch-input';

const toDirectionAmount = (instructions: string[], withAim: boolean = false) => {
	let aim = 0;

	return instructions.reduce((acc, curr) => {
		const [direction, amount] = curr.split(' ');
		const intAmount = parseInt(amount);

		switch (direction) {
			case 'forward':
				acc.horizontal += intAmount;
				if (withAim) {
					acc.depth += (aim * intAmount);
				}
				break;
			case 'up':
				if (!withAim) {
					acc.depth -= intAmount;
				}

				aim -= intAmount;
				break;
			case 'down':
				if (!withAim) {
					acc.depth += intAmount;
				}

				aim += intAmount;
				break;
		}

		return acc;
	}, {
		horizontal: 0,
		depth: 0
	});
}

(async () => {
	const instructions = await fetchInput(2)
		.then(response => response.split('\n').filter(Boolean));

	const { horizontal, depth } = toDirectionAmount(instructions, false);
	console.log('Product of horizontal position by depth:', horizontal * depth);
	const { horizontal: horizontalAim, depth: depthAim } = toDirectionAmount(instructions, true);
	console.log('Product of horizontal position by depth (with "aim"):', horizontalAim * depthAim);
})();
