import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '@/features/auth/authSlice'
import { loginSchema } from '@/validators/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type Input = z.infer<typeof loginSchema>

export default function LoginForm() {
  const form = useForm<Input>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  //check if form is updating state with each keystroke/selection
  console.log(form.watch())

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  //edit to mirror login function
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth,
  )

  useEffect(() => {
    //check if registration is successfull & promise fulfilled, our register fn extraReducers will update state prprty isSuccess to true
    //also check if user is already logged in with token & other info
    //if so navigate away from registration page to the dash
    if (isSuccess || user) {
      navigate('/dashboard')
    }

    //after checking for isSuccess/user, we want to reset the state, so dispatch the reset fn from authSlice & change State prpty's to false
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  function onSubmit(data: Input) {
    //alert with form's entered data as object to ensure submit is functioning
    // alert(JSON.stringify(data, null, 4) + 'tacking it on');
    console.log(
      `attempting to dispatch login action from authSlice.ts, with following data as argument: ${data}`,
    )
    dispatch(login(data))
  }

  //console.log() prevents 'isLoading value never read' TS error until I find a tailwind Spinner.
  if (isLoading) {
    // return <Spinner />
    console.log(isLoading)
  }

  return (
    //center it
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Use your username and password to log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        type="email"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                        // for login forms, set autocomplete to current-password
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Login</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
