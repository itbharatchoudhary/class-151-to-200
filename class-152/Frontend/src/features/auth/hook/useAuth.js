import { setError, setLoading, setUser } from "../state/auth.slice";
import { register, login, getCurrentUser } from "../service/auth.api";
import { useDispatch } from "react-redux";



export const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister({ email, contact, password, fullname, isSeller = false }) {
        try {
            dispatch(setLoading(true));
            const data = await register({ email, contact, password, fullname, isSeller })
            dispatch(setUser(data.user))
            return data.user;
        } catch (error) {
            const message = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || "Registration failed";
            dispatch(setError(message));
            throw new Error(message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true));
            const data = await login({ email, password })
            dispatch(setUser(data.user))
            return data.user;
        } catch (error) {
            const message = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || "Login failed";
            dispatch(setError(message));
            throw new Error(message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetCurrentUser() {
        try {
            dispatch(setLoading(true));
            const data = await getCurrentUser();
            dispatch(setUser(data.user));
        } catch (error) {
             dispatch(setUser(null));
        }
        finally {
            dispatch(setLoading(false));
        }
    }


    return { handleRegister, handleLogin, handleGetCurrentUser }
}