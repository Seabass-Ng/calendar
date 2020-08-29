import { gql } from "apollo-boost";
import moment from "moment";
import React, { SFC, useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { cellHeight, numDaysInWeek, cellWidth } from "./util";
import Cell from "./Cell";
import FilledCell from "./FilledCell";
import { useQuery } from "@apollo/react-hooks";
import CalendarEventData from "./CalendarEventInterface";

interface ContainerProps {
  numWeeksToShow: number;
}

const Container = styled.div<ContainerProps>`
  border: 2px solid gray;
  display: grid;
  grid-gap: 0;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr ${({ numWeeksToShow }) =>
      numWeeksToShow > 4 && "1fr"} ${({ numWeeksToShow }) =>
      numWeeksToShow > 5 && "1fr"};
  height: ${({ numWeeksToShow }) => (cellHeight + 2) * numWeeksToShow}px;
  margin: 20px;
  width: ${(cellWidth + 2) * numDaysInWeek}px;
`;

interface CalendarContentProps {
  currentTime: moment.Moment;
  date: moment.Moment;
}

interface CalendarEventVars {
  month: number,
  year: number
};

interface CalendarEventsData {
  CalendarEvents: CalendarEventData[]
};

const FindEventsByMonth = gql`
  query findEventsByMonth(month: Int, year: Int) {
    CalendarEvents(month: $month, year: $year) {
      id
      eventMonth
      eventDay
      eventYear
      eventHour
      eventMinute
      eventDescription
    }
  }
`;

const CalendarContent: SFC<CalendarContentProps> = ({ currentTime, date }) => {
  const firstDayOfMonth = moment(date);
  firstDayOfMonth.date(1);
  const numWeeksToShow = Math.ceil(
    (firstDayOfMonth.day() + date.daysInMonth()) / 7
  );

  const getSelectedDate = useCallback(() => {
    let initialSelectedDate = 32;
    if (currentTime.month() === date.month()) {
      initialSelectedDate = currentTime.date();
    }
    return currentTime.month() === date.month() ? initialSelectedDate : 0;
  }, [currentTime, date]);

  const [selected, setSelected] = useState(getSelectedDate());
  const { data } = useQuery<CalendarEventsData, CalendarEventVars>(
    FindEventsByMonth,
    { variables: { month: firstDayOfMonth.month(), year: firstDayOfMonth.year() } }
  );
  useEffect(() => {
    setSelected(getSelectedDate());
  }, [getSelectedDate]);
  const onClickDay = (index: number) => () => setSelected(index);

  return (
    <Container numWeeksToShow={numWeeksToShow}>
      {Array(firstDayOfMonth.day())
        .fill(0)
        .map((nothing, index) => (
          <Cell key={`prefill-${index}`} />
        ))}
      {Array(date.daysInMonth())
        .fill(0)
        .map((nothing, index) => (
          <FilledCell
            day={index + 1}
            events={data?.CalendarEvents.filter(event => event.day === index + 1)}
            key={`filled-${index}`}
            isSelected={index + 1 === selected}
            onClick={onClickDay(index + 1)}
          />
        ))}
      {Array(numWeeksToShow * 7 - date.daysInMonth() - firstDayOfMonth.day())
        .fill(0)
        .map((nothing, index) => (
          <Cell key={`postfill-${index}`} />
        ))}
    </Container>
  );
};

export default CalendarContent;
