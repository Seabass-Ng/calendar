import React, { SFC, useState } from "react";
import moment from "moment";
import styled from "@emotion/styled";
import CalendarContent from "./CalendarContent";
import { cellWidth } from "./util";

const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const TitleRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: ${(cellWidth + 2) * 7}px;
  > div {
    cursor: pointer;
    font-size: 20px;
    padding: 5px;
  }
`;

const Title = styled.h2`
  flex-grow: 1;
  text-align: center;
`;

interface MonthlyCalendarProps {
  currentTime: moment.Moment;
}

const MonthlyCalendar: SFC<MonthlyCalendarProps> = ({ currentTime }) => {
  const [currentMonth, setCurrentMonth] = useState(currentTime);
  const onPreviousMonthClick = () => {
    const newDate = moment(currentMonth);
    if (currentMonth.month() === 0) {
      newDate.year(newDate.year() - 1);
      newDate.month(11);
    } else {
      newDate.month(newDate.month() - 1);
    }
    setCurrentMonth(newDate);
  };

  const onNextMonthClick = () => {
    const newDate = moment(currentMonth);
    if (currentMonth.month() === 11) {
      newDate.year(newDate.year() + 1);
      newDate.month(0);
    } else {
      newDate.month(newDate.month() + 1);
    }
    setCurrentMonth(newDate);
  };

  const onTodayClick = () => {
    setCurrentMonth(currentTime);
  };

  return (
    <Calendar>
      <button onClick={onTodayClick}>Today</button>
      <TitleRow>
        <div onClick={onPreviousMonthClick}>&lt;</div>
        <Title>{currentMonth.format("MMMM")} </Title>
        <div onClick={onNextMonthClick}>&gt;</div>
      </TitleRow>
      <CalendarContent date={currentMonth} currentTime={currentTime} />
    </Calendar>
  );
};

export default MonthlyCalendar;
