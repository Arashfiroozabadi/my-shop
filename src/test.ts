import _ from 'lodash';
import $ from 'jquery';

export default function render(container: HTMLElement) {
  // Imagine lots of widget code here.
  // For this demo, $.text() will have to do.
  $(container).text(_.join(['test'], '8====>>'));
}

$('.svg-dog-icon').on('click', (event) => {
  $(event.currentTarget).slideUp();
});

// export const t = 't';
