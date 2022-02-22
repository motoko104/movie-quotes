import * as ActionTypes from '../constants/actionTypes';
import reducer from './nodes';
import initialState from './initialState';


describe('Reducers::Nodes', () => {
  const getInitialState = () => {
    return initialState().nodes;
  };

  const nodeA = {
    id: 'anchorman',
    online: false,
    title: null
  };

  const nodeB = {
    id: 'moby-dick',
    online: false,
    title: null
  };

  const nodeABlocks = [
      {
      "id": "5",
      "type": "blocks",
      "attributes": {
          "index": 1,
          "timestamp": 1530679678,
          "data": "The Human Torch",
          "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
          "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
        }
      },
      {
        "id": "6",
        "type": "blocks",
        "attributes": {
            "index": 2,
            "timestamp": 1530679684,
            "data": "is denied",
            "previous-hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
            "hash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4="
        }
      },
      {
        "id": "7",
        "type": "blocks",
        "attributes": {
            "index": 3,
            "timestamp": 1530679689,
            "data": "a bank loan",
            "previous-hash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4=",
            "hash": "YGLfNDMC2x2m5kwb3q+Ne/uCL4sFUnX/sQwzuwijx8A="
        }
      }
    ]

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          loading: true
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodeA, res: {title: 'alpha'} };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          title: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_FAILURE', () => {
    const appState = {
      list: [
        {
          ...nodeA,
          online: true,
          title: 'alpha',
          loading: false
        },
        nodeB
      ]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          online: false,
          title: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_NODE_BLOCKS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.GET_NODE_BLOCKS_SUCCESS, node: nodeA, res: {blocks: nodeABlocks} };
    const expected = {
      list: [
        nodeA,
        nodeB
      ],
      blocks: nodeABlocks
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_NODE_BLOCKS_FAILURE', () => {
    const appState = {
      list: [
        {
          ...nodeA,
          online: true,
          title: 'alpha',
          loading: false
        },
        nodeB
      ]
    };
    const action = { type: ActionTypes.GET_NODE_BLOCKS_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          title: 'alpha',
          loading: false
        },
        {
          ...nodeB,
          online: false,
          title: null
        }
      ],
      blocks: []
    };
    expect(reducer(appState, action)).toEqual(expected);
  });
});
