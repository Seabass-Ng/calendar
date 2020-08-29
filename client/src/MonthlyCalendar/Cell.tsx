import styled from "@emotion/styled";
import { cellHeight, cellWidth } from "./util";

interface CellProps {
  filled?: boolean;
  selected?: boolean;
}

const Cell = styled.div<CellProps>`
  background: ${props => {
    if (props.selected) {
      return "lightgray";
    } else if (props.filled) {
      return "slategray";
    }
    return "white";
  }};
  border: 1px solid gray;
  color: black;
  height: ${cellHeight}px;
  width: ${cellWidth}px;
  ${props => props.selected && "font-weight: 700;"}
`;

export default Cell;
