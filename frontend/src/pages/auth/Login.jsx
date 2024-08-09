import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

      //  await login(email, password);
        setTimeout(
            await login(email, password), 2000
        )

    }

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='w-full max-w-md p-6 rounded-lg shadow-md bg-gray-500 bg-opacity-30 backdrop-filter backdrop-blur-lg'>
                <h1 className='text-3xl font-semibold text-center text-gray-200'>Login</h1>
                <form onSubmit={handleSubmit} className='mt-4'>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className='text-base font-bold text-gray-200'>Username</label>
                            <input
                                id="email"
                                type="text"
                                placeholder='Enter username'
                                className='w-full input input-bordered h-10'
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className='text-base font-bold text-gray-200'>Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder='Enter Password'
                                className='w-full input input-bordered h-10'
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full btn btn-circle btn-primary"
                            disabled={loading}
                        >
                            {loading ? <span className='loading loading-spinner'></span> : 'Login'}
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-sm text-center text-gray-300">
                    <p>Don't have an account? <Link to='/register' className='font-medium text-blue-400 hover:text-blue-300'>Sign up here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login