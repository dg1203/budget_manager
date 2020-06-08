import {
  addJar,
  addResource,
  removeResource,
  transferResources,
  setMessage
} from "./stateActions";
import {
  ADD_JAR,
  ADD_RESOURCES,
  SET_MESSAGE,
  REMOVE_RESOURCES,
  TRANSFER_RESOURCES
} from "../types";

const payload = {
  test: "test"
};

describe("Test redux actions", () => {
  it("test add jar action", () => {
    const returnedValue = addJar(payload);
    expect(returnedValue).toStrictEqual({
      type: ADD_JAR,
      payload
    });
  });
  it("test add resource action", () => {
    const returnedValue = addResource(payload);
    expect(returnedValue).toStrictEqual({
      type: ADD_RESOURCES,
      payload
    });
  });
  it("test remove resource action", () => {
    const returnedValue = removeResource(payload);
    expect(returnedValue).toStrictEqual({
      type: REMOVE_RESOURCES,
      payload
    });
  });
  it("test transfer resource action", () => {
    const returnedValue = transferResources(payload);
    expect(returnedValue).toStrictEqual({
      type: TRANSFER_RESOURCES,
      payload
    });
  });
  it("test set message action", () => {
    const returnedValue = setMessage(payload);
    expect(returnedValue).toStrictEqual({
      type: SET_MESSAGE,
      payload
    });
  });
});
