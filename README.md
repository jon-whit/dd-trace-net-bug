
# Instructions

1. `git clone git@github.com:jon-whit/dd-trace-net-bug.git`

2. `docker run --rm -it --name jetstream -p 4222:4222 nats:2.2-alpine -js -sd /storage`

3. `node index.js`

4. Invoke the Publisher.Publish RPC using an appropriate grpc client

5. Notice the NATS protocol parser failing on the inbound buffer being read from the tcp socket.

6. Comment out the `const tracer = require("dd-trace").init()`, and it works just fine.

7. Leave the `const tracer = require("dd-trace").init()` in the code, but disable the `net` plugin `export DD_TRACE_DISABLED_PLUGINS=net` and
   it also works just fine.
