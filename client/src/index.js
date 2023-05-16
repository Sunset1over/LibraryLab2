import React, { createContext } from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import UserStore from './store/UserStore';
import BookStore from './store/BookStore';

export const Context = createContext(null);

const root = document.getElementById('root');

createRoot(root).render(
    <Context.Provider value={{
        user: new UserStore(),
        book: new BookStore(),
    }}>
        <App />
    </Context.Provider>
);