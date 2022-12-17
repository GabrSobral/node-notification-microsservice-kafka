import { makeNotification } from '@test/factories/notification-factory';

import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get Recipient Notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
