import { makeNotification } from '@test/factories/notification-factory';

import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count Recipient Notifications', () => {
  it('should be able to count notifications from recipient', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const countRecipientNotifications = new CountRecipientNotifications(
      inMemoryNotificationsRepository,
    );

    inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
