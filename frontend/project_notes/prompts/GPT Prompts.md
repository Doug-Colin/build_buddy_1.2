GPT Prompts

I followed a tutorial to learn how to use react-hook-form and zod schemas to create forms with validation using shadcn components. My project is a MERN stack app in TS built with Vite and shadcn components. The tutorial was for building a registration form, and I created an 'ExampleForm.tsx' component to follow along, in my src/components file. I also created a corresponding auth.ts file in src/validators for the zodSchema (it may make sense to rename this file registerSchema to correspond with the name of the z.object({...}) it exports., let me know if you think so, as I'll be needing multiple other validators for different forms going forward). My ExampleForm.tsx contains registration inputs and a select box that is unrelated, that I simply followed from the tutorial so that I had a select box example.

I took notes as code comments while I was coding along in the relevant files. I have specified what these files are, and where in my file structure they are, and I will later give you the code from these files, which contains those commented notes. The commented notes are mostly in the form of 'steps to follow', so that I have actionable steps to reproduce in other projects until I've memorized the process. I will also give you the shadcn doc on forms.

I would like you give me a more concise and actionable breakdown of these steps. To do so, please ensure that you do the following things:
-fact check the notes, and if there is any incorrect terminology or insufficient explanations, give me the correct terminology and or a sufficient explanation, and an explanation of the difference or what was wrong or insufficient. Please keep in mind that I have already tested the form from my code files and it is fully functional, so differences between my code and shadcn's docs code do not necessarily indicate that something is incorrect.
-For each step of the process that I have commented as a note, review if my explanation is sufficient and accurate where the relevant code will be, whether in auth.ts or the form component itself (ExampleForm.tsx).
-Make sure that the steps in your breakdown are clear, concise, actionable, and easily understandable for a beginner dev such as myself.
-Make sure the steps in your breakdown each have a corresponding code block that demonstrates the step in code, and that they each explicitly mention the file that the code should go in, and where in that file that the code should go.
-In these corresponding code blocks, comment out code so it is easier to understand, for both me as a beginner dev and anyone who would be reading the comments.
-Make sure you mention differences in approach for any steps that would change depending on if the component was controlled or uncontrolled
-Additionally, make sure you give a concise but thorough explanation of how I should decide when to use controlled form components or uncontrolled form components as I move forward in my project, based on best practices, and any benefits or disadvantages of either choice

Okay, here are the relevant files:

Here is the auth.ts file from src/validators, most of my steps are recorded here, and marked in ExampleForm.tsx with corresponding numbers to indicate where in the code there the step must be taked:
"
import {z} from 'zod'
//Tutorial via https://www.youtube.com/watch?v=26bSDD9IEG4&ab_channel=ElliottChong
//Forms in shadCN via React-Hook-Form and Zod (validation)
//zod should be installed with shadcn but check your package.json to confirm
//install r-h-f via npm i

//1) create zod Schema object to hold all the values and validation rules for register form.

//2) after defining this, define the form via React-Hook-Form (in the form component, import { useForm } from r-h-f and initialize via const form = useForm())

//3) In the form, convert the form schema to a TS type (type Input etc.)

//4) in form component, pass type as generic argument to useForm

//5) In the form component, specify the zod resolver (terlling rhf what kind of input validator we're using, so rhf knows we're using zod and not yup etc). This means importing import { registerSchema } from "@/validators/auth", and installing via npm i @hookform/resolvers (if not already installed) (the zodResolver is from the package @hookform/resolvers). define the resolver as a property of an object you pass into useForm, and assign it the value of zodResolver(), and pass the relevant schema into zodResolver()

//6)create defaultValues property for the form in the  object passed into useForm. This will specify the default values for the form. The value for defaultValues is another object, with each of the forms default values. If everything is done right so far, when you create propert defaultValues, and then assign it an object, press Ctrl+space and you should see the valus from your Zod schema. This is a good way of being typesafe, make suyre they're there

//7(as per shadCn)Define a submit handler for the form in the form component. it takes in data, which is the Input type we created in step 3. so specify that in ts. for now, jsut add console.lof(data) to the onSubmit

//**don't forget to vet these instructions via chatGPT, give it the RHF docs and shad and maybe zod if necessary
//**NOTE: also ask- shadcn seems to define the zod formschema in the form itself, whereas tutorial puts it in a auth.ts file in src/validators. Make sure of what you need for vite vs nextjs vs best practices. */

//8 Now we can use the form component to actually build the form. (make sure you have the relevant components downloaded from shad and imported in the form compoinent itself). NOTE- you can copy the shadcn component tags from within their return statement on the form docs, and paste into your form. **In our case, this form is going in a `<Card>`, so these form tags would go into `<CardCOntent>`. TS will alert you if teh form fields defined in the shadCN code don't match twhat you've dfined via zxodSchema an dyour ts input Type.(this is in props of the shadcn `<FormField>`). Simply delete what is preassigned and press Ctr+spce in the quotes and you'll see the types you have defined. Pick one for the first field. Edit the `<Input>` placeholder value and add a type attribute with the value being a sytring mathcing the name prop value in the `<FormField>` for the text you want in this field/input etc.

//9 Add additional formfields by copy-pasting the `<FormField />` shadcn component and everything inside it. In the name= prop of the `<FormField />`, pass in the name of the next form field from your schema (can CTrl+space to TS check). Change the input placeholder and the `<FormDescription>` to correspond with the new form/input/FormItem. Get rif of `<FormDescription>` if it is unecessary.

//10 Check if r-h-f is controlling the forms by console.logging form.watch() in the body of the component fucntion. INFO: mr-h-f form variable gives us a handy fnctn called form.watch(). It provides us with the updated info, so if you console.log(form.watch()) in the form component, check the console and you'll see an Object with all the fields we defined in our formSchema as properties. If you type in the form inputs, it will then show you the values changing live. This is a good way to check if r-h-f is controlling our forms properly.

/* 11 Adding a Select Box - check shadcn select component docs, and look at code for select compoonent in the context of a form. Make sure you have the shadcn select component installed and imported in your form. Copy the `<FormField />` tag and everything in it from the shadcn code example, and paste into your form.  NOTE- this contains a `<Link/>` component that will cause an error and not render if undefined. So remove that if necessary, and re-add/define if necessary.
    -the shadcn code defines each option in the `<Select>` dropdown manually as a `<SelectItem>`. If desired, and likely necessary, you can instead replace it with a jsx tag of a mapped array that returns `<SelectItem>`s. Note that each item needs a key and value(attribute/prop?), so assign relvant keys and values. if you get a tsx red underline, use value={value.toString} if necessary

12) Validaion Error handling, Error Messages, and further defining validation rules: Test submit button. submit button will call onSubmit function in html `<form>` tag and that will call our custom onSubmit. Try it without values entered in the `<inputs>`- r-h-f will do the validation for you via the zodschema, and let you/user know if inputted form values are valid.
    But what if we want to customize the messages displayed?
    -customize the messages displayed if form input is invalid by additing {message: "message"} as the second argument for the relevant rule in the zod schema (for ex. name: z.string().min(3, "your name shouldn't be that short"))
    And what if we need validation rules like string or number only?
    -use the zod .refine method in the relvant schema rule, for ex. to dictate numbers only,  append .refine(val => !isNan(val as unknown as number), {message:'Id should be a number
13) confirm validation is working by entering appropriate values and seeing if the are logged to console and no errors occur (should have console.log() in your onSubmit fnctn at this point. Alternately, you could alert() it instead, by adding something like alert(JSON.stringify(data, null, 4)) to onSubmit instead)
14) At this point, you can pass to your backend, and be sure it's valid and type safe.
15) if your form is very long, like this ExampleForm, you can watch the resto of the video @https://www.youtube.com/watch?v=26bSDD9IEG4&ab_channel=ElliottChong from 38' to see how to make it a multi step form with animation via framer motion.
    */

//Final? Style: change the styling of the for input in the html `<form>`'s className Tailwind classes if desired
export const registerSchema = z.object ({
    //tell zod this will be a string and must be an email
    email: z.string().email(),
    name: z.string().min(3).max(255),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
    year: z.string().min(2).max(10)
})
"

Here is the ExampleForm.txs file from src/components:
"import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//3) r-h-f and zod
//define the type for the zod schema via z.infer method so that TS can infer the types of the zod schema object/form
type Input = z.infer `<typeof registerSchema>`;

//if using as main element on page, for example on LoginPage, when calling, wrap in div and set min-h-screen so that it takes up the whole page and doesn't move around.
export default function CardWithForm() {
  //2), 4), 5) r-h-f & zod
  //initialize form and pass TS type for relevant xzod schema into rhf useForm os it can know what kind of input to expect
  //Note on below: mr-h-f form variable gives us a handy fnctn called form.watch(). It provides us with the updated info, so if you console.log(form.watch()) in the form component, check the console and you'll see an Object with all the fields we defined in our formSchema as properties. If you type in the form inputs, it will then show you the values changing live. This is a good way to check if r-h-f is controlling our forms properly.
  const form = useForm `<Input>`({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
    },
  });

  console.log(form.watch());

  //step 7
  function onSubmit(data: Input) {
    alert(JSON.stringify(data, null, 4))
    console.log(data);
  }
  return (
    //center it
    `<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">`
      `<Card className="w-[350px]">`
        `<CardHeader>`
          `<CardTitle>`Register `</CardTitle>`
          `<CardDescription>`Get started today.`</CardDescription>`
        `</CardHeader>`
        `<CardContent>`
          {/* spread the attributes from the above r-h-f form variable from useForm() into our form */}
          <Form {...form}>
            {/* define normal html form via tag. pass your onSubmit handler into the form.handleSubmit r-h-f utility */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* this is the actual rendering of the form */}
              <FormField
                //tell shadcn FormField it's being controlled by r-h-f in control prop
                //give it a name that corresponds to the zod form schema
                //in render=... method we tell it what to type out in the UI.
                //any errors will show up at the bottom in `<FormMessage>`
                control={form.control}
                name="name"
                render={({ field }) => (
                  `<FormItem>`
                    `<FormLabel>`Username `</FormLabel>`
                    `<FormControl>`
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        type="name"
                        autoComplete="username"
                      />
                    `</FormControl>`
                    `<FormDescription>`
                      This is your account and display name.
                    `</FormDescription>`
                    `<FormMessage />`
                  `</FormItem>`
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  `<FormItem>`
                    `<FormLabel>`Email `</FormLabel>`
                    `<FormControl>`
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        type="email"
                        autoComplete="email"
                      />
                    `</FormControl>`
                    `<FormMessage />`
                  `</FormItem>`
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  `<FormItem>`
                    `<FormLabel>`Password `</FormLabel>`
                    `<FormControl>`
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                        // below is for registration form, for login page use autoComplete="current-password" use
                        autoComplete="new-password"
                      />
                    `</FormControl>`
                    `<FormMessage />`
                  `</FormItem>`
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  `<FormItem>`
                    `<FormLabel>`Confirm Password `</FormLabel>`
                    `<FormControl>`
                      <Input
                        placeholder="Please confirm your password"
                        {...field}
                        type="confirmPassword"
                        autoComplete="new-password"
                      />
                    `</FormControl>`
                    `<FormMessage />`
                  `</FormItem>`
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  `<FormItem>`
                    `<FormLabel>`year of study `</FormLabel>`
                    `<Select                       onValueChange={field.onChange}                       defaultValue={field.value}                     >`
                      `<FormControl>`
                        `<SelectTrigger>`
                          `<SelectValue placeholder="Add placeholder text here" />`
                        `</SelectTrigger>`
                      `</FormControl>`
                      `<SelectContent>`
                        {[10, 11, 12].map((year) => {
                          return (
                            <SelectItem value={year.toString()} key={year}>
                              Year {year}
                            `</SelectItem>`
                          );
                        })}
                      `</SelectContent>`
                    `</Select>`
                    `<FormDescription>`
                      Add select description here{" "}
                      {/* `<Link/>` comp. below will cause error and not render if not previously defined, so remove if uneeded, add and define if needed */}
                      {/* `<Link href="/examples/forms">`email settings `</Link>`. */}
                    `</FormDescription>`
                    `<FormMessage />`
                  `</FormItem>`
                )}
              />
              `<Button type="submit">`Submit `</Button>`
            `</form>`
          `</Form>`
        `</CardContent>`
      `</Card>`
    `</div>`
  );
}
"

Here is the explanations and code from shadcn from their docs on forms and using react-hook-form:

"React Hook Form
Building forms with React Hook Form and Zod.
Forms are tricky. They are one of the most common things you'll build in a web application, but also one of the most complex.

Well-designed HTML forms are:

Well-structured and semantically correct.
Easy to use and navigate (keyboard).
Accessible with ARIA attributes and proper labels.
Has support for client and server side validation.
Well-styled and consistent with the rest of the application.
In this guide, we will take a look at building forms with react-hook-form and zod. We're going to use a `<FormField>` component to compose accessible forms using Radix UI components.

Features
The `<Form />` component is a wrapper around the react-hook-form library. It provides a few things:

Composable components for building forms.
A `<FormField />` component for building controlled form fields.
Form validation using zod.
Handles accessibility and error messages.
Uses React.useId() for generating unique IDs.
Applies the correct aria attributes to form fields based on states.
Built to work with all Radix UI components.
Bring your own schema library. We use zod but you can use anything you want.
You have full control over the markup and styling.

Anatomy:
`<Form>`
  <FormField
    control={...}
    name="..."
    render={() => (
      `<FormItem>`
        `<FormLabel />`
        `<FormControl>`
          { /* Your form field */}
        `</FormControl>`
        `<FormDescription />`
        `<FormMessage />`
      `</FormItem>`
    )}
  />
`</Form>`

Example:
const form = useForm()

<FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    `<FormItem>`
      `<FormLabel>`Username `</FormLabel>`
      `<FormControl>`
        <Input placeholder="shadcn" {...field} />
      `</FormControl>`
      `<FormDescription>`This is your public display name.`</FormDescription>`
      `<FormMessage />`
    `</FormItem>`
  )}
/>

Usage:

1) Create a form schema
   Define the shape of your form using a Zod schema. You can read more about using Zod in the Zod documentation:
   "use client"

import Link from "next/link"
import * as z from "zod"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

2) Define a form. Use the useForm hook from react-hook-form to create a form as follows:
   "use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer `<typeof formSchema>`>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer `<typeof formSchema>`) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
}

Since FormField is using a controlled component, you need to provide a default value for the field. See the React Hook Form docs to learn more about controlled components.

3)Build your form
We can now use the `<Form />` components to build our form.

"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  // ...

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            `<FormItem>`
              `<FormLabel>`Username `</FormLabel>`
              `<FormControl>`
                <Input placeholder="shadcn" {...field} />
              `</FormControl>`
              `<FormDescription>`
                This is your public display name.
              `</FormDescription>`
              `<FormMessage />`
            `</FormItem>`
          )}
        />
        `<Button type="submit">`Submit `</Button>`
      `</form>`
    `</Form>`
  )
}

4)Done
That's it. You now have a fully accessible form that is type-safe with client-side validation."

Here is the shadcn docs on the Select form:
Select
Displays a list of options for the user to pick from—triggered by a button.

Usage
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>

Examples:

"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
})

export function SelectForm() {
  const form = useForm<z.infer `<typeof FormSchema>`>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer `<typeof FormSchema>`) {
    toast({
      title: "You submitted the following values:",
      description: (
        `<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">`
          `<code className="text-white">`{JSON.stringify(data, null, 2)}`</code>`
        `</pre>`
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            `<FormItem>`
              `<FormLabel>`Email `</FormLabel>`
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                `<FormControl>`
                  `<SelectTrigger>`
                    `<SelectValue placeholder="Select a verified email to display" />`
                  `</SelectTrigger>`
                `</FormControl>`
                `<SelectContent>`
                  `<SelectItem value="m@example.com">`m@example.com `</SelectItem>`
                  `<SelectItem value="m@google.com">`m@google.com `</SelectItem>`
                  `<SelectItem value="m@support.com">`m@support.com `</SelectItem>`
                `</SelectContent>`
              `</Select>`
              `<FormDescription>`
                You can manage email addresses in your{" "}
                `<Link href="/examples/forms">`email settings `</Link>`.
              `</FormDescription>`
              `<FormMessage />`
            `</FormItem>`
          )}
        />
        `<Button type="submit">`Submit `</Button>`
      `</form>`
    `</Form>`
  )
}

---

Improved shorter prompt:

Your role in this conversation will be that of my senior developer, and my role will be that of your junior developer. You are responsible for helping me learn things by making sure I have accurate, concise, actionable steps to follow for every new technique or approach I learn.

Currently, I am learning to use shadcn components, along with react-hook-form and zod, to make form components as recommended by shadcn. You have instructed me to do the following four actions:

-watch and code along with a relevant tutorial to understand how things work and are developed in a practical sense before diving too deep into docs.
-while coding along, create a list of actionable steps, in the form of chronologically numbered code comments that I can follow in the future.
-after the tutorial and code exercises are complete, I am to give you my code files with comments so that you can use your knowledge as a senior dev to give me an improved list of actionable steps.

As my senior engineer, when I give you my code files as instructed, you always follow these 6 rules when giving me an improved list of actionable steps to use in the future:

-using the knowledge of a Senior engineer who is highly experienced in making web applications in React, you always fact-check the notes, and if there is anything incorrect or insufficiently explained, you give me the correct terminology and/or an explanation that is sufficiently thorough and actionable.

-You always make sure that the steps in your breakdown are clear, concise, actionable, and that they use easily understandable for a beginner dev such as myself.

-You always  make sure that every steps in your breakdown each has a corresponding code block that demonstrates the step in code, and that you explicitly mention the file that the code should go in, and where in that file the code should go, and that you explictly explain the steps' code expression or statement and all of its relevant variables, actions, methods, and arguments.

- You always make sure that in these corresponding code blocks, you comment out any relevant background info on the code so it is easier to understand, for both me as a beginner dev and anyone who would be reading the comments.
- You always make sure to make to explicitly mention and explain differences in approach for any steps that would change depending on if the component was controlled or uncontrolled

-Additionally, you supplement your improved steps with a concise but thorough explanation of how I should decide when to use controlled form components or uncontrolled form components as I move forward in my project, based on best practices, and any benefits or disadvantages of either choice.

Okay. Now, I as junior dev, will give you the files that I created while following a tutorial to learn how to use forms with shadcn components via react-hook-form and zod, which include my chronologically numbered actionable steps in the form of code comments in my auth.ts file, and in my ExampleForm.tsx file, numbers indicating where that step should be taken.

Here is my auth.ts file:

"
import {z} from 'zod'
//Tutorial via https://www.youtube.com/watch?v=26bSDD9IEG4&ab_channel=ElliottChong
//Forms in shadCN via React-Hook-Form and Zod (validation)
//zod should be installed with shadcn but check your package.json to confirm
//install r-h-f via npm i

//1) create zod Schema object to hold all the values and validation rules for register form.

//2) after defining this, define the form via React-Hook-Form (in the form component, import { useForm } from r-h-f and initialize via const form = useForm())

//3) In the form, convert the form schema to a TS type (type Input etc.)

//4) in form component, pass type as generic argument to useForm

//5) In the form component, specify the zod resolver (terlling rhf what kind of input validator we're using, so rhf knows we're using zod and not yup etc). This means importing import { registerSchema } from "@/validators/auth", and installing via npm i @hookform/resolvers (if not already installed) (the zodResolver is from the package @hookform/resolvers). define the resolver as a property of an object you pass into useForm, and assign it the value of zodResolver(), and pass the relevant schema into zodResolver()

//6)create defaultValues property for the form in the  object passed into useForm. This will specify the default values for the form. The value for defaultValues is another object, with each of the forms default values. If everything is done right so far, when you create propert defaultValues, and then assign it an object, press Ctrl+space and you should see the valus from your Zod schema. This is a good way of being typesafe, make suyre they're there

//7(as per shadCn)Define a submit handler for the form in the form component. it takes in data, which is the Input type we created in step 3. so specify that in ts. for now, jsut add console.lof(data) to the onSubmit

//**don't forget to vet these instructions via chatGPT, give it the RHF docs and shad and maybe zod if necessary
//**NOTE: also ask- shadcn seems to define the zod formschema in the form itself, whereas tutorial puts it in a auth.ts file in src/validators. Make sure of what you need for vite vs nextjs vs best practices. */

//8 Now we can use the form component to actually build the form. (make sure you have the relevant components downloaded from shad and imported in the form compoinent itself). NOTE- you can copy the shadcn component tags from within their return statement on the form docs, and paste into your form. **In our case, this form is going in a `<Card>`, so these form tags would go into `<CardCOntent>`. TS will alert you if teh form fields defined in the shadCN code don't match twhat you've dfined via zxodSchema an dyour ts input Type.(this is in props of the shadcn `<FormField>`). Simply delete what is preassigned and press Ctr+spce in the quotes and you'll see the types you have defined. Pick one for the first field. Edit the `<Input>` placeholder value and add a type attribute with the value being a sytring mathcing the name prop value in the `<FormField>` for the text you want in this field/input etc.

//9 Add additional formfields by copy-pasting the `<FormField />` shadcn component and everything inside it. In the name= prop of the `<FormField />`, pass in the name of the next form field from your schema (can CTrl+space to TS check). Change the input placeholder and the `<FormDescription>` to correspond with the new form/input/FormItem. Get rif of `<FormDescription>` if it is unecessary.

//10 Check if r-h-f is controlling the forms by console.logging form.watch() in the body of the component fucntion. INFO: mr-h-f form variable gives us a handy fnctn called form.watch(). It provides us with the updated info, so if you console.log(form.watch()) in the form component, check the console and you'll see an Object with all the fields we defined in our formSchema as properties. If you type in the form inputs, it will then show you the values changing live. This is a good way to check if r-h-f is controlling our forms properly.

/* 11 Adding a Select Box - check shadcn select component docs, and look at code for select compoonent in the context of a form. Make sure you have the shadcn select component installed and imported in your form. Copy the `<FormField />` tag and everything in it from the shadcn code example, and paste into your form.  NOTE- this contains a `<Link/>` component that will cause an error and not render if undefined. So remove that if necessary, and re-add/define if necessary.
    -the shadcn code defines each option in the `<Select>` dropdown manually as a `<SelectItem>`. If desired, and likely necessary, you can instead replace it with a jsx tag of a mapped array that returns `<SelectItem>`s. Note that each item needs a key and value(attribute/prop?), so assign relvant keys and values. if you get a tsx red underline, use value={value.toString} if necessary

12) Validaion Error handling, Error Messages, and further defining validation rules: Test submit button. submit button will call onSubmit function in html `<form>` tag and that will call our custom onSubmit. Try it without values entered in the `<inputs>`- r-h-f will do the validation for you via the zodschema, and let you/user know if inputted form values are valid.
    But what if we want to customize the messages displayed?
    -customize the messages displayed if form input is invalid by additing {message: "message"} as the second argument for the relevant rule in the zod schema (for ex. name: z.string().min(3, "your name shouldn't be that short"))
    And what if we need validation rules like string or number only?
    -use the zod .refine method in the relvant schema rule, for ex. to dictate numbers only,  append .refine(val => !isNan(val as unknown as number), {message:'Id should be a number
13) confirm validation is working by entering appropriate values and seeing if the are logged to console and no errors occur (should have console.log() in your onSubmit fnctn at this point. Alternately, you could alert() it instead, by adding something like alert(JSON.stringify(data, null, 4)) to onSubmit instead)
14) At this point, you can pass to your backend, and be sure it's valid and type safe.
15) if your form is very long, like this ExampleForm, you can watch the resto of the video @https://www.youtube.com/watch?v=26bSDD9IEG4&ab_channel=ElliottChong from 38' to see how to make it a multi step form with animation via framer motion.
    */

//Final step? Style: change the styling of the for input in the html `<form>`'s className Tailwind classes if desired
export const registerSchema = z.object ({
    //tell zod this will be a string and must be an email
    email: z.string().email(),
    name: z.string().min(3).max(255),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
    year: z.string().min(2).max(10)
})
"

Here is my ExampleForm.tsx component file:
"import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//3) r-h-f and zod
//here we define the type for the zod schema via z.infer method so that TS can infer the types of the zod schema object/form
type Input = z.infer `<typeof registerSchema>`;

//if using as main element on page, for example on LoginPage, when calling, wrap in div and set min-h-screen so that it takes up the whole page and doesn't move around.
export default function CardWithForm() {
  //here we perform steps 2), 4), 5) r-h-f & zod
  //initialize form and pass TS type for relevant xzod schema into rhf useForm os it can know what kind of input to expect
  //Note on below: mr-h-f form variable gives us a handy fnctn called form.watch(). It provides us with the updated info, so if you console.log(form.watch()) in the form component, check the console and you'll see an Object with all the fields we defined in our formSchema as properties. If you type in the form inputs, it will then show you the values changing live. This is a good way to check if r-h-f is controlling our forms properly.
  const form = useForm `<Input>`({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
    },
  });

  console.log(form.watch());

  //here is step 7
  function onSubmit(data: Input) {
    alert(JSON.stringify(data, null, 4))
    console.log(data);
  }
  return (
    //center it
    `<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">`
      `<Card className="w-[350px]">`
        `<CardHeader>`
          `<CardTitle>`Register `</CardTitle>`
          `<CardDescription>`Get started today.`</CardDescription>`
        `</CardHeader>`
        `<CardContent>`
          {/* spread the attributes from the above r-h-f form variable from useForm() into our form */}
          <Form {...form}>
            {/* define normal html form via tag. pass your onSubmit handler into the form.handleSubmit r-h-f utility */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* this is the actual rendering of the form */}
              <FormField
                //tell shadcn FormField it's being controlled by r-h-f in control prop
                //give it a name that corresponds to the zod form schema
                //in render=... method we tell it what to type out in the UI.
                //any errors will show up at the bottom in `<FormMessage>`
                control={form.control}
                name="name"
                render={({ field }) => (
                  `<FormItem>`
                    `<FormLabel>`Username `</FormLabel>`
                    `<FormControl>`
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        type="name"
                        autoComplete="username"
                      />
                    `</FormControl>`
                    `<FormDescription>`
                      This is your account and display name.
                    `</FormDescription>`
                    `<FormMessage />`
                  `</FormItem>`
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  `<FormItem>`
                    `<FormLabel>`Email `</FormLabel>`
                    `<FormControl>`
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        type="email"
                        autoComplete="email"
                      />
                    `</FormControl>`
                    `<FormMessage />`
                  `</FormItem>`
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  `<FormItem>`
                    `<FormLabel>`Password `</FormLabel>`
                    `<FormControl>`
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                        // below is for registration form, for login page use autoComplete="current-password" use
                        autoComplete="new-password"
                      />
                    `</FormControl>`
                    `<FormMessage />`
                  `</FormItem>`
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  `<FormItem>`
                    `<FormLabel>`Confirm Password `</FormLabel>`
                    `<FormControl>`
                      <Input
                        placeholder="Please confirm your password"
                        {...field}
                        type="confirmPassword"
                        autoComplete="new-password"
                      />
                    `</FormControl>`
                    `<FormMessage />`
                  `</FormItem>`
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  `<FormItem>`
                    `<FormLabel>`year of study `</FormLabel>`
                    `<Select                       onValueChange={field.onChange}                       defaultValue={field.value}                     >`
                      `<FormControl>`
                        `<SelectTrigger>`
                          `<SelectValue placeholder="Add placeholder text here" />`
                        `</SelectTrigger>`
                      `</FormControl>`
                      `<SelectContent>`
                        {[10, 11, 12].map((year) => {
                          return (
                            <SelectItem value={year.toString()} key={year}>
                              Year {year}
                            `</SelectItem>`
                          );
                        })}
                      `</SelectContent>`
                    `</Select>`
                    `<FormDescription>`
                      Add select description here{" "}
                      {/* `<Link/>` comp. below will cause error and not render if not previously defined, so remove if uneeded, add and define if needed */}
                      {/* `<Link href="/examples/forms">`email settings `</Link>`. */}
                    `</FormDescription>`
                    `<FormMessage />`
                  `</FormItem>`
                )}
              />
              `<Button type="submit">`Submit `</Button>`
            `</form>`
          `</Form>`
        `</CardContent>`
      `</Card>`
    `</div>`
  );
}
"

Now, please follow all the rules of your role in this conversation in your response.

---

Implementing new features:

Okay, so now I need to build the Projects feature of my app. You mentioned the following when telling me what to work towards on my MVP:
"Projects Dashboard: This is the core of your application. Users should be able to create, view, and manage their projects. For the MVP, you can start with basic CRUD operations for projects with the properties you mentioned (client, title, due date, 'ongoing' or 'completed' toggle)."

So,

---
