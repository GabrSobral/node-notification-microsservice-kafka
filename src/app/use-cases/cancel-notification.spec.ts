import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel Notification', () => {
  it('should be able to send a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(
      inMemoryNotificationsRepository,
    );
    const notification = makeNotification();

    inMemoryNotificationsRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(inMemoryNotificationsRepository.notifications).toHaveLength(1);
    expect(inMemoryNotificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(
      inMemoryNotificationsRepository,
    );

    expect(() =>
      cancelNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
