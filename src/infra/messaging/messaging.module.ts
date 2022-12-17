import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { SendNotification } from '@application/use-cases/send-notification';

import { NotificationController } from './kafka/controllers/notification.controller';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification],
  controllers: [NotificationController],
})
export class MessagingModule {}
