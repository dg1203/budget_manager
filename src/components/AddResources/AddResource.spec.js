import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import AddResources from "./AddResources";
import store from "../../store";

const defaultProps = {
  currency: "PLN",
  jarId: "qw232da"
};

const renderComponent = () =>
  render(
    <Provider store={store}>
      <AddResources {...defaultProps} />
    </Provider>
  );

describe("AddResource component", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
  it("test form save", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    const { getByTestId } = renderComponent();
    fireEvent.submit(getByTestId("form"));
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "ADD_RESOURCES",
      payload: {
        id: defaultProps.jarId,
        resource: {
          title: "",
          amount: 0,
          currency: defaultProps.currency
        }
      }
    });
  });
});
