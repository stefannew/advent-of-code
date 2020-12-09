import { fetchInput } from '../utils';

type Bags = Record<string, Record<string, number>>;

export const buildMap = (input: string[]) => {
    const bags: Bags = {};

    input.forEach(line => {
        const [type, contents] = line.split(' bags contain ');
        bags[type] = contents.split(', ')
            .reduce((acc, curr) => {
                const sanitized = curr.replace(/bag(s?)/g, '');
                const number = sanitized.substr(0, sanitized.indexOf(' '));
                const innerColor = sanitized.substr(sanitized.indexOf(' ')).replace(/\./g, '').replace(' ', '').trim();

                if (innerColor !== 'other') {
                    acc[innerColor] = parseInt(number);
                }

                return acc;
            }, {});
    });

    return bags;
}

const containsColor = (bags: Bags, type: string, color: string) => {
    const contents = bags[type];

    if (contents[color]) {
        return true;
    }

    return Object.keys(contents).some(type_ => {
        return containsColor(bags, type_, color);
    });
}

export const getNumberOfOutermostBagsContainingColor = (bags: Bags, color: string) => {
    return Object.keys(bags).filter(type => {
        return containsColor(bags, type, color);
    }).length
};

const countBags = (bags: Bags, color: string): number =>
    Object.entries(bags[color]).reduce((acc, [type, count]) => {
        acc += count;
        acc += countBags(bags, type) * count;
        return acc;
    }, 0);

const init = async () => {
    const input = await fetchInput(7).then(data => data.split('\n').map(x => x.trim()).filter(Boolean));
    const bags = buildMap(input);
    console.log(`Day 7 - Part 1: Number of possible containers for shiny gold bags:`, getNumberOfOutermostBagsContainingColor(bags, 'shiny gold'));
    console.log('Day 7 - Part 2: Number of bags inside my shiny gold bags', countBags(bags, 'shiny gold'));
}

init();
