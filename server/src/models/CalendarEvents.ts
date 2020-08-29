import { Field, ID,  ObjectType, GraphQLTimestamp, Int } from 'type-graphql';
import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, Check } from 'typeorm';

@Entity()
@Check(`"eventDay" IS NOT NULL AND "eventDay" > 0 AND "eventDay" < 32`)
@Check(`"eventMonth" IS NOT NULL AND "eventMonth" > 0 AND "eventMonth" < 13`)
@Check(`"eventHour" IS NOT NULL AND "eventHour" >= 0 AND "eventHour" < 24`)
@Check(`"eventMinute" IS NOT NULL AND "eventMinute" >= 0 AND "eventHour" < 60`)
@ObjectType()
export class CalendarEvents extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number | null = null;

  @Field(() => Int)
  @Column()
  eventMonth!: number;

  @Field(() => Int)
  @Column()
  eventDay!: number;

  @Field(() => Int)
  @Column()
  eventYear!: number;

  @Field(() => Int)
  @Column()
  eventHour!: number;

  @Field(() => Int)
  @Column()
  eventMinute!: number;

  @Field(() => String)
  @Column({
    length: 255
  })
  eventDescription!: String;

  constructor(eventMonth: number, eventDay: number, eventYear: number, eventHour: number, eventMinute: number, eventDescription: string) {
    super();
    this.eventMonth = eventMonth;
    this.eventDay = eventDay;
    this.eventYear = eventYear;
    this.eventHour = eventHour;
    this.eventMinute = eventMinute;
    this.eventDescription = eventDescription;
  }
}
