/* eslint-disable no-return-assign */
import * as ES6Promise from 'es6-promise';
import SearchApi from './api-req';
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

let page = 1;
function Card(
  title: string,
  year: string,
  posterUrl: string,
  onClick: () => void,
): void {
  const div = document.createElement('div');
  const p = document.createElement('p');
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  div.onclick = onClick;
  // classNames
  img.className = 'poster';
  img.src = posterUrl;
  div.className = 'cards';
  h2.className = 'title';
  p.className = 'year';

  // appendChilds
  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(img);

  // innerHTML Contents
  h2.innerHTML = title;
  p.innerHTML = year;
  document.getElementsByTagName('main')[0].appendChild(div);
}
const loading = document.createElement('i');
loading.className = 'fa-2x fas fa-spinner icons fa-spin';
document.getElementsByTagName('main')[0].appendChild(loading);

const btn: any = document.getElementById('req');

btn.onclick = () => {
  page += 1;
  document.getElementsByTagName('main')[0].innerHTML = '';
  document.getElementsByTagName('main')[0].appendChild(loading);
  SearchApi({ query: 'man', page }).then((res) => {
    document.getElementsByTagName('main')[0].removeChild(loading);
    res.data.Search.map((item: any) => Card(item.Title, item.Year, item.Poster, () => {
      page += 1;
    }));
  });
};

const prevPage: any = document.getElementsByClassName('prev-page')[0];
prevPage.onclick = () => {
  page -= 1;
  document.getElementsByTagName('main')[0].innerHTML = '';
  document.getElementsByTagName('main')[0].appendChild(loading);

  SearchApi({ query: 'man', page }).then((res) => {
    document.getElementsByTagName('main')[0].removeChild(loading);
    const dots = res.data.totalResults / 10;
    const dotsElement = document.getElementsByClassName('dots')[0];
    dotsElement.innerHTML = `${page} of ${dots}`;

    res.data.Search.map((item: any) => Card(item.Title, item.Year, item.Poster, () => {
      page += 1;
    }));
  });
};

const nextPage: any = document.getElementsByClassName('next-page')[0];
nextPage.onclick = () => {
  page += 1;
  document.getElementsByTagName('main')[0].innerHTML = '';
  document.getElementsByTagName('main')[0].appendChild(loading);
  SearchApi({ query: 'man', page }).then((res) => {
    document.getElementsByTagName('main')[0].removeChild(loading);
    const dots = res.data.totalResults / 10;
    const dotsElement = document.getElementsByClassName('dots')[0];
    dotsElement.innerHTML = `${page} of ${dots}`;

    res.data.Search.map((item: any) => Card(item.Title, item.Year, item.Poster, () => {
      page += 1;
    }));
  });
};

SearchApi({ query: 'man', page }).then((res) => {
  document.getElementsByTagName('main')[0].removeChild(loading);
  const dots = res.data.totalResults / 10;
  const dotsElement = document.getElementsByClassName('dots')[0];
  dotsElement.innerHTML = `${page} of ${dots}`;
  console.log(dotsElement);
  res.data.Search.map((item: any) => {
    Card(item.Title, item.Year, item.Poster, () => {
      page += 1;
    });
  });
});
