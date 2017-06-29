import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
	constructor(
		private serversService: ServersService,
		private route: ActivatedRoute
	) { }
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';


	ngOnInit() {
		console.log('edit-server');
		this.server = this.serversService.getServer(1);
		this.serverName = this.server.name;
		this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
