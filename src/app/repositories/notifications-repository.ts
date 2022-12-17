import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;

  abstract findById(
    notificationId: Notification['id'],
  ): Promise<Notification | null>;

  abstract save(notification: Notification): Promise<void>;

  abstract countManyByRecipientId(
    recipientId: Notification['recipientId'],
  ): Promise<number>;

  abstract findManyByRecipientId(
    recipientId: Notification['recipientId'],
  ): Promise<Notification[]>;
}
