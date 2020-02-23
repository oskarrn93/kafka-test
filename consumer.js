import kafka from "kafka-node";

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });

const consumer = new kafka.Consumer(
  client,
  [{ topic: "topic1", partition: 0, offset: 10 }],
  {
    autoCommit: false,
    fromOffset: true
  }
);

consumer.on("message", function(message) {
  const { value } = message;
  console.log(message);

  try {
    const parsed = JSON.parse(value);
    console.log(("value:", parsed, "custom", parsed.custom));
  } catch {
    console.log(("value:", value));
  }
});
