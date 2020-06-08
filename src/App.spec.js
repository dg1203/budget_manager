import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import mockedStore from "./__mocks__/mockedStore";

const renderComponent = (store = mockedStore) =>
  render(
    <Provider store={mockedStore}>
      <App />
    </Provider>
  );

describe("App component", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
