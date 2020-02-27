/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Template literals
// See : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
// Inspiration : https://github.com/developit/htm
// CHUNK_ELEMENT=CHUNK_TEXT[SPACING]['<'CHUNK_START[{[SPACING]CHUNK_ATTR}+]['/']['>'][CHUNK_ELEMENT]['</'CHUNK_END'>']]
const CHUNK_TEXT = 0; // = ANY CHARACTER
const CHUNK_START = 1; //  = <TAGNAME
const CHUNK_ATTR = 2; // = ATTRNAME[=ATTRVALUE]
const CHUNK_END = 3; // = </TAGNAME>
// const CHUNK_COMMENT = 3; // TODO

// eslint-disable-next-line import/prefer-default-export
export const htxParse = (strings, ...params) => {
  // WIP
  console.log('params=', params);
  let chunk = CHUNK_TEXT;
  let buffer = '';
  let currentTag;
  let isQuote = false;
  const root = [];
  const children = root;
  let param = null;

  const store = index => {
    // WIP store
    let name = buffer.trim();
    if (chunk === CHUNK_START && !currentTag) {
      console.log('chunkstart=', name);
      currentTag = {};
      if (!name.length && param) {
        console.log('param=', param, 'index=', index);
        if (typeof param === 'string') {
          name = param;
        } else if (typeof param === 'function') {
          const func = param;
          name = func.name;
          currentTag.func = func;
        }
      } else if (!name.length) {
        name = undefined;
      }
      currentTag.name = name;
      children.push(currentTag);
    } else if (chunk === CHUNK_END && currentTag) {
      console.log('chunk_end=', currentTag.name, name);
      currentTag = undefined;
      chunk = CHUNK_TEXT;
    } else if (chunk === CHUNK_ATTR && name.length) {
      if (!currentTag.props) {
        currentTag.props = {};
      }
      let value;
      const eq = name.indexOf('=');
      if (eq > 0) {
        value = name.substring(eq + 1);
        name = name.substring(0, eq);
        if (typeof param === 'string') {
          value += param;
        } else if (param) {
          value = param;
        }
      } else {
        value = true;
      }
      console.log('chunk_attr=', name, value, eq);
      currentTag.props[name] = value;
    }
    buffer = '';
  };

  strings.forEach((string, index) => {
    for (let char of string) {
      if (char === '<' && !isQuote && chunk === CHUNK_TEXT) {
        store(index);
        chunk = CHUNK_START;
        char = '';
      } else if (char === '>' && !isQuote && (chunk === CHUNK_START || chunk === CHUNK_ATTR || chunk === CHUNK_END)) {
        store(index);
        char = '';
        chunk = CHUNK_TEXT;
      } else if (char <= '  ' && !isQuote && (chunk === CHUNK_START || chunk === CHUNK_END || chunk === CHUNK_ATTR)) {
        store(index);
        char = '';
        if (chunk === CHUNK_START) {
          chunk = CHUNK_ATTR;
        }
      } else if (char === '/' && !isQuote && (chunk === CHUNK_START || chunk === CHUNK_ATTR)) {
        if (!currentTag) {
          store(index);
        }
        currentTag.closed = true;
        store(index);
        chunk = CHUNK_END;
        char = '';
      } else if (char === '"' && chunk === CHUNK_ATTR) {
        isQuote = !isQuote;
        char = '';
      }
      buffer += char;
      console.log('c=', char, 'buffer=', buffer, 'chunk=', chunk, 'index=', index);
    }
    param = params[index];
    if (chunk === CHUNK_TEXT) {
      if (typeof param === 'string') {
        buffer += param;
      }
    }
  });
  console.log(`root=${root.length} buffer='${buffer}'`);
  if (root.length === 1) {
    return root[0];
  }
  if (root.length === 0) {
    return buffer;
  }
  return root;
};
