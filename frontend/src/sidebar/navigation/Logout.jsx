import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../../hooks/useLogout';

const Logout = () => {
    const { loading, logout } = useLogout();
    return (
        <div>
            <div className='mt-auto'>

                {
                    !loading ? (<BiLogOut className='cursor-pointer w-6 h-6 text-2xl text-blue-900' onClick={logout} />)
                        :
                        (<span className='loading loading-spinner'></span>)
                }

            </div>
        </div>
    )
}

export default Logout;