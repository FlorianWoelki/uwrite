import renderMathInElement from 'katex/dist/contrib/auto-render';
// @ts-ignore
import { renderMarkdown } from 'monaco-editor/esm/vs/base/browser/markdownRenderer';

export const renderPreview = (value: string): string => {
  const htmlResult = renderMarkdown({ value }).element as HTMLElement;

  renderMathInElement(htmlResult, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false },
    ],
    throwOnError: true,
  });

  return htmlResult.innerHTML;
};
