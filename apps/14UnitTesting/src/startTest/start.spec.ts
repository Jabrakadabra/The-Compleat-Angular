import { isPalindrome } from './startMethods';

console.log('is', isPalindrome);


describe('our initial tests', () => {
	xit('thinks that true is true', () => {
		expect(true).toBe(true);
	});
	xit('thinks that true is not false', () => {
		expect(true).not.toBe(false);
	});
	it ('returns an error if the input is not a string', () => {
		expect (isPalindrome(23)).toBe('Invalid Input');
		expect (isPalindrome(['a', 'b', 'c'])).toBe('Invalid Input');
	});
	it ('checks to see if a string is a palindrome', () => {
		expect (isPalindrome('abc')).toBe(false);
		expect (isPalindrome('abccba')).toBe(true);
	});
	it ('ignores case of letters', () => {
		expect (isPalindrome('ABCcba')).toBe(true);
	})
	it ('requires strict observance of spaces and puntuation', () => {
		expect (isPalindrome('A man, a plan, a canal, Panama')).toBe(false);
	})
})
