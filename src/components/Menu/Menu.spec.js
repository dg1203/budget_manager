import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Menu from "./Menu";
import store from "../../store";

const defaultProps = {
  open: true,
  setOpen: open => open,
  history: {
    push: jest.fn()
  }
};

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Menu {...defaultProps} />
    </Provider>
  );

describe("Menu component", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
  it("test click on first list element", () => {
    const { getAllByTestId } = renderComponent();
    fireEvent.click(getAllByTestId("list-item")[0]);
    expect(defaultProps.history.push).toBeCalledWith("/jar/add");
  });
  it("test click on second list element", () => {
    const { getAllByTestId } = renderComponent();
    fireEvent.click(getAllByTestId("list-item")[1]);
    expect(defaultProps.history.push).toBeCalledWith("/resource/add");
  });
  it("test click on third list element", () => {
    const { getAllByTestId } = renderComponent();
    fireEvent.click(getAllByTestId("list-item")[2]);
    expect(defaultProps.history.push).toBeCalledWith("/history");
  });
});
