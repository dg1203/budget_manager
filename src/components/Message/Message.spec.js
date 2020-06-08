import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Message from "./Message";
import store from "../../store";

const defaultProps = {
  message: "Message text"
};

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Message {...defaultProps} />
    </Provider>
  );

describe("Message component", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
