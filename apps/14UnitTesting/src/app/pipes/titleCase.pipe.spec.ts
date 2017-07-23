import { TitleCasePipe } from 'pipes/titleCase.pipe'

describe('TitleCasePipe', () => {
	let pipe = new TitleCasePipe();

	it(`transforms 'abc' to 'Abc'`, () => {
		expect(pipe.transform('abc')).toBe('Abc');
	});

	it(`transforms "abc def" to "Abc Def"`, () => {
		expect(pipe.transform('abc def')).toBe('Abc Def');
	});

	it(`leaves acronyms alone`, () => {
		expect(pipe.transform('NASA')).toBe('NASA');
		expect(pipe.transform('NOrfolk')).toBe('Norfolk');
		expect(pipe.transform('my life at NASA')).toBe('My Life At NASA');
	});

	it(`deals with single letter words`, () => {
		expect(pipe.transform('a day in a life')).toBe('A Day In A Life');
	})
})
