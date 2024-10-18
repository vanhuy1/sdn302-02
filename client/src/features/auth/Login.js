import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import PulseLoader from 'react-spinners/PulseLoader'
const Login = () => {

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            // errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <PulseLoader color={"#FFF"} />

    const styles = {
        wrapper: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f4f4f4',
        },
        public: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            width: '100%',
        },
        header: {
            textAlign: 'center',
            color: '#333',
        },
        form: {
            width: '100%',
        },
        formInput: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
        },
        formSubmitButton: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
        },
        formPersist: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
        },
        errClass: {
            color: 'red',
            fontWeight: 'bold',
            marginBottom: '10px',
            fontSize: '14px',
        },
        footer: {
            marginTop: '20px',
            textAlign: 'center',
        },
        footerLink: {
            color: '#007bff',
            textDecoration: 'none',
        },
    };

    const content = (
        <div style={styles.wrapper}>
            <section style={styles.public}>
                <header>
                    <h1 style={styles.header}>Login</h1>
                </header>
                <main style={styles.login}>
                    <p ref={errRef} style={styles[errClass]} aria-live="assertive">{errMsg}</p>

                    <form style={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            style={styles.formInput}
                            type="text"
                            id="username"
                            ref={userRef}
                            value={username}
                            onChange={handleUserInput}
                            autoComplete="off"
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            style={styles.formInput}
                            type="password"
                            id="password"
                            onChange={handlePwdInput}
                            value={password}
                            required
                        />
                        <button style={styles.formSubmitButton}>Sign In</button>

                        <label htmlFor="persist" style={styles.formPersist}>
                            <input
                                type="checkbox"
                                className={styles.form__checkbox}
                                id="persist"
                                onChange={handleToggle}
                                checked={persist}
                            />
                            Trust This Device
                        </label>
                    </form>
                </main>
                <footer style={styles.footer}>
                    <Link to="/" style={styles.footerLink}>Back to Home</Link>
                </footer>
            </section>
        </div>
    )

    return content
}
export default Login