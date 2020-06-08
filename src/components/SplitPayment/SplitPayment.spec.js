import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import SplitPayment from "./SplitPayment";
import mockedStore from "../../__mocks__/mockedStore";
import store from "../../store";

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

const renderComponent = (store = mockedStore) =>
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
  it("should render correct inforamtion about default jar if defaultJAr state", () => {
    const { getByTestId, queryByTestId } = renderComponent();
    expect(queryByTestId("info-notdefaultjar")).toBeFalsy();
    expect(getByTestId("info-defaultjar")).toBeTruthy();
  });
  it("should render correct inforamtion about default jar if not defaultJar state", () => {
    const { getByTestId, queryByTestId } = renderComponent(store);
    expect(getByTestId("info-notdefaultjar")).toBeTruthy();
    expect(queryByTestId("info-defaultjar")).toBeFalsy();
  });
});
