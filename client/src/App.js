import { BrowserRouter, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

import './App.css';

const App = () => (
   <BrowserRouter>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
   </BrowserRouter>
);

export default App;
