import React from "react";
import PropTypes from 'prop-types';
import ClearIcon from "@material-ui/icons/Clear";
import {
    Card,
    makeStyles
} from '@material-ui/core';
import colors from "../constants/colors";

const MissingData = ({customMessage}) => {
    const classes = useStyles();
    return (
        <Card className={classes.wrapper}>
            <ClearIcon
                className={classes.noData}
            ></ClearIcon>
            <strong>{customMessage}</strong>
        </Card>
    )
}

const useStyles = makeStyles((theme) => ({
    wrapper: {
      marginBottom: "5px",
      padding: "10px",
      backgroundColor: colors.contentBackground,
      boxShadow: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "100px",
      alignItems: "center",
      fontSize: "1rem"
    },
    noData: {
        fill: colors.warning,
        width: "2em",
        height: "2em",
        fontSize: "5rem"
    }
  }));

MissingData.propTypes = {
    customMessage: PropTypes.string
}

export default MissingData;