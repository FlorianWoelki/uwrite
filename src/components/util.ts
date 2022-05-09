import renderMathInElement from 'katex/dist/contrib/auto-render';
import Showdown from 'showdown';

const converter = new Showdown.Converter();

export const renderPreview = (value: string): string => {
  const el = document.createElement('div');
  el.innerHTML = converter.makeHtml(value);

  renderMathInElement(el, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false },
    ],
    throwOnError: true,
  });

  return el.innerHTML;
};
