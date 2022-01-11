import 'katex/dist/katex.min.css';
import katex from 'katex';
import { useEffect, useState } from 'react';

interface KatexDisplayProps {
  inline?: boolean;
  children: string;
}

export const KatexDisplay: React.FC<KatexDisplayProps> = ({
  children,
  inline,
}): JSX.Element => {
  const [katexHTML, setKatexHTML] = useState<string>('');

  useEffect(() => {
    try {
      const innerHTML = katex.renderToString(children, {
        displayMode: !inline,
        errorColor: 'red',
        throwOnError: true,
      });
      setKatexHTML(innerHTML);
    } catch (error) {
      if (error instanceof katex.ParseError || error instanceof TypeError) {
        setKatexHTML(error.message);
      } else {
        throw error;
      }
    }
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: katexHTML }}></div>;
};
