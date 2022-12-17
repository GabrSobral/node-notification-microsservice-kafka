import { Module } from '@nestjs/common/decorators';
import { NotificationsRepository } from 'src/app/repositories/notifications-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notification-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
