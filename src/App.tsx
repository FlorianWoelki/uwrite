import { Routes, Route } from 'react-router-dom';
import { EditorPage } from './pages/Editor';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<EditorPage />}></Route>
    </Routes>
  );
};

export default App;
