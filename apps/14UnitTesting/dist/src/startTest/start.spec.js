"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var startMethods_1 = require("./startMethods");
console.log('is', startMethods_1.isPalindrome);
describe('our initial tests', function () {
    xit('thinks that true is true', function () {
        expect(true).toBe(true);
    });
    xit('thinks that true is not false', function () {
        expect(true).not.toBe(false);
    });
    it('returns an error if the input is not a string', function () {
        expect(startMethods_1.isPalindrome(23)).toBe('Invalid Input');
        expect(startMethods_1.isPalindrome(['a', 'b', 'c'])).toBe('Invalid Input');
    });
    it('checks to see if a string is a palindrome', function () {
        expect(startMethods_1.isPalindrome('abc')).toBe(false);
        expect(startMethods_1.isPalindrome('abccba')).toBe(true);
    });
    it('ignores case of letters', function () {
        expect(startMethods_1.isPalindrome('ABCcba')).toBe(true);
    });
    it('requires strict observance of spaces and puntuation', function () {
        expect(startMethods_1.isPalindrome('A man, a plan, a canal, Panama')).toBe(false);
    });
});
//# sourceMappingURL=start.spec.js.map