import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import { useAppSelector, useAppDispatch } from '@/app/hooks' 
// import Spinner  from '../components/Spinner'
import { reset } from "@/features/auth/authSlice";
import {Button} from '@/components/ui/button'
import Header from '@/components/Header'
// import useAuthenticationCheck from '@/hooks/useAuthenticationCheck'


export default function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {user} = useAppSelector((state) => state.auth)  
    
    // useAuthenticationCheck()

    //useEffect - make landing page the default page (if user is not logged in, redirect to login page)
    useEffect(() => {
        if(!user) {
            navigate('/')
        }
        return () => {
            dispatch(reset())
          }
    }, [user, navigate, dispatch])

    return (
        <>
        <Header/>
      <div>

        <section>
          <h1>Welcome, {user && user.name}</h1>
          <p>Dashboard</p>
        </section>

        {/* Links to features */}
        <section>
          <ul>
            <li>
            <Button asChild variant="secondary" size="lg">
                        <Link to="" className="mt-4 mb-16">Calculations</Link>
                    </Button>
            </li>
            <li>
            <Button asChild variant="secondary" size="lg">
                        <Link to="" className="mt-4 mb-16">Conversions</Link>
                    </Button>
            </li>
            <li>
            <Button asChild variant="secondary" size="lg">
                        <Link to="" className="mt-4 mb-16">Projects</Link>
                    </Button>
            </li>
            <li>
            <Button asChild variant="secondary" size="lg">
                        <Link to="" className="mt-4 mb-16">Calculations</Link>
                    </Button>
            </li>
            <li>
            <Button asChild variant="secondary" size="lg">
                        <Link to="" className="mt-4 mb-16">Project Notes</Link>
                    </Button>
            </li>
            <li>
            <Button asChild variant="secondary" size="lg">
                        <Link to="" className="mt-4 mb-16">Tasks</Link>
                    </Button>
            </li>
            <li>
            <Button asChild variant="secondary" size="lg">
                        <Link to="" className="mt-4 mb-16">Contacts</Link>
                    </Button>
            </li>
          </ul>
        </section>
      </div>
      </>
    )
  }
