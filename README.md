# Reawt
> React without React, Webpack nor Babel but with modern standard Web Components and vanilla ES6 !

Beware !! It is highly experimental !

## Why ?

- looks like React but no need to transpile the source code, it works as is in your browser.
- works on all modern browsers.
- has a very small file size,currently without minification it is less than 10kB.
- Fully standard : Web Component, ES6+

## Example
index.html :

`<script module src="my-reawt-app.js" />`

my-reawt-app.js :
```javascript
import Reawt from './reawt.js';

const Main = () => {
  const [count, setCount] = useState(0);
  return html`
    <div>${count}</div>
    <button onClick=${() => setCount(count + 1)}>
      Click me
    </button>
  `;
};

Reawt.render(Main);
```


## WIP

TODO

- [x] Global code
- [x] htx minimal parser (tag, text, props)
- [ ] htx children
- [ ] htx props spreading
- [ ] htx validate characters for tag/attribute name
- [ ] htx link with Reawt
- [ ] htx dynamic values
- [ ] htx Rust/WASM
- [ ] Reawt build children from htx
- [ ] Reawt states
- [ ] Reawt attributes from props
- [ ] Reawt register()
- [ ] Reawt extend prop (button, li, ul, ...)
- [ ] Reawt Component class
- [ ] Reawt logo (3d cube glow)
- [ ] Reawt / React bench
- [ ] Reawt examples
- [ ] Reawt article
- [ ] Reawt documentation
- [ ] CI

## Planned

- [ ] Instant Dev Server
- [ ] VSCode plugin
- [ ] Reawt-UI Reawt-theme
- [ ] Browser dev tools
- [ ] Serverside rendering 
