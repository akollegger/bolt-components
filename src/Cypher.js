import React, { Component } from "react";
import PropTypes from "prop-types";

export const missingRenderPropError =
  "Pass render property to render something. <Cypher render={({pending, error, response} => {})} />";
export const missingQueryError =
  "A property named 'query' is missing. Component needs a query to be executed.";
export const missingDriverError =
  "A property or conext object named 'driver' is missing. Component needs a connected driver to send queries over. See <Provider>.";

/**
 * Interface
 * <Cypher
 *  render = fn to be invoked on any state change in the component
 *  query = the query to be executed
 *  params = optional params to send with the query
 *  interval = run query at an interval in seconds
 *  driver = connected neo4j-driver
 * />
 */

class Cypher extends Component {
  constructor(props, context) {
    super(props, context);
    this.driver = props.driver || context.driver;
  }
  state = {
    result: null,
    pending: false,
    error: false,
    tick: 0
  };
  componentDidMount() {
    this.query(this.props);
    if (this.props.interval) {
      this.interval = setInterval(
        () => this.query(this.props),
        this.props.interval * 1000
      );
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  query(props) {
    const { query, params = null } = props;
    if (!query) throw new Error(missingQueryError);
    if (!this.driver) throw new Error(missingDriverError);
    this.setState({ pending: true });
    const session = this.driver.session();
    session
      .run(query, params)
      .then(res => {
        this.setState({
          pending: false,
          result: res,
          error: null,
          tick: this.state.tick + 1
        });
      })
      .catch(error => {
        this.setState({
          pending: false,
          result: null,
          error: error,
          tick: this.state.tick + 1
        });
      });
  }
  render() {
    if (!this.props.render) {
      throw new Error(missingRenderPropError);
      return;
    }
    return this.props.render({ ...this.state });
  }
}

Cypher.contextTypes = {
  driver: PropTypes.object
};

export default Cypher;
