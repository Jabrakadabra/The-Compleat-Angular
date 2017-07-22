export class DataService {
	getDetails() {
		const resultPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('Now is the winter of our discontent');
			}, 1500);
		});
		return resultPromise;
	}
}
