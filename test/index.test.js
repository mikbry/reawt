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

describe('htx texts', () => {
  // eslint-disable-next-line no-template-curly-in-string
  it('${"a"}', async () => {
    const result = htxParse`${'a'}`;
    expect(result).to.equal('a');
  });
  // eslint-disable-next-line no-template-curly-in-string
  it('hello ${"world"} !', async () => {
    const result = htxParse`hello ${'world'} !`;
    expect(result).to.equal('hello world !');
  });
  // eslint-disable-next-line no-template-curly-in-string
  it('#hello ${var} !', async () => {
    const v = 'world';
    const result = htxParse`hello ${v} !`;
    // TODO find how to indicate it is a generated text from a template using some vars
    expect(result).to.equal('hello world !');
  });
  // eslint-disable-next-line no-template-curly-in-string
  it('hello ${func()} !', async () => {
    const func = () => 'world';
    const result = htxParse`hello ${func()} !`;
    // TODO find how to indicate it is a generated text from a template using some funcs
    expect(result).to.equal('hello world !');
  });
});

describe('htx props', () => {
  it('<button enabled />', async () => {
    const result = htxParse`<button enabled />`;
    expect(result.name).to.equal('button');
    expect(result.props.enabled).to.equal(true);
  });
  it('<button enabled hidden />', async () => {
    const result = htxParse`<button enabled hidden />`;
    expect(result.name).to.equal('button');
    expect(result.props.enabled).to.equal(true);
    expect(result.props.hidden).to.equal(true);
  });
  it('<button text="" />', async () => {
    const result = htxParse`<button text="" />`;
    expect(result.name).to.equal('button');
    expect(result.props.text).to.equal('');
  });
  it('<button text="hello <world> // !" />', async () => {
    const result = htxParse`<button text="hello <world> // !" />`;
    expect(result.name).to.equal('button');
    expect(result.props.text).to.equal('hello <world> // !');
  });
  it('<a href="/home" rel="" />', async () => {
    const result = htxParse`<a href="/home" target="_blank" />`;
    expect(result.name).to.equal('a');
    expect(result.props.href).to.equal('/home');
    expect(result.props.target).to.equal('_blank');
  });
  // eslint-disable-next-line no-template-curly-in-string
  it('<button text=${"hello"} />', async () => {
    const result = htxParse`<button text=${'hello'} />`;
    expect(result.name).to.equal('button');
    expect(result.props.text).to.equal('hello');
  });
  // eslint-disable-next-line no-template-curly-in-string
  it('<button text=${var} />', async () => {
    const v = 'hello';
    const result = htxParse`<button text=${v} />`;
    expect(result.name).to.equal('button');
    expect(result.props.text).to.equal('hello');
  });
  // eslint-disable-next-line no-template-curly-in-string
  it('<button text=${func()} />', async () => {
    const func = () => 'hello';
    const result = htxParse`<button text=${func()} />`;
    expect(result.name).to.equal('button');
    expect(result.props.text).to.equal('hello');
  });
  // eslint-disable-next-line no-template-curly-in-string
  it('#dev <button onClick=${func} />', async () => {
    const func = () => 'hello';
    const result = htxParse`<button onClick=${func} />`;
    expect(result.name).to.equal('button');
    expect(result.props.onClick).to.equal(func);
  });
});
