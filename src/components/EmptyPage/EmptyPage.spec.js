import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import EmptyPage from "./EmptyPage";
import store from "../../store";

const renderComponent = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <EmptyPage />
      </MemoryRouter>
    </Provider>
  );

describe("EmptyPage component", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
