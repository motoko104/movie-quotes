import React from "react";
import PropTypes from 'prop-types';
import {
    Card,
    makeStyles
} from '@material-ui/core';

const Block =({ blockData }) => {
    const classes = useStyles();
    return (
        <Card
        className={classes.wrapper}
        >
        <strong className={classes.index}>{blockData.attributes.index}</strong>
        <div>{blockData.attributes.data}</div>
        </Card>
    )
};

const useStyles = makeStyles((theme) => ({
    wrapper: {
      marginBottom: "5px",
      padding: "10px",
      backgroundColor: "rgba(138, 144, 148, 0.3)",
      boxShadow: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "40px"
    },
    index: {
      color: "#0300FF"
    }
  }));

Block.propTypes = {
    blockData: PropTypes.shape({
        attributes: PropTypes.shape({
            data: PropTypes.string,
            hash: PropTypes.string,
            index: PropTypes.number,
            previousHash: PropTypes.string,
            timestamp: PropTypes.number
        }),
        id: PropTypes.string,
        type: PropTypes.string
    })
}

export default Block;