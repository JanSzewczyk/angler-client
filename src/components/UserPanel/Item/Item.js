import React from 'react'

import classes from "./Item.module.css";

const Item = props => (
    <div className={classes.Item}>
        {props.children}
    </div>
)

export default Item;
