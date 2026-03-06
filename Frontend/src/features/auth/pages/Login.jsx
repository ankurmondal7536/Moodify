import React, { useState } from 'react'
import "../../shared/global.scss"
import "../style/Login.scss"
import "../../shared/button.scss"
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {


    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        await handleLogin({ username, password })
        navigate('/')
    }


    return (
        <div className='login-container'>
            <div className='login-form'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) =>{
                            setUsername(e.target.value)}}
                        type='text'
                        placeholder='Username'
                    />

                    <input onChange={(e)=>{
                        setPassword(e.target.value)}}
                        type='password'
                        placeholder='Password'
                    />

                    <button type='submit'>Login</button>
                </form>
                <p className='link'>Don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </div>

    )
}

export default Login