import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import TransferDialog from "./TransferDialog";
import mockedStore from "../../__mocks__/mockedStore";

const defaultProps = {
  open: true,
  openDialog: jest.fn(),
  currency: "PLN",
  amount: 200,
  jarId: "45das8"
};

const renderComponent = () =>
  render(
    <Provider store={mockedStore}>
      <TransferDialog {...defaultProps} />
    </Provider>
  );

describe("TransferDialog component", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
  it("test close method dialog", () => {
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("close-button"));
    expect(defaultProps.openDialog).toBeCalledWith(false);
  });
  it('test target select change', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("target-select")).toBeTruthy();
  });
  it("test on save method", () => {
    const dispatchSpy = jest.spyOn(mockedStore, "dispatch");
    const {getByTestId} = renderComponent();
    fireEvent.click(getByTestId("save-button"));
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "TRANSFER_RESOURCES",
      payload: {
        jarId: defaultProps.jarId,
        targetId: "fds",
        currency: defaultProps.currency,
        amount: 0
      }
    });
    expect(defaultProps.openDialog).toBeCalledWith(false);
  });
});
