# React Intersect

A react component which observes when an element becomes in or out of the viewport you provided. Useful for lazy loading and sending tracking events to analytics on scroll.

Internally this makes use of another library I created called (https://github.com/mintuz/horizon)[Horizon] and tracking of elements is done via the Intersection Observer API allowing for performant tracking on the web as it's done off the main thread reducing jank whilst scrolling.

This component makes use of the render props and state reducer patterns
* (https://blog.kentcdodds.com/the-state-reducer-pattern-%EF%B8%8F-b40316cfac57)[State reducer]
* (https://reactjs.org/docs/render-props.html)[render props]

## Install

`npm install @mintuz/react-intersect`

## Usage

### Config

| Key   |      Value      | Description | Default |
|----------|-------------|-------------|-------------|
| onEntry | `(entry) => {}` | Callback which is called when the element is in view | N/A |
| onExit | `(entry) => {}` | Callback which is called when the element is out of view | N/A |
| triggerOnce | `true` | Will trigger onEntry callback once, useful for lazyLoading | false |
| render | `(inView) => {return <div></div>}` | Render prop that returns a single boolean of if in view or not, use to conditionally load an element when in view | N/A | 
| intersectionObserverConfig | ```{ root: null, rootMargin: '35%', threshold: 0 }``` | Options passed to [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | ```{ root: null rootMargin: '35%', threshold: 0 }``` |
| stateReducer | `(prevState, changes) => {return {inView:false}}` | Allow for external manipulation of the internal state of react-intersect | N/A |

### Demo
https://codesandbox.io/s/vvm485k697