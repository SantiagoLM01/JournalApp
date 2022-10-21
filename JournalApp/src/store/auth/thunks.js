import { async } from "@firebase/util"
import { signInWithGoogle, registerWithEmail, loginWithEmail, logoutFirebase } from "../../firebase/providers"
import { clearNotesLogout } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startOnGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const result = signInWithGoogle()
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const { ok, uid, photoURL,errorMessage } = await registerWithEmail({ email, password, displayName })
        if(!ok) return dispatch(logout(errorMessage))

        dispatch(login({uid, displayName , email, photoURL}))
    }

}

export const startLoggingUserWithEmailPassword = ({email,password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const { ok, uid, photoURL,errorMessage,displayName } = await loginWithEmail({ email, password })
        if(!ok) return dispatch(logout(errorMessage))

        dispatch(login({uid, email, photoURL, displayName}))
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase()
        dispatch(clearNotesLogout())
        dispatch(logout())

    }
}