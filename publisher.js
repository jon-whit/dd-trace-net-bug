const { Empty } = require('google-protobuf/google/protobuf/empty_pb.js');
const { nanos } = require("nats");

const lorem =
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget egestas elit. Morbi eu iaculis turpis. Aenean consequat, ligula nec venenatis tempus, libero magna mollis magna, et gravida risus nisl in purus. In in ornare nunc, vel elementum tortor. Suspendisse vulputate condimentum magna, tempor viverra urna faucibus vulputate. Suspendisse fringilla pretium orci, quis iaculis massa sagittis non. Maecenas nisi arcu, mattis a purus et, hendrerit porta velit. Nullam dictum euismod bibendum.
Aenean sed nisi venenatis, lacinia mi ac, molestie urna. Suspendisse odio nisi, aliquet ac imperdiet ac, mollis quis purus. Fusce at elit a velit sagittis maximus. Sed vitae lectus vitae neque blandit tempus tincidunt at quam. Phasellus eget nisl dui. Phasellus finibus imperdiet lorem, quis commodo arcu tristique non. Pellentesque vehicula pharetra ante eget rutrum. Phasellus eget nulla sodales, congue eros nec, elementum leo. Maecenas vel tristique enim. Fusce aliquam odio sit amet est porttitor, et posuere est justo.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget egestas elit. Morbi eu iaculis turpis. Aenean consequat, ligula nec venenatis tempus, libero magna mollis magna, et gravida risus nisl in purus. In in ornare nunc, vel elementum tortor. Suspendisse vulputate condimentum magna, tempor viverra urna faucibus vulputate. Suspendisse fringilla pretium orci, quis iaculis massa sagittis non. Maecenas nisi arcu, mattis a purus et, hendrerit porta velit. Nullam dictum euismod bibendum.
Aenean sed nisi venenatis, lacinia mi ac, molestie urna. Suspendisse odio nisi, aliquet ac imperdiet ac, mollis quis purus. Fusce at elit a velit sagittis maximus. Sed vitae lectus vitae neque blandit tempus tincidunt at quam. Phasellus eget nisl dui. Phasellus finibus imperdiet lorem, quis commodo arcu tristique non. Pellentesque vehicula pharetra ante eget rutrum. Phasellus eget nulla sodales, congue eros nec, elementum leo. Maecenas vel tristique enim. Fusce aliquam odio sit amet est porttitor, et posuere est justo.
`;

function publish (pubsub) {
    return async function (call, callback) {
      let events = [];
      for (let i = 0; i < 2000; i++) {
        const m = {
          id: `test-${i + 1}`,
          customerID: "example",
          data: lorem,
          subject: "db5eee66-b85b-43f5-a699-f1175884eab6",
          type: "ThingCreated",
          source: "https://localhost:3000/loadtest",
          dataschema: "https://localhost:3000/loadtest",
          time: nanos(Date.now()),
          spec: "1.0",
          datacontenttype: "application/json",
        };

        events.push(m);
      }

      try {
        const promises = events.map(async (event) => {
          await pubsub.publish(call.request.getTopic(), event.subject, event.type, event)
        })

        await Promise.all(promises)
        callback(null, new Empty())

      } catch (err) {
        console.error("Failed to publish messages: ", err)
      }
    }
  }

module.exports = (pubsub) => {
  return {
    publish: publish(pubsub)
  }
}