import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(
	  private serversService: ServersService,
	  private router: Router,
	  private route: ActivatedRoute
  ) { }

	ngOnInit() {
		console.log('ServersonInit');
		this.servers = this.serversService.getServers();
  }

	onReload() {
		console.log('test0', this.route);
		// this.router.navigate(['new'], {relativeTo: this.route});
	}

}
