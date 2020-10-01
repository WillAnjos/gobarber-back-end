import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  })

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhonn Doe',
      email: 'jhondoe@example.com',
      password: '123123'
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jhonn Doe');
    expect(profile.email).toBe('jhondoe@example.com');
  });

  it('should not be able to show the profile of a non-existent user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existent-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});


