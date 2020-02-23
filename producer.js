import kafka from "kafka-node";

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new kafka.Producer(client);

const topics = [
  {
    topic: "topic1",
    partitions: 1,
    replicationFactor: 1
  }
];

client.on("error", message => console.error("client error", message));

client.on("ready", message => console.log("client ready", message));

client.createTopics(topics, (error, result) => {
  if (error) console.error("error", error);
  // result is an array of any errors if a given topic could not be created
  console.log("result", result);
});

console.log(process.argv);
const message =
  process.argv.length > 2 ? process.argv[2] : "this is a test message";

console.log("message", message);

const payloads = [
  {
    topic: "topic1",
    messages: JSON.stringify({ custom: "this is a custom json", message })
  }
];

producer.on("ready", function() {
  producer.send(payloads, function(error, data) {
    if (error) console.error("producer ready", error);

    console.log(data);
  });
});

producer.on("error", error => console.error("producer error", error));
