/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect } from 'chai';
import { htxParse } from '../src/helpers/htx.js';

describe('htx elements', () => {
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
    expect(result.name).to.equal('div');
  });
  it('<div />', async () => {
    const result = htxParse`<div />`;
    expect(result.name).to.equal('div');
  });
  it('<div></div>', async () => {
    const result = htxParse`<div />`;
    expect(result.name).to.equal('div');
  });
  it('<button >', async () => {
    const result = htxParse`<button >`;
    expect(result.name).to.equal('button');
  });
  it('</>', async () => {
    const result = htxParse`</>`;
    expect(result.name).to.equal(undefined);
  });
  it('<>', async () => {
    const result = htxParse`<>`;
    expect(result.name).to.equal(undefined);
  });
  it('<div /><p></p><br><//>', async () => {
    const result = htxParse`<div /><p></p><br><//>`;
    expect(result.length).to.equal(3);
    expect(result[0].name).to.equal('div');
    expect(result[1].name).to.equal('p');
    expect(result[2].name).to.equal('br');
  });
  // eslint-disable-next-line no-template-curly-in-string
  it('<${a}>', async () => {
    const a = () => {};
    const result = htxParse`<${a}>`;
    expect(result.name).to.equal('a');
    expect(result.func).to.equal(a);
  });
  // eslint-disable-next-line no-template-curly-in-string
  it('<${a} >', async () => {
    const a = () => {};
    const result = htxParse`<${a} >`;
    expect(result.name).to.equal('a');
    expect(result.func).to.equal(a);
  });
  // eslint-disable-next-line no-template-curly-in-string
  it('<${a} />', async () => {
    const a = () => {};
    const result = htxParse`<${a} >`;
    expect(result.name).to.equal('a');
    expect(result.func).to.equal(a);
  });
  // eslint-disable-next-line no-template-curly-in-string
  it('<${"a"} />', async () => {
    const result = htxParse`<${'a'} >`;
    expect(result.name).to.equal('a');
    expect(result.func).to.equal(undefined);
  });
});
