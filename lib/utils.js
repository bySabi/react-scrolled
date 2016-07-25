'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWindow = getWindow;
exports.findScrollableAncestor = findScrollableAncestor;
exports.getScrollableAncestorRect = getScrollableAncestorRect;
exports.getComponentPosition = getComponentPosition;
var POSITIONS = exports.POSITIONS = {
  above: 'above',
  inside: 'inside',
  below: 'below',
  invisible: 'invisible'
};

function getWindow() {
  return typeof window !== 'undefined';
}

/**
 * Traverses up the DOM to find an ancestor container which has an overflow
 * style that allows for scrolling.
 *
 * @return {Object} the closest ancestor element with an overflow style that
 *   allows for scrolling. If none is found, the `window` object is returned
 *   as a fallback.
 */
function findScrollableAncestor(node) {
  while (node.parentNode) {
    node = node.parentNode;

    if (node === document) {
      // This particular node does not have a computed style.
      continue;
    }

    if (node === document.documentElement) {
      // This particular node does not have a scroll bar,
      // it uses the window.
      continue;
    }

    var style = window.getComputedStyle(node);
    var overflowY = style.getPropertyValue('overflow-y') || style.getPropertyValue('overflow');

    if (overflowY === 'auto' || overflowY === 'scroll') {
      return node;
    }
  }

  // A scrollable ancestor element was not found,
  // which means that we need to do stuff on window.
  return window;
}

function getScrollableAncestorRect(scrollableAncestor) {
  var contextHeight = void 0;
  var contextScrollTop = void 0;
  if (scrollableAncestor === window) {
    contextHeight = window.innerHeight;
    contextScrollTop = 0;
  } else {
    contextHeight = scrollableAncestor.offsetHeight;
    contextScrollTop = scrollableAncestor.getBoundingClientRect().top;
  }
  var contextBottom = contextScrollTop + contextHeight;
  return { contextBottom: contextBottom, contextScrollTop: contextScrollTop, contextHeight: contextHeight };
}

/**
 * @return {string} The current position of the component `Top` in relation to the
 *   visible portion of the scrollable parent. One of `POSITIONS.above`,
 *   `POSITIONS.below`, or `POSITIONS.inside`.
 */
function getComponentPosition(component, scrollableAncestor) {
  var waypointTop = component.getBoundingClientRect().top;

  var _getScrollableAncesto = getScrollableAncestorRect(scrollableAncestor);

  var contextBottom = _getScrollableAncesto.contextBottom;
  var contextScrollTop = _getScrollableAncesto.contextScrollTop;
  var contextHeight = _getScrollableAncesto.contextHeight;


  if (contextHeight === 0) {
    return POSITIONS.invisible;
  }

  if (waypointTop >= contextScrollTop && waypointTop <= contextBottom) {
    return POSITIONS.inside;
  }

  if (waypointTop > contextBottom) {
    return POSITIONS.below;
  }

  if (waypointTop < contextScrollTop) {
    return POSITIONS.above;
  }

  return POSITIONS.invisible;
}