import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import SplitPayment from "./SplitPayment";
import store from "../../store";
import PaymentDialog from "../PaymentDialog";

const defaultProps = {
  availableJars: [
    {
      id: "asdasda",
      name: "Jar 1",
      description: "desc",
      currency: "",
      resources: []
    },
    {
      id: "asdadsadsda",
      name: "Jar 2",
      description: "desc",
      currency: "PLN",
      resources: []
    }
  ],
  amount: 200,
  setSplitJars: jest.fn()
};

const renderComponent = () =>
  render(
    <Provider store={store}>
      <SplitPayment {...defaultProps} />
    </Provider>
  );

describe("SplitPayment component", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
