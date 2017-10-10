import React from "react";
import TestRenderer from "react-test-renderer";
import { Cypher, Provider } from "./index";
import { mockDriver } from "../config/test_helpers";

it("loads Cypher", () => {
  const out = TestRenderer.create(
    <Cypher query="x" driver={mockDriver()} render={() => null} />
  );
  expect(out.toJSON()).toEqual(null);
});
it("loads Provider", () => {
  const out = TestRenderer.create(
    <Provider driver={mockDriver()}>
      <div />
    </Provider>
  );
  expect(out.toJSON()).toMatchSnapshot();
});
