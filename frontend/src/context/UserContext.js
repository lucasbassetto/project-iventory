import {createContext} from 'react';
import useAuth from '../hooks/useAuth';

const Context = createContext();

function UserProvider({children}) {
    const {authenticating, register, logout, login} = useAuth();

    return (
        <Context.Provider value={{authenticating, register, logout, login}}>
            {children}
        </Context.Provider>
    );
}

export { Context, UserProvider};