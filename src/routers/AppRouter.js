import React, { useEffect, useState } from 'react';

import { Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { firebase } from '../firebase/firebase-config'

import { login } from '../actions/auth'
import Fulllayout from '../layouts/fulllayout.jsx';

import { AuthRouter } from './AuthRouter'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { View as ViewInput } from '../views/inputs/view';
import { View as ViewOuput } from '../views/outputs/view';

export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setchecking] = useState(true)
    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async (user) => {

            if(user?.uid){

                dispatch( login(user.uid, user.displayName) )
                setisLoggedIn(true)
                

            }else{
                setisLoggedIn(false)
            }

            setchecking(false)
        })

    }, [dispatch, checking, isLoggedIn])

    if( checking ){
        return (
            <div className="loader">Cargando...</div>
        )
    }

    return (
        <Router>
            <Switch>
                <PublicRoute
                    exact
                    path="/auth/login"
                    isAuthenticated={ isLoggedIn }
                    component={ AuthRouter }
                />

                <PublicRoute
                    exact
                    path="/inputs/view/:id"
                    isAuthenticated={ false }
                    component={ ViewInput }
                />
                
                <PublicRoute
                    exact
                    path="/outputs/view/:id"
                    isAuthenticated={ false }
                    component={ ViewOuput }
                />
                
                <PrivateRoute
                    path="/"
                    isAuthenticated={ isLoggedIn }
                    component={ Fulllayout }
                />


            </Switch>
        </Router>
    )
}
