const tracer = require("dd-trace").init();
const grpc = require("grpc");
const { NatsPubsub, connect } = require("./pubsub");
const { PublisherService } = require("./publisher_grpc_pb");
const publisher = require("./publisher");


(async () => {
  const conn = await connect()
  const pubsub = new NatsPubsub(conn)

  const server = new grpc.Server()
  server.addService(PublisherService, publisher(pubsub))


  server.bindAsync(`0.0.0.0:3000`, grpc.ServerCredentials.createInsecure(), (error) => {
    if (error) {
      console.error('Server bind error', error)
      process.exit(1)
    }

    console.info(`💻 server running at http://0.0.0.0:3000`)
    server.start()
  })
})()
