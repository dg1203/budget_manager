import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import JarsList from "./JarsList";
import store from "../../store";

const defaultProps = {
  jars: [
    {
      currency: "PLN",
      description: "Jar 1",
      id: "3xzty3489",
      isDefault: false,
      name: "Name 2",
      resources: []
    },
    {
      currency: "",
      description: "Jar 2",
      id: "3xsty3489",
      isDefault: false,
      name: "Name 2",
      resources: [
        {
          PLN: 250
        }
      ]
    }
  ]
};

const renderComponent = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <JarsList {...defaultProps} />
      </MemoryRouter>
    </Provider>
  );

describe("JarsList component", () => {
  it("renders the component", () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
