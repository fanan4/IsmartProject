const {RPCClient} = require('ocpp-rpc');

// create a simple client to connect to the server
const cli = new RPCClient({
    endpoint: 'ws://localhost:3000',
    identity: 'XYZ123'
});

cli.handle('Say', ({params}) => {
    console.log('Server said:', params);
});

cli.connect();
