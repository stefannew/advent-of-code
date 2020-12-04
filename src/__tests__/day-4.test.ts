import { containsRequiredKeys, parsePassports } from '../day-4';

const passports =
`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in
`;

describe('Day 4', () => {
	describe('parsePassports', () => {
		it('should parse the passports into their object representation', () => {
			expect(parsePassports(passports)).toEqual([{
				ecl: 'gry',
				pid: '860033327',
				eyr: '2020',
				hcl: '#fffffd',
				byr: '1937',
				iyr: '2017',
				cid: '147',
				hgt: '183cm'
			}, {
				iyr: '2013',
				ecl: 'amb',
				cid: '350',
				eyr: '2023',
				pid: '028048884',
				hcl: '#cfa07d',
				byr: '1929'
			}, {
				hcl: '#ae17e1',
				iyr: '2013',
				eyr: '2024',
				ecl: 'brn',
				pid: '760753108',
				byr: '1931',
				hgt: '179cm'
			}, {
				hcl: '#cfa07d',
				eyr: '2025',
				pid: '166559648',
				iyr: '2011',
				ecl: 'brn',
				hgt: '59in',
			}]);
		});
	});

	describe('isValidPassport', () => {
		it('should return true or false for a valid or invalid passport', () => {
			expect(containsRequiredKeys({
				ecl: 'gry',
				pid: '860033327',
				eyr: '2020',
				hcl: '#fffffd',
				byr: '1937',
				iyr: '2017',
				cid: '147',
				hgt: '183cm'
			})).toEqual(true);

			expect(containsRequiredKeys({
				iyr: '2013',
				ecl: 'amb',
				cid: '350',
				eyr: '2023',
				pid: '028048884',
				hcl: '#cfa07d',
				byr: '1929'
			})).toEqual(false);

			expect(containsRequiredKeys({
				hcl: '#ae17e1',
				iyr: '2013',
				eyr: '2024',
				ecl: 'brn',
				pid: '760753108',
				byr: '1931',
				hgt: '179cm'
			})).toEqual(true);

			expect(containsRequiredKeys({
				hcl: '#cfa07d',
				eyr: '2025',
				pid: '166559648',
				iyr: '2011',
				ecl: 'brn',
				hgt: '59in',
			})).toEqual(false);
		});
	});
});