import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'highlight.js/styles/github-dark.css';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
