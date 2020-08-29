import React, { SFC } from "react";
import Cell from "./Cell";
import CalendarEventData from "./CalendarEventInterface";

interface FilledCellProps {
  day: number;
  events: CalendarEventData[];
  isSelected: boolean;
  onClick(): void;
}

const FilledCell: SFC<FilledCellProps> = ({ day, isSelected, onClick }) => {
  return (
    <Cell filled selected={isSelected} onClick={onClick}>
      {day}
    </Cell>
  );
};

export default FilledCell;
