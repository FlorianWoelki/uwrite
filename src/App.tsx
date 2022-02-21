import { Routes, Route } from 'react-router-dom';
import { EditorPage } from './pages/Editor';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/">
        <Route path="/:id" element={<EditorPage />}></Route>
        <Route path="" element={<EditorPage />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
