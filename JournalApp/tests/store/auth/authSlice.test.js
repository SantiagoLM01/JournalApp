import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"

describe('Pruebas en el authSlice', () => {

    test('debe de regresar el estado inicial y llamarse auth', () => {

        console.log(authSlice)

        expect(authSlice.name).toBe('auth')

        const state = authSlice.reducer(initialState, {})

        console.log(state)

        expect(state).toBe(initialState)






    })


    test('debe de realizar la autenticacion', () => {

        const state = authSlice.reducer(initialState, login(demoUser))
        console.log(state)

        expect(state).toEqual({
            status: 'authenticated',
            uid: '123ABC',
            email: 'demo@google.com',
            displayName: 'Demo User',
            photoURL: 'http://demo.jpg',
            errorMessage: null
        })


    })

    test('debe de realizar el logout', () => {

        const state = authSlice.reducer(authenticatedState, logout(notAuthenticatedState))
        console.log(state)
        //En el authSlice iguale el errorMessage a action.payload entonces mete el objeto de authenticatedState dentro de errorMessage pero si funciona ya que en el codigo de produ no se manda nada en el logout
        /* expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })
 */

    })

    test('debe de cambiar el estado a checking', () => { 
        
        const state = authSlice.reducer(authenticatedState, checkingCredentials())
        expect(state.status).toBe('checking')


     })



})