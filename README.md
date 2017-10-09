## Bolt Components

Built on `create-react-app` and uses React 16.

## Usage

```
<Cypher
  render = fn to be invoked on any state change in the component
  query = the query to be executed
  params = optional params to send with the query
  interval = run query at an interval in seconds
  driver = connected neo4j-driver
/>

```

## Development

```
git clone git@github.com:oskarhane/bolt-components.git bolt-components
cd bolt-components
yarn install
yarn test
```
