## Bolt Components

Built on `create-react-app` and uses React 16.

## Usage

```javascript
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "password"))

// Pass driver via context for apps
const App = () => (
  <Provider driver={driver}> // neo4j-driver
    <Cypher
      query='RETURN rand() as n' // Cypher query
      render={({pending, error, result}) => { // Function to be called on render
        return pending ? 'pending' : error ? error.message : result.records[0].get('n')
      }}
    />
  </Provider>
)

// or via props for standalone components
const App = () => (
  <Cypher
    driver={driver} // neo4j-driver (optional)
    query='RETURN rand() as n' // Cypher query
    params={{id: 1}} // Params to be passed with the query (optional)
    interval={10} // Run every 10 seconds (optional)
    render={({pending, error, result}) => { // Function to be called on render
      return pending ? 'pending' : error ? error.message : result.records[0].get('n')
    }}
  />
)

render(<App />, document.getElementById('root'))
```

## &lt;Cypher> render property API

### render ({ pending, error, result, tick })
This function will be called on every render.

#### Arguments

```javascript
type obj = {
  pending: boolean,
  error: ErrorObject,
  result: BoltResult,
  tick: number // auto increasing number
}

type ErrorObject = {
  type: string,
  message: string
}

type BoltResult = {
  records: Array<ResultRecord>,
  summary: SummaryObject
}

type ResultRecord = {
  // ...
}

type SummaryObject = {
  // ...
}
```

## Development

```bash
git clone git@github.com:oskarhane/bolt-components.git bolt-components
cd bolt-components
yarn install
yarn test
```
