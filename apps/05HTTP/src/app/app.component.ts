import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from '../services/httpService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	constructor(
		private http: HttpService
	){}
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

	onAddServer(name: string) {
		this.servers.push({
			name: name,
			capacity: 50,
			id: this.generateId()
		});
	}

	onSave() {
		this.http.storeServers(this.servers)
		.subscribe(
			(res) => {
				console.log(res);
			},
			(err) => {
				console.log(err);
			}
		)
	}

	onGet() {
		this.http.getServers()
		.subscribe(
			(res: any[]) => {
				console.log('res', res);
			},
			(err) => {
				console.log(err);
			}
		)
	}

	ngOnInit() {}

	private generateId() {
		return Math.round(Math.random() * 10000);
	}
}
