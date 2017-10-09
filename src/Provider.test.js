import React, { Component } from "react";
import PropTypes from "prop-types";
import TestRenderer from "react-test-renderer";

import Provider from "./Provider";

it("Passes driver in context", () => {
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
