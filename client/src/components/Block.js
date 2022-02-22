import React from "react";
import PropTypes from 'prop-types';
import {
    Card
} from '@material-ui/core';

const Block =({ blockData }) => {
    return (
        <Card id={blockData.hash}>{blockData.attributes.data}</Card>
    )
};

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