import React from 'react';
import scrollAware from 'react-scrollaware';
import throttle from 'lodash.throttle';

export const ScrolledTest = scrollAware(class extends React.Component {
  _handleScroll(event) {
    console.log('scrollAware scrolled')
  }

  render() {
    return <span style={{fontSize: 0}} />;
  }
})

export function ScrolledTestThrottle(props) {
  return React.createElement(ScrolledTest, {
   ...props,
   throttleHandler: (scrollHandler) => throttle(scrollHandler, 500)
  });
}