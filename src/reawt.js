/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

class Reawt {
  constructor() {
    this.components = {};
  }

  // It a template literals
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  createElement(strings, ...parameters) {
    // TODO
    this.strings = strings;
    this.parameters = parameters;
    // console.log('strings=', strings, 'parameters', parameters);
    return strings[0].trim();
  }

  render(component, _root) {
    const root = _root;
    if (typeof component === 'function') {
      const { name } = component;
      this.components[name] = component;
      const element = component();
      // console.log('name=', name, 'element=', element);
      root.innerHTML = element;
    }
  }
}

const instance = new Reawt();

export const html = instance.createElement.bind(instance);

export default instance;
