## Bolt Components

Built on `create-react-app` and uses React 16.

## Usage

```javascript
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "password"))

// Pass driver via context for apps
const App = () => (
  <Provider driver={driver}>
    <Cypher
      query='RETURN rand() as n'
      render={({pending, error, result}) => {
        return pending ? 'pending' : error ? error.message : result.records[0].get('n')
      }}
    />
  </Provider>
)

// or via props for standalone components
const App = () => (
  <Cypher
    driver={driver}
    query='RETURN rand() as n'
    render={({pending, error, result}) => {
      return pending ? 'pending' : error ? error.message : result.records[0].get('n')
    }}
  />
)

render(<App />, document.getElementById('root'))
```

## &lt;Cypher> API

```
<Cypher
  render = fn to be invoked on any state change in the component
  query = the query to be executed
  params = optional params to send with the query
  interval = run query at an interval (in seconds)
  driver = connected neo4j-driver (optional, can be sent via context with <Provider> instead)
/>

```

## Development

```bash
git clone git@github.com:oskarhane/bolt-components.git bolt-components
cd bolt-components
yarn install
yarn test
```
