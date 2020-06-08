import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import AddJar from "./AddJar";
import store from "../../store";

const defaultProps = {
  history: {
    push: jest.fn()
  }
};

const renderComponent = () =>
  render(
    <Provider store={store}>
      <AddJar {...defaultProps} />
    </Provider>
  );

describe("AddJar page", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
  it("test save jar method", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    const { getByTestId } = renderComponent();
    fireEvent.submit(getByTestId("form"), );
    expect(dispatchSpy).toBeCalledWith({
      type: "ADD_JAR",
      payload: {
        name: "",
        currency: "",
        description: "",
        isDefault: false
      }
    });
  });
});
