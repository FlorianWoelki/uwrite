import {
  BlockContext,
  LeafBlock,
  LeafBlockParser,
  MarkdownExtension,
} from '@lezer/markdown';
import { tags as t } from '@lezer/highlight';

const katexDelim = {
  resolve: 'InlineKatex',
  mark: 'InlineKatexMark',
};

class MathBlockParser implements LeafBlockParser {
  nextLine(): boolean {
    return false;
  }

  finish(cx: BlockContext, leaf: LeafBlock): boolean {
    cx.addLeafElement(
      leaf,
      cx.elt('KatexBlock', leaf.start, leaf.start + leaf.content.length, [
        cx.elt('KatexBlockMark', leaf.start, leaf.start + 3),
        ...cx.parser.parseInline(leaf.content.slice(3), leaf.start + 3),
      ]),
    );
    return true;
  }
}

export const mathExtensions: MarkdownExtension[] = [
  // Custom katex highlighting.
  {
    defineNodes: [
      {
        name: 'InlineKatex',
        style: { 'InlineKatex/...': t.atom },
      },
      {
        name: 'InlineKatexMark',
        style: t.processingInstruction,
      },
    ],
    parseInline: [
      {
        name: 'InlineKatex',
        parse: (cx, next, pos) => {
          const character: number = 36; // $
          if (next !== character) {
            return -1;
          }

          return cx.addDelimiter(katexDelim, pos, pos + 1, true, true);
        },
      },
    ],
  },
  {
    defineNodes: [
      {
        name: 'KatexBlock',
        style: { 'KatexBlock/...': t.atom },
      },
      {
        name: 'KatexBlockMark',
        style: t.processingInstruction,
      },
    ],
    parseBlock: [
      {
        name: 'KatexBlock',
        leaf: (_, leaf) => {
          return /^\$\$/.test(leaf.content) ? new MathBlockParser() : null;
        },
      },
    ],
  },
];
