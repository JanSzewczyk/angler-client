import React from "react";
import PropTypes from "prop-types";
import { FaBook } from "react-icons/fa";

import Tile from "../../UI/Tile/Tile";
import FishListItems from "./FishListItems/FishListItems";

import classes from "./FishList.module.css";

const FishList = props => {
  console.log(props.fishes);
  return (
    <div className={classes.FishList}>
      <Tile
        sm={"SM-12"}
        md={"MD-12"}
        xl={"XL-12"}
        full
        topLeft={
          <>
            <FaBook size={16} />
            Species of fish
          </>
        }
      >
        {props.fishes.length > 0 ? (
          <FishListItems fishes={props.fishes} clicked={props.clicked}/>
        ) : (
          <>no data</>
        )}
      </Tile>
    </div>
  );
};

FishList.propTypes = {
  fishes: PropTypes.array.isRequired,
  clicked: PropTypes.func.isRequired
};

export default FishList;
