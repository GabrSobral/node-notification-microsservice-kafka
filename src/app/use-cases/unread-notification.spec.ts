import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

import { UnreadNotification } from './unread-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(
      inMemoryNotificationsRepository,
    );
    const notification = makeNotification({ readAt: new Date() });

    inMemoryNotificationsRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(inMemoryNotificationsRepository.notifications).toHaveLength(1);
    expect(inMemoryNotificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(
      inMemoryNotificationsRepository,
    );

    expect(() =>
      unreadNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
