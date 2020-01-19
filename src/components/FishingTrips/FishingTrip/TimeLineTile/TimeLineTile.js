import React from "react";
import PropTypes from "prop-types";
import { MdAccessTime } from "react-icons/md";

import Tile from "../../../UI/Tile/Tile";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import TimeLine from "./TimeLine/TimeLine";

import classes from "./TimeLineTile.module.css";

const TimeLineTile = props => {
  return (
    <Tile
      sm={"SM-6"}
      md={"MD-4"}
      xl={"XL-3"}
      topLeft={
        <Aux>
          <MdAccessTime size={16} />
          Trophies caught time line
        </Aux>
      }
    >
      <TimeLine
        fishes={props.trophyData.sort((a, b) => (a.time > b.time ? 1 : -1))}
      />
    </Tile>
  );
};

TimeLineTile.propTypes = {
  trophyData: PropTypes.array.isRequired
};

export default TimeLineTile;
