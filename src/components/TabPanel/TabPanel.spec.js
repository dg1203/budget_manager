import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import TabPanel from "./TabPanel";
import store from "../../store";

const defaultProps = {
  children: React.ReactNode,
  value: "Test",
  index: 0
};

const renderComponent = () =>
  render(
    <Provider store={store}>
      <TabPanel {...defaultProps} />
    </Provider>
  );

describe("TabPanel component", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
