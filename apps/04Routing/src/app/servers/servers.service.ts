export class ServersService {
  private servers = [
    {
      id: 1,
      name: 'Productionserver',
      status: 'online'
    },
    {
      id: 2,
      name: 'Testserver',
      status: 'offline'
    },
    {
      id: 3,
      name: 'Devserver',
      status: 'offline'
    }
  ];

	getServers() {
		console.log('gettingServers');
		return this.servers;
  }

	getServer(id: number) {
		let modId = typeof id === 'string' ? parseInt(id, 10) : id;
    const server = this.servers.find(
      (s) => {
        return s.id === modId;
      }
    );
	console.log('s', server);
    return server;
  }

  updateServer(id: number, serverInfo: {name: string, status: string}) {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
}
