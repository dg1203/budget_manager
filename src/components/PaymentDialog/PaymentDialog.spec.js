import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import PaymentDialog from "./PaymentDialog";
import store from "../../store";

const defaultProps = {
  currency: "PLN",
  amount: 200,
  jarId: "hdywekr",
  open: true,
  openDialog: jest.fn()
};

const renderComponent = () =>
  render(
    <Provider store={store}>
      <PaymentDialog {...defaultProps} />
    </Provider>
  );

describe("PaymentDialog component", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
  it("test close method dialog", () => {
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("close-button"));
    expect(defaultProps.openDialog).toBeCalledWith(false);
  });
  it("test on save method", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("save-button"));
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "REMOVE_RESOURCES",
      payload: {
        currency: defaultProps.currency,
        jarId: defaultProps.jarId,
        amount: 0
      }
    });
    expect(defaultProps.openDialog).toBeCalledWith(false);
  });
});
