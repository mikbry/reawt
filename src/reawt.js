/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

let reawt = null;

class Reawt {
  constructor() {
    this.components = {};
    this.applicationName = 'app';
    this.prefix = this.applicationName;
    this.states = {};
  }

  // It a template literals
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  createElement(strings, ...parameters) {
    // TODO
    this.strings = strings;
    this.parameters = parameters;
    console.log('strings=', strings, 'parameters', parameters);
    return strings[0].trim();
  }

  render(component, root = document.body) {
    if (typeof component === 'function') {
      const { name } = component;
      const tagName = `${this.prefix}-${name}`.toLowerCase();
      this.components[name] = {
        name,
        tagName,
        func: component,
        'class-def': class extends HTMLElement {
          connectedCallback() {
            reawt.connectedElement = this;
            this.states = {};
            const html = component();
            this.innerHTML = html;
            reawt.connectedElement = null;
          }
        },
      };
      // https://developers.google.com/web/fundamentals/web-components/customelements
      customElements.define(tagName, this.components[name]['class-def']);
      console.log('componentDef=', this.components[name]);
      const element = document.createElement(tagName);
      root.prepend(element);
    }
  }

  useState(_value) {
    let value = _value;
    const uid = 0; // TODO generate uid
    const func = v => {
      value = v;
    }; // TODO
    this.connectedElement.states[uid] = { value, func };
    return [value, func];
  }
}

reawt = new Reawt();
const instance = reawt;

export const html = reawt.createElement.bind(reawt);
export const useState = reawt.useState.bind(reawt);

export default instance;
