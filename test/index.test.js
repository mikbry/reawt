/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect } from 'chai';
import { htxParse } from '../src/helpers/htx.js';

describe('htx', () => {
  it('empty string', async () => {
    const result = htxParse``;
    expect(result).to.equal('');
  });
  it('hello string', async () => {
    const result = htxParse`hello`;
    expect(result).to.equal('hello');
  });
  it('<div/>', async () => {
    const result = htxParse`<div/>`;
    console.log('result=', result);
    expect(result.name).to.equal('div');
  });
});
