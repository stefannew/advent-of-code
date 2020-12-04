import { fetchInput } from '../utils';

export const parsePassports = (input: string) => {
	const passports = input.split('\n\n');

	return passports.reduce((passportsArray, passport) => {
		const obj = passport
			.replace(/\n/g, ' ')
			.split(' ')
			.filter(Boolean)
			.reduce((passportObject, keyValuePair) => {
				const [key, value] = keyValuePair.split(':');
				passportObject[key] = value;
				return passportObject;
			}, {});

		passportsArray.push(obj);

		return passportsArray;
	}, []);
}



const REQUIRED_PASSPORT_KEYS = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];
const VALID_EYE_COLORS = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const validationFunctions = {
	'byr': value => parseInt(value) >= 1920 && parseInt(value) <= 2002,
	'iyr': value => parseInt(value) >= 2010 && parseInt(value) <= 2020,
	'eyr': value => parseInt(value) >= 2020 && parseInt(value) <= 2030,
	'hgt': value => {
		if (value.includes('cm')) {
			const num = parseInt(value.split('cm')[0]);
			return num >= 150 && num <= 193;
		}

		if (value.includes('in')) {
			const num = parseInt(value.split('in')[0]);
			return num >= 59 && num <= 76;
		}

		return false;
	},
	'hcl': value => value.startsWith('#') && value.length === 7,
	'ecl': value => VALID_EYE_COLORS.includes(value),
	'pid': value => value.length === 9,
	'cid': (_value) => true,
}

export const containsRequiredKeys = (passport) => {
	return REQUIRED_PASSPORT_KEYS.every(key => {
		return Object.keys(passport).includes(key);
	});
};

export const validateFields = (passport) => {
	return Object.keys(passport).every(key => {
		const fn = validationFunctions[key];

		return fn && fn(passport[key]) || false;
	})
}

const init = async () => {
	const input = await fetchInput(4);

	const passportArray = parsePassports(input);
	const passportsWithRequiredKeys = passportArray.filter(containsRequiredKeys);
	const validPassports = passportsWithRequiredKeys.filter(validateFields);

	console.log('Day 1 - Number of passports with required keys', passportsWithRequiredKeys.length);
	console.log('Day 2 - Number of passports with valid field values', validPassports.length);
}

init();