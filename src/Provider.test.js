import React, { Component } from "react";
import PropTypes from "prop-types";
import TestRenderer from "react-test-renderer";

import Provider from "./Provider";

it("Passes driver in context to one child", () => {
  // Given
  const spy = jest.fn();
  const driver = { session: spy };
  class CheckContext extends Component {
    constructor(props, context) {
      super(props, context);
      context.driver.session(true);
    }
    render() {
      return null;
    }
  }
  CheckContext.contextTypes = {
    driver: PropTypes.object.isRequired
  };

  // When
  const out = TestRenderer.create(
    <Provider driver={driver}>
      <CheckContext />
    </Provider>
  );
  expect(out.toJSON()).toEqual(null);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenLastCalledWith(true);
});

it("Passes driver in context to array of children", () => {
  // Given
  const spy = jest.fn();
  const driver = { session: spy };
  class CheckContext extends Component {
    constructor(props, context) {
      super(props, context);
      context.driver.session(true);
    }
    render() {
      return null;
    }
  }
  CheckContext.contextTypes = {
    driver: PropTypes.object.isRequired
  };

  const ArrayReturn = () => [
    <CheckContext key="1" />,
    <div key="2">Check this out</div>
  ];

  // When
  const out = TestRenderer.create(
    <Provider driver={driver}>
      <ArrayReturn />
    </Provider>
  );
  expect(out.toJSON()).toMatchSnapshot();
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenLastCalledWith(true);
});
