import React from "react";
import TestRenderer from "react-test-renderer";
import Cypher, {
  missingRenderPropError,
  missingQueryError,
  missingDriverError
} from "./Cypher";
import Provider from "./Provider";

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

it("throws on missing driver prop and driver context", () => {
  expect(() => {
    TestRenderer.create(<Cypher query="x" render={() => null} />);
  }).toThrowError(missingDriverError);
});

it("renders with driver as a prop", () => {
  const out = TestRenderer.create(
    <Cypher driver={mockDriver()} query="x" render={() => null} />
  );
  expect(out.toJSON()).toEqual(null);
});

it("renders with driver context", () => {
  const out = TestRenderer.create(
    <Provider driver={mockDriver()}>
      <Cypher query="x" render={() => null} />
    </Provider>
  );
  expect(out.toJSON()).toEqual(null);
});

it("runs cypher query on mount and not on new props", () => {
  // Given
  const spy = jest.fn((query, params) => Promise.resolve());
  const query = "RETURN rand()";

  // When
  const r = TestRenderer.create(
    <Provider driver={mockDriver(spy)}>
      <Cypher query={query} render={() => null} />
    </Provider>
  );

  // Then
  expect(spy).toHaveBeenLastCalledWith(query, null);
  expect(spy).toHaveBeenCalledTimes(1);

  // When
  r.update(
    <Provider driver={mockDriver(spy)}>
      <Cypher query={"xxx"} render={() => null} />
    </Provider>
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
    <Provider driver={mockDriver(spy)}>
      <Cypher
        interval={1} // every second
        query={query}
        render={() => null}
      />
    </Provider>
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
