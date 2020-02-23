cd kafka

echo "Starting Zookeper"
./bin/zookeeper-server-start.sh config/zookeeper.properties & 
echo "Started Zookeper"

echo "Starting Kafka"
./bin/kafka-server-start.sh config/server.properties
echo "Starting Zookeper"