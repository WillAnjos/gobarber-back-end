import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreacteAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreacteAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreacteAppointmentService(
      fakeAppointmentsRepository,
    );
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('should not be able to create two appointment at the same time', async () => {
    const appointment = new Date(2020, 4, 10, 11)

    await createAppointment.execute({
      date: appointment,
      provider_id: '123123123',
    });

    expect(createAppointment.execute({
      date: appointment,
      provider_id: '123123123',
    })).rejects.toBeInstanceOf(AppError);
  });
});
