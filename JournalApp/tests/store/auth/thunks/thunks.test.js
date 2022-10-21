import { loginWithEmail, logoutFirebase } from "../../../../src/firebase/providers"
import { checkingCredentials, login, logout } from "../../../../src/store/auth/authSlice"
import { checkingAuthentication, startLoggingUserWithEmailPassword, startLogout } from "../../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../../src/store/journal/journalSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../../fixtures/authFixtures"


jest.mock('../../../../src/firebase/providers')

describe('Pruebas en authThunks', () => {
    const dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks())
    test('debe de invocar el checkingCredentials', async () => {
        await checkingAuthentication()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

    })


    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async () => {


        const loginData = { ok: true, ...demoUser }

        console.log(loginData)

        const formData = { email: demoUser.email, password: '123456' }


        await loginWithEmail.mockResolvedValue(loginData)

        await startLoggingUserWithEmailPassword(formData)(dispatch)


        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

        /*         expect(dispatch).toHaveBeenCalledWith(login(loginData));
         */




    })

    test('startLogout debe de llamar logoutFireBase, clearNotes y logout', async () => {


        await startLogout()(dispatch)

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());




    })


})