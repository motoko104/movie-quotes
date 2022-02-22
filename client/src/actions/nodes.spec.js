import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./nodes";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

describe("Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const node = {
    id: "anchorman",
    online: false,
    title: null,
  };

  const blocks = [
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
];

  it("should fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ title: "Anchorman" });
        },
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node,
        res: { title: "Anchorman" },
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail when an error is returned for node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        err: new Error()
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fetch the node blocks", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ blocks: blocks });
        }
      })
    );
    await ActionCreators.getNodeBlocks(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.GET_NODE_BLOCKS_SUCCESS,
        node,
        res: { blocks: blocks }
      }
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node blocks", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400
      })
    );
    await ActionCreators.getNodeBlocks(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.GET_NODE_BLOCKS_FAILURE,
        node
      }
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail when an error is returned for node blocks", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        err: new Error()
      })
    );
    await ActionCreators.getNodeBlocks(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.GET_NODE_BLOCKS_FAILURE,
        node
      }
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });
});
