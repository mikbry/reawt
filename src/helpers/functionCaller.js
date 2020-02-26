/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See : https://stackoverflow.com/questions/280389/how-do-you-find-out-the-caller-function-in-javascript
const functionCaller = (depth = 0) => {
  let stack = new Error('fc').stack.split('\n');
  // console.log('pre-stack=', stack);
  const header = stack.shift();
  let start = 0;
  let endTag = 0;
  if (header === 'Error: fc') {
    // Chrome
    stack.shift();
    start = '    at '.length;
    endTag = ' (';
  } else if (header.startsWith('functionCaller@')) {
    // Firefox / Safari
    endTag = '@';
  } else {
    throw new Error('Unknown function caller format');
  }
  stack = Array.from(stack, element => {
    const end = element.indexOf(endTag);
    if (end === -1) {
      return '';
    }
    const name = element.substring(start, end).trim();
    const i = name.indexOf('.');
    // remove Chrome Class name
    return i < 0 ? name : name.substring(i + 1);
  }).filter(e => e.length > 0);
  // console.log('stack=', stack);
  return stack[depth];
};

export default functionCaller;
