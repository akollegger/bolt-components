## Bolt Components

Built on `create-react-app` and uses React 16.

## Usage

```javascript
<Cypher
  query='RETURN rand() as n' // Cypher query. (required)
  render={({pending, error, result}) => { // Function to be called on render (required)
    return pending ? 'pending' : error ? error.message : result.records[0].get('n')
  }}
  driver={driver} // neo4j-driver (optional)
  params={{id: 1}} // Params to be passed with the query (optional)
  interval={10} // Run every 10 seconds (optional)
/>
```

## Examples

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
render(<App />, document.getElementById('root'))


// or via props for standalone components
render(
  <Cypher
    driver={driver}
    query='RETURN rand() as n'
    render={({pending, error, result}) => {
      return pending ? 'pending' : error ? error.message : result.records[0].get('n')
    }}
  />
, document.getElementById('root'))


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
