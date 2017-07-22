export function isPalindrome(input:any):any {
	try {
		if (typeof input !== 'string') throw "Invalid Input";
		input = input.toLowerCase();
		let len = input.length;
		let newWord:string = '';
		for (let i = 0; i < len; i++) {
			newWord += input[len - i - 1]
		}
		return input === newWord;
	}
	catch (err) {
		return err
	}
}
