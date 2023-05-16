import Admin from './pages/Admin';
import Home from './pages/Home';
import BookPage from './pages/BookPage';
import Auth from './pages/Auth'
import {ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, BOOK_ROUTE} from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: BOOK_ROUTE + '/:id',
        Component: BookPage
    },
]