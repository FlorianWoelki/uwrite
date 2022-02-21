import { useParams } from 'react-router-dom';

interface EditorPageParams {
  id: number;
}

export const useEditorPageParams = (): EditorPageParams => {
  const { id } = useParams();

  return {
    id: Number(id ?? 0),
  };
};
