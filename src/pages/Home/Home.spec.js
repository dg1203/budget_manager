import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Home from "./Home";
import mockedStore from "../../__mocks__/mockedStore";
import { MemoryRouter } from "react-router";

const renderComponent = () =>
  render(
    <Provider store={mockedStore}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );

describe("Home page", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
