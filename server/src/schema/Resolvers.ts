import { Query, Resolver, Arg, Mutation } from 'type-graphql';
import { CalendarEvents } from '../models/CalendarEvents';
import { getManager } from 'typeorm';

@Resolver()
export class Resolvers {
  @Query(() => [CalendarEvents])
  async allEvents(): Promise<CalendarEvents[]> {
    return await CalendarEvents.find();
  }

  @Query(() => [CalendarEvents])
  async findEventsByDate(
    @Arg('month') month: number,
    @Arg('day') day: number,
    @Arg('year') year: number
  ):  Promise<CalendarEvents[]> {
    return await CalendarEvents.find({
      where: { eventMonth: month, eventDay: day, eventYear: year }
    });
  }

  @Query(() => [CalendarEvents])
  async findEventsByMonth(
    @Arg('month') month: number,
    @Arg('year') year: number
  ):  Promise<CalendarEvents[]> {
    return await CalendarEvents.find({
      where: { eventMonth: month, eventYear: year }
    });
  }

  @Mutation(() => CalendarEvents)
  async addCalendarEvent(
    @Arg('month') eventMonth: number,
    @Arg('day') eventDay: number,
    @Arg('year') eventYear: number,
    @Arg('hour') eventHour: number,
    @Arg('minute') eventMinute: number,
    @Arg('description') eventDescription: string
  ) {
    const calendarEvent = CalendarEvents.create({
      eventMonth,
      eventDay,
      eventYear,
      eventHour,
      eventMinute,
      eventDescription
    });
    await calendarEvent.save();
    return calendarEvent;
  }

  @Mutation(() => CalendarEvents)
  async editCalendarEvent(
    @Arg('id') id: number,
    @Arg('month') eventMonth: number,
    @Arg('day') eventDay: number,
    @Arg('year') eventYear: number,
    @Arg('hour') eventHour: number,
    @Arg('minute') eventMinute: number,
    @Arg('description') eventDescription: string
  ) {
    const calendarEvent = await CalendarEvents.findOneOrFail({ id });
    calendarEvent.eventMonth = eventMonth;
    calendarEvent.eventDay = eventDay;
    calendarEvent.eventYear = eventYear;
    calendarEvent.eventHour = eventHour;
    calendarEvent.eventMinute = eventMinute;
    calendarEvent.eventDescription = eventDescription;
    await calendarEvent.save();
    return calendarEvent;
  }

  @Mutation(() => Boolean)
  async deleteCalendarEvent(
    @Arg('id') id: number
  ) {
    const entityManager = getManager();
    return await entityManager.delete(CalendarEvents, id);
  }
}
