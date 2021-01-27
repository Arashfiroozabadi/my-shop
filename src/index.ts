import * as ES6Promise from 'es6-promise';

import './style.scss';

interface Type {
  [x: string]: any;
}

ES6Promise.polyfill();
async function renderWidget() {
  // Locate the widget container
  const container = document.getElementById('div');

  // If we found the container, import the widget and render it into the container
  if (container !== null) {
    const widget: Type = await import(/* webpackChunkName: "test" */ './test');
    widget.render(container);
  }
}

renderWidget();
