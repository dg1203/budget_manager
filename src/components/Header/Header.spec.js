import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import Header from "./Header";
import store from "../../store";

const renderComponent = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );

describe("Header component", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
  // it("test open menu", () => {
  //   const setOpenSpy = jest.spyOn("setOpen");
  //   const { getByTestId } = renderComponent();
  //   fireEvent.click(getByTestId("open-button"));
  //   expect(setOpenSpy).toHaveBeenCalledWith(true);
  // });
});
