import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Photos from './components/Photos/Photos';
import Todos from './components/Todos/Todos';
import TodoPage from './components/TodoPage/TodoPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/photos'} element={<Photos />} />
          <Route path={'/todos'} element={<Todos />} />
          <Route path={'/todo/:id'} element={<TodoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
