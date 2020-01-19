import React from "react";
import PropTypes from "prop-types";
import { GiFishing } from "react-icons/gi";
import { MdLibraryAdd } from "react-icons/md";

import Tile from "../../../UI/Tile/Tile";
import Button from "../../../UI/Buttons/Button/Button";
import Loading from "../../Loading/Loading";
import FishList from "./FishList/FishList";

import classes from "./TrophyListTile.module.css";

const TrophyListTile = props => {
  return (
    <Tile
      sm={"SM-8"}
      md={"MD-4"}
      xl={"XL-4"}
      topLeft={
        <>
          <GiFishing size={16} />
          Your trophy list
        </>
      }
      topRight={
        <Button btnType={"Primary"} clicked={props.onShowActionFish}>
          <MdLibraryAdd size={14} />
          add trophy
        </Button>
      }
    >
      {props.loading ? (
        <Loading />
      ) : (
        <FishList
          fishes={props.trophyData}
          onEdit={props.onEditFish}
          onDelete={props.onDeleteFish}
        />
      )}
    </Tile>
  );
};

TrophyListTile.propTypes = {
  onShowActionFish: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onEditFish: PropTypes.func.isRequired,
  onDeleteFish: PropTypes.func.isRequired,
  trophyData: PropTypes.array.isRequired
};

export default TrophyListTile;
