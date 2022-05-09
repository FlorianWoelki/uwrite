import renderMathInElement from 'katex/dist/contrib/auto-render';
import { Remarkable } from 'remarkable';
import hljs from 'highlight.js';

const md = new Remarkable({
  highlight: (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (error) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (error) {}

    return '';
  },
});

export const renderPreview = (value: string): string => {
  const el = document.createElement('div');
  el.innerHTML = md.render(value);

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
