import React from "react";
import TestRenderer from "react-test-renderer";
import Cypher, {
  missingRenderPropError,
  missingQueryError,
  missingDriverError
} from "./Cypher";

const mockDriver = (spy = () => Promise.resolve()) => ({
  session: () => ({
    run: spy
  })
});

it("renders without crashing", () => {
  const out = TestRenderer.create(
    <Cypher query="x" driver={mockDriver()} render={() => null} />
  );
  expect(out.toJSON()).toEqual(null);
});

it("throws on missing render prop", () => {
  expect(() => {
    TestRenderer.create(<Cypher />);
  }).toThrowError(missingRenderPropError);
});

it("throws on missing query prop", () => {
  expect(() => {
    TestRenderer.create(<Cypher render={() => null} />);
  }).toThrowError(missingQueryError);
});

it("throws on missing driver prop", () => {
  expect(() => {
    TestRenderer.create(<Cypher query="x" render={() => null} />);
  }).toThrowError(missingDriverError);
});

it("runs cypher query on mount and not on new props", () => {
  // Given
  const spy = jest.fn((query, params) => Promise.resolve());
  const query = "RETURN rand()";

  // When
  const r = TestRenderer.create(
    <Cypher driver={mockDriver(spy)} query={query} render={() => null} />
  );

  // Then
  expect(spy).toHaveBeenLastCalledWith(query, null);
  expect(spy).toHaveBeenCalledTimes(1);

  // When
  r.update(
    <Cypher driver={mockDriver(spy)} query={"xxx"} render={() => null} />
  );

  // Then
  expect(spy).toHaveBeenLastCalledWith(query, null);
  expect(spy).toHaveBeenCalledTimes(1);
});

it("runs cypher query at an interval", () => {
  // Given
  jest.useFakeTimers();

  const spy = jest.fn((query, params) => Promise.resolve());
  const query = "RETURN rand()";

  // When
  const r = TestRenderer.create(
    <Cypher
      interval={1} // every second
      driver={mockDriver(spy)}
      query={query}
      render={() => null}
    />
  );

  // Then
  expect(spy).toHaveBeenLastCalledWith(query, null);
  expect(spy).toHaveBeenCalledTimes(1);

  // When
  jest.runOnlyPendingTimers();

  // Then
  expect(spy).toHaveBeenLastCalledWith(query, null);
  expect(spy).toHaveBeenCalledTimes(2);

  // When
  jest.runOnlyPendingTimers();

  // Then
  expect(spy).toHaveBeenLastCalledWith(query, null);
  expect(spy).toHaveBeenCalledTimes(3);
});
