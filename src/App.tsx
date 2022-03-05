import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { EditorPage } from './pages/Editor';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/">
          <Route path="/:id" element={<EditorPage />}></Route>
          <Route path="" element={<EditorPage />}></Route>
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
