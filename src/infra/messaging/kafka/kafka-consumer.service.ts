import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['shining-javelin-5021-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'c2hpbmluZy1qYXZlbGluLTUwMjEkPEeUtCHnK3xlinXaxxaXOz9s05CPs1U4leI',
          password:
            'c-Ab6v6D7Aj8DFuyGNWsxUFKmqqLMjyqZFtT6TqUc9BEJW3dAxl4RAlGb3RVEZAho6FeUQ==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
