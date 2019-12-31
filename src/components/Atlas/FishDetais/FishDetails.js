import React from "react";
import PropTypes from "prop-types";
import { FaFish, FaMap } from "react-icons/fa";
import { GiBoatFishing, GiFishingPole, GiFishingHook } from "react-icons/gi";

import Tile from "../../UI/Tile/Tile";

import classes from "./FishDetails.module.css";

const FishDetails = props => {
  return (
    <div className={classes.FishDetails}>
      <Tile
        sm={"SM-6"}
        md={"MD-6"}
        xl={"XL-4"}
        topLeft={
          <>
            <FaFish size={16} /> {props.fish.name}
          </>
        }
      >
        <div className={classes.Info}>
          <img
            className={classes.FishImage}
            src={props.fish.photo}
            alt="fish"
          ></img>
          <div className={classes.Title}>Family</div>
          <div className={classes.Data}>
            {props.fish.family !== "" ? props.fish.family : <>null</>}
          </div>
          <div className={classes.Title}>Look</div>
          <div className={classes.Data}>{props.fish.look}</div>
        </div>
      </Tile>
      <Tile
        sm={"SM-6"}
        md={"MD-6"}
        xl={"XL-4"}
        topLeft={
          <>
            <FaMap size={16} /> Occurrence
          </>
        }
      >
        <div className={classes.Info}>
          <div className={classes.Title}>Occurrence</div>
          <div className={classes.Data}>{props.fish.occurrence}</div>
          <div className={classes.Title}>Example Fisheries</div>
          <div className={classes.Data}>{props.fish.fishery}</div>
        </div>
      </Tile>
      <Tile
        sm={"SM-6"}
        md={"MD-4"}
        xl={"XL-4"}
        topLeft={
          <>
            <GiBoatFishing size={16} /> How to fish
          </>
        }
      >
        <div className={classes.Info}>
          <div className={classes.Title}>Method and technique</div>
          <div className={classes.Data}>{props.fish.methodAndTechnique}</div>
          <div className={classes.Title}>Bait</div>
          <div className={classes.Data}>{props.fish.bait}</div>
          <div className={classes.Title}>Groundbait</div>
          <div className={classes.Data}>{props.fish.groundbait}</div>
        </div>
      </Tile>
      <Tile
        sm={"SM-6"}
        md={"MD-4"}
        xl={"XL-3"}
        topLeft={
          <>
            <GiFishingPole size={16} /> Pro tips for fishing
          </>
        }
      >
        <div className={classes.Info}>
          <div className={classes.Title}>Equipment</div>
          <div className={classes.Data}>{props.fish.equipment}</div>
          <div className={classes.Title}>When to fish</div>
          <div className={classes.Data}>{props.fish.timeToFishing}</div>
        </div>
      </Tile>
      <Tile
        sm={"SM-6"}
        md={"MD-4"}
        xl={"XL-3"}
        topLeft={
          <>
            <GiFishingHook size={16} /> Useful information
          </>
        }
      >
        <div className={classes.Info}>
          <div className={classes.Title}>The period of protection</div>
          <div className={classes.Data}>{props.fish.periodOfProtection}</div>
          <div className={classes.Title}>Protective size</div>
          <div className={classes.Data}>{props.fish.protectiveSize}</div>
          <div className={classes.Title}>The biggest fish</div>
          <div className={classes.Data}>{props.fish.record}</div>
        </div>
      </Tile>
    </div>
  );
};

FishDetails.propTypes = {
  fish: PropTypes.object.isRequired
};

export default FishDetails;
