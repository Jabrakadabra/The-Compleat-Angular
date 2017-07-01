import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()

export class HttpService {
	constructor (
		private http: Http
	){}

	targetUrl: string = 'https://nghttp-fb992.firebaseio.com/data.json';

	storeServers(servers: any[]) {
		const headers = new Headers({'Content-Type': 'application/json'})
		return this.http.put(
			this.targetUrl,
			servers,
			{
				headers
			}
		);
	}

	getServers() {
		return this.http
		.get(this.targetUrl)
		.map((res: Response) => {
			const data = res.json();
			data.forEach(val => {
				val.name = `FETCHED: ${val.name}`;
			});
			return data;
		});
	}
}
