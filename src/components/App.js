import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { refreshUser } from 'redux/auth/authOperations';
import { useAuth } from 'hooks';

const HomePage = lazy(() => import('../pages/Home/Home'));
const RegisterPage = lazy(() => import('../pages/Register'));
const LoginPage = lazy(() => import('../pages/Login'));
const ContactsPage = lazy(() => import('../pages/Contacts'));
const UploadContactsPage = lazy(() => import('../pages/UploadContacts/UploadContacts'));
const UploadAvatarPage = lazy(() => import('../pages/UploadAvatarPage/UploadAvatarPage'));




export const App = () => {
    const dispatch = useDispatch();
    const { isRefreshing } = useAuth();

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);


    return (
        <>
            {isRefreshing ? (
                <b>Refreshing user...</b>
            ) : (
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route
                            path="/register"
                            element={
                                // <RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />
                                <RestrictedRoute redirectTo="/login" component={<RegisterPage />} />
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
                            }
                        />
                        <Route
                            path="/contacts"
                            element={
                                <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
                            }
                        />
                        <Route
                            path="/upload"
                            element={
                                <PrivateRoute redirectTo="/login" component={<UploadContactsPage />} />
                            }
                        />
                        <Route
                            path="/avatar"
                            element={
                                <PrivateRoute redirectTo="/login" component={<UploadAvatarPage />} />
                            }
                        />
                    </Route>
                </Routes>
            )}
            <ToastContainer autoClose={1500} theme={"colored"} />
        </>
    );
};
