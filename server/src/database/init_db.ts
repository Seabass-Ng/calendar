import { createConnection } from 'typeorm';
import { CalendarEvents } from '../models';

export const init_db = async() => {
  const connection = await createConnection();
  await connection.dropDatabase();
  await connection.synchronize();

  const starterEvent = new CalendarEvents(5, 14, 2020, 4, 0, 'Started up calendar');
  await starterEvent.save();
};
