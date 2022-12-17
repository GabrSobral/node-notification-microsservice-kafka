import { randomUUID } from 'crypto';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['shining-javelin-5021-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASS,
  },
  ssl: true,
});

const producer = kafka.producer();

await producer.connect();
await producer.send({
  topic: 'notifications.send-notification',
  messages: [
    {
      value: JSON.stringify({
        category: 'social',
        content: 'Você tem uma nova solicitação de amizade.',
        recipientId: randomUUID(),
      }),
    },
  ],
});

await producer.disconnect();
