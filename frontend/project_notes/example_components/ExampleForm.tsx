import { Button, Input } from '@/components/ui'
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { exampleRegisterSchema } from '@/validators/exampleRegisterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

//3) r-h-f and zod
//here we define the type for the zod schema via z.infer method so that TS can infer the types of the zod schema object/form
type Input = z.infer<typeof exampleRegisterSchema>

//if using as main element on page, for example on LoginPage, when calling, wrap in div and set min-h-screen so that it takes up the whole page and doesn't move around.
export default function ExampleForm() {
  //here we perform steps 2), 4), 5) r-h-f & zod
  //initialize form and pass TS type for relevant xzod schema into rhf useForm os it can know what kind of input to expect
  //Note on below: mr-h-f form variable gives us a handy fnctn called form.watch(). It provides us with the updated info, so if you console.log(form.watch()) in the form component, check the console and you'll see an Object with all the fields we defined in our formSchema as properties. If you type in the form inputs, it will then show you the values changing live. This is a good way to check if r-h-f is controlling our forms properly.
  const form = useForm<Input>({
    resolver: zodResolver(exampleRegisterSchema),
    defaultValues: {
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
    },
  })

  console.log(form.watch())

  //here is step 7
  function onSubmit(data: Input) {
    alert(JSON.stringify(data, null, 4))
    console.log(data)
  }
  return (
    //center it
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Get started today.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* spread the attributes from the above r-h-f form variable from useForm() into our form */}
          <Form {...form}>
            {/* define normal html form via tag. pass your onSubmit handler into the form.handleSubmit r-h-f utility */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* this is the actual rendering of the form */}
              <FormField
                //tell shadcn FormField it's being controlled by r-h-f in control prop
                //give it a name that corresponds to the zod form schema
                //in render=... method we tell it what to type out in the UI.
                //any errors will show up at the bottom in <FormMessage>
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        type="name"
                        autoComplete="username"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your account and display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        // below is for registration form, for login page use autoComplete="current-password" use
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please confirm your password"
                        {...field}
                        type="confirmPassword"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 
              Following FormField has input and validation for numbers only, no strings (check zod schema).
                  -if you want to eliminate the 'spinner' arrows for number iteration that appear in an input when you set type="number", you have to do so in the css. 
              */}
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Numbers Only</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter a number"
                        {...field}
                        type="number"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>year of study</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Add placeholder text here" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[10, 11, 12].map((year) => {
                          return (
                            <SelectItem value={year.toString()} key={year}>
                              Year {year}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Add select description here{' '}
                      {/* <Link/> comp. below will cause error and not render if not previously defined, so remove if uneeded, add and define if needed */}
                      {/* <Link href="/examples/forms">email settings</Link>. */}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
