import React, { useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import Horizon from "@mintuz/horizon";

export const useIntersect = ({
  triggerOnce = false,
  intersectionObserverConfig
}) => {
  const instanceRef = useRef(null);
  const [inView, setInView] = useState(false);

  const onEntry = () => {
    setInView(true);
  };

  const onExit = () => {
    setInView(false);
  };

  const ref = useCallback(
    node => {
      if (instanceRef.current) {
        instanceRef.current.unobserve();
      }

      if (node) {
        const instance = Horizon({
          onEntry,
          onExit,
          triggerOnce,
          toObserve: node,
          intersectionObserverConfig
        });

        instanceRef.current = instance;
      }
    },
    [triggerOnce, intersectionObserverConfig]
  );

  return [inView, ref];
};

export default class ReactIntersect extends React.Component {
  state = {
    inView: false
  };

  onEntry = entry => {
    if (this.props.onEntry) {
      this.props.onEntry(entry);
    }

    this.setState(prevState => {
      const newState = {
        inView: true
      };

      return this.props.stateReducer
        ? this.props.stateReducer(prevState, newState)
        : newState;
    });
  };

  onExit = entry => {
    if (this.props.onExit) {
      this.props.onExit(entry);
    }

    this.setState(prevState => {
      const newState = {
        inView: false
      };

      return this.props.stateReducer
        ? this.props.stateReducer(prevState, newState)
        : newState;
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.inView !== this.state.inView;
  }

  componentDidMount() {
    Horizon({
      onEntry: this.onEntry,
      onExit: this.onExit,
      triggerOnce: this.props.triggerOnce,
      toObserve: ReactDOM.findDOMNode(this),
      intersectionObserverConfig: {
        ...this.props.intersectionObserverConfig
      }
    });
  }

  render() {
    return this.props.render(this.state.inView);
  }
}
