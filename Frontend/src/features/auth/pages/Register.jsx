import React,{ useState } from 'react'
import "../../shared/global.scss"
import "../style/Register.scss"
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {

    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate('/')
    }
    return (

        <div className='register-container'>
            <div className='register-form'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        type='text'
                        placeholder='Username'
                    />

                    <input onChange={(e) => { setEmail(e.target.value) }}
                        type='email'
                        placeholder='Email'
                    />

                    <input
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        type='password'
                        placeholder='Password'
                    />

                    <button type='submit'>Register</button>
                </form>
                <p className='link'>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    )
}

export default Register