import { Component } from "react";
import PropTypes from "prop-types";

class Provider extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getChildContext() {
    return {
      driver: this.props.driver
    };
  }

  render() {
    const children = this.props.children;
    return Array.isArray(children) ? children[0] : children;
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
