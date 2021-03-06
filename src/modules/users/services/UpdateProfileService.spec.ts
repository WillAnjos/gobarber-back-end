import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhonn Doe',
      email: 'jhondoe@example.com',
      password: '123123'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhonn Trê',
      email: 'jhontre@example.com',
    });

    expect(updatedUser.name).toBe('Jhonn Trê');
    expect(updatedUser.email).toBe('jhontre@example.com');
  });

  it('should not be able to update the profile of a non-existent user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existent-user-id',
        name: 'Non John',
        email: 'nonjohn@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to email already used', async () => {
    await fakeUsersRepository.create({
      name: 'Jhonn Doe',
      email: 'jhondoe@example.com',
      password: '123123'
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123123'
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhonn Doe',
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhonn Doe',
      email: 'jhondoe@example.com',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhonn Trê',
      email: 'jhontre@example.com',
      old_password: '123456',
      password: '123123'
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhonn Doe',
      email: 'jhondoe@example.com',
      password: '123456'
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhonn Trê',
        email: 'jhontre@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhonn Doe',
      email: 'jhondoe@example.com',
      password: '123456'
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhonn Trê',
        email: 'jhontre@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
