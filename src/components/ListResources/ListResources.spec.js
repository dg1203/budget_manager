import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import ListResources from "./ListResources";
import store from "../../store";

const defaultProps = {
  jarId: "dg3hgaj",
  resources: [
    {
      PLN: 200,
      USD: 350,
      GBP: 425
    }
  ]
};

const renderComponent = (props) =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ListResources {...props} />
      </MemoryRouter>
    </Provider>
  );

describe("Header component", () => {
  it("renders the component", () => {
    const container = renderComponent(defaultProps);
    expect(container).toMatchSnapshot();
  });
  it("information about empty resources list should't be render", () => {
    const { queryByTestId } = renderComponent(defaultProps);
    expect(queryByTestId("info-emptyresources")).toBeFalsy();
  });
  it("information about empty resources list should be render if resources list is empty", () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      resources: []
    });
    expect(getByTestId("info-emptyresources")).toBeTruthy();
  });
  it("test open transfer dialog", () => {
    const { getByTestId,  } = renderComponent(defaultProps);
    fireEvent.click(getByTestId("open-transferdialog"));
    expect(getByTestId("transfer-dialog")).toBeTruthy();
  });
  it("test open payment dialog", () => {
    const { getByTestId } = renderComponent(defaultProps);
    fireEvent.click(getByTestId("open-paymentdialog"));
    expect(getByTestId("payment-dialog")).toBeTruthy();
  });
});
