/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Inspiration : https://github.com/developit/htm
const CHUNK_TEXT = 0;
const CHUNK_START = 1;
const CHUNK_END = 2;
// const CHUNK_COMMENT = 3;

// eslint-disable-next-line import/prefer-default-export
export const htxParse = (strings, params) => {
  // WIP
  let chunk = CHUNK_TEXT;
  let buffer = '';
  let currentTag = {};
  const root = currentTag;
  let prev;
  const store = index => {
    // TODO store
    if (chunk === CHUNK_START) {
      let name = buffer.trim();
      if (!name.length && params) {
        const func = params[index];
        name = func.name;
        currentTag.func = func;
      }
      currentTag.name = name;
    } else if (chunk === CHUNK_END) {
      currentTag = { parent: currentTag };
    }
    buffer = '';
  };
  strings.forEach((string, index) => {
    for (const char of string) {
      if (chunk === CHUNK_TEXT) {
        if (char === '<') {
          store(index);
          chunk = CHUNK_START;
        } else {
          buffer += char;
        }
      } else if (chunk === CHUNK_START) {
        if (char === '>') {
          store(index);
          if (prev === '/') {
            // chunk = CHUNK_END;
          }
          chunk = CHUNK_TEXT;
        } else if (char < '  ') {
          if (buffer.trim()) {
            store(index);
          }
          // TODO parse attributes
        } else if (char !== '/') {
          buffer += char;
        }
      } else if (char !== '/') {
        buffer += char;
      }
      console.log('c=', char);
      prev = char;
    }
  });
  console.log('root=', Object.keys(root).length, 'buffer="', buffer, '"');
  if (Object.keys(root).length === 0) {
    return buffer;
  }
  console.log('ok');
  return root;
};
