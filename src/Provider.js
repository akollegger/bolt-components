import { Component } from "react";
import * as PropTypes from "prop-types";

class Provider extends Component {
  getChildContext() {
    return {
      driver: this.props.driver
    };
  }

  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  driver: PropTypes.object
};

Provider.propTypes = {
  driver: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default Provider;
