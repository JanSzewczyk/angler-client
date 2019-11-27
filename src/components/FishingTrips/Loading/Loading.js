import React from 'react'

import Spinner from "../../UI/Spinner/Spinner"

import classes from "./Loading.module.css"

const Loading = (props) => {
    return (
        <div className={classes.Loading}>
            <Spinner />
        </div>
    )
}

export default Loading

