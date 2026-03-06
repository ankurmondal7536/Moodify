import { useContext } from 'react'; // for using state layer 
import { AuthContext } from '../auth.context'; // state layer for auth
import { loginUser, registerUser, getMe, logoutUser } from '../services/auth.api'; // api layer for auth

// hook for connecting state layer to api layer
export const useAuth = () => {
    //for using state layer
    const { loading, setLoading, user, setUser } = useContext(AuthContext)
    const context = useContext(AuthContext)

    // hook for handling register
    async function handleRegister({ username, email, password }) {
        setLoading(true)
        const response = await registerUser({ username, email, password })
        if (response.success) {
            setUser(response.user)
        }
        setLoading(false)
    }

    // hook for handling login
    async function handleLogin({ username, password }) {
        setLoading(true)
        const response = await loginUser({ username, password })

        setUser(response.user)

        setLoading(false)
    }

    // hook for handling get me
    async function handleGetMe() {
        setLoading(true)
        const response = await getMe()
        if (response.success) {
            setUser(response.user)
        }
        setLoading(false)
    }

    // hook for handling logout
    async function handleLogout() {
        setLoading(true)
        const response = await logoutUser()
        if (response.success) {
            setUser(null)
        }
        setLoading(false)
    }

    return ({
        user, loading, handleRegister, handleLogin, handleGetMe, handleLogout
    })
}