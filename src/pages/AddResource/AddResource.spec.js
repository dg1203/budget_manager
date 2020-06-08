import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import AddResource from "./AddResource";
import mockedStore from "../../__mocks__/mockedStore";
import defaultStore from "../../store";

const defaultProps = {
  history: {
    push: jest.fn()
  }
};

const renderComponent = (store = mockedStore) =>
  render(
    <Provider store={store}>
      <AddResource {...defaultProps} />
    </Provider>
  );

describe("AddResource page", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
  it("shouldn't render information about not added jars if jars have already added", () => {
    const { queryByTestId } = renderComponent();
    expect(queryByTestId("information")).toBeFalsy();
  });
  it("should render information about not added jars if jars haven't already added", () => {
    const { getByTestId } = renderComponent(defaultStore);
    expect(getByTestId("information")).toBeTruthy();
  });
});
