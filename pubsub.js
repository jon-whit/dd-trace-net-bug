const { connect, JSONCodec, headers, nanos } = require("nats");
const { forAwaitEach } = require("iterall");
const { InternalError } = require("./errors")

const json = JSONCodec();

exports.NatsPubsub = class NatsPubsub {
    constructor(conn) {
        this.conn = conn
    }

    async publish (topic, subject, type, payload) {

        const js = this.conn.jetstream()
        const jsm = await this.conn.jetstreamManager()

        await jsm.streams.add({
            name: topic,
            subjects: [`*.${topic}.>`],
            max_bytes: 512 * 1024 * 1024,
            max_age: nanos(24 * 60 * 60 * 1000),
            max_msg_size: 64 * 1024,
          });

        const hdrs = headers();
        hdrs.set('publishedAt', new Date().toISOString());

        try {
          await this.conn.request(`dev.${topic}.${subject}.${type}`, json.encode(payload), { timeout: 1000, headers: hdrs });
        } catch (err) {
          throw new InternalError(err.message);
        }
    }
};

exports.connect = async function () {
    let conn
    try {
      conn = await connect({
        servers: ['nats://localhost:4222'],
        headers: true,
        reconnect: true,
        maxReconnectAttempts: -1
      })
    } catch (err) {
      console.error('Failed to establish connection with NATS: %s', err.message)
      process.exit(1)
    }

    console.info(`NATS connection to '${conn.getServer()}' established`)

    forAwaitEach(conn.status(), (status) => {
      switch (status.type) {
        case Events.Disconnect:
          console.warn('NATS connection has been disconnected')
          break
        case Events.Reconnect:
          console.info('NATS connection has reconnected..')
          break
      }
    })

    conn.closed()
      .then((err) => {
        if (err) {
          console.error(`NATS connection closed with error: '${err.message}'`)
        } else {
          console.info('NATS connection has been drained and closed')
        }
      })

    return conn
  }