/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html, useState } from './reawt.js';
import Counter from './components/counter.js';

const Main = () => {
  const [count, setCount] = useState(0);
  //  WIP
  return html`
    <${Counter}${{ count }} />
    <button onClick=${() => setCount(count + 1)}>
      Click me
    </button>
  `;
};

export default Main;
