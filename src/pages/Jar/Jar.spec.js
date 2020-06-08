import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Jar from "./Jar";
import mockedStore from "../../__mocks__/mockedStore";
import { MemoryRouter } from "react-router";

const renderComponent = () =>
  render(
    <Provider store={mockedStore}>
      <MemoryRouter initialEntries={["/jar/add/dasas"]}>
        <Jar />
      </MemoryRouter>
    </Provider>
  );

describe("Jar page", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
