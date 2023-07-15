import { Link } from 'react-router-dom'
// import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from '@/components/ThemeToggle'
//add later when connecting to backend/redux
//import {logout, reset} from '../features/auth/authSlice'


export default function LandingPageHeader() {
    return (
        <header className='flex justify-between items-center p-2 border-b'>
            <h1 className='text-2xl px-4'>Build Buddy</h1>
            <ul className='flex flex-row px-4'>
                {/* conditional rendering for displaying logout if user is logged in */}
                {/* {user ? (
                    <li> 
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                 ) : ( */}
                <>
                    <li>
                    <Link className={buttonVariants({ variant: "link" })} to="/login">Login</Link>
                    </li>
                    <li>
                    <Link className={buttonVariants({ variant: "link" })} to="/register">Register</Link>
                    </li>
                    <li>
                        <ThemeToggle />
                    </li>
                    {/* )} */}
                </>
            </ul>
        </header>
    )
}
