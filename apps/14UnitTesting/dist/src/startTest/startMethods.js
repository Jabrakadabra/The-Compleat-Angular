"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPalindrome(input) {
    try {
        if (typeof input !== 'string')
            throw "Invalid Input";
        input = input.toLowerCase();
        var len = input.length;
        var newWord = '';
        for (var i = 0; i < len; i++) {
            newWord += input[len - i - 1];
        }
        return input === newWord;
    }
    catch (err) {
        return err;
    }
}
exports.isPalindrome = isPalindrome;
//# sourceMappingURL=startMethods.js.map