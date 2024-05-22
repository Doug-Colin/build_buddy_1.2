import { z } from 'zod'
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

//8 Now we can use the form component to actually build the form. (make sure you have the relevant components downloaded from shad and imported in the form compoinent itself). NOTE- you can copy the shadcn component tags from within their return statement on the form docs, and paste into your form. **In our case, this form is going in a <Card>, so these form tags would go into <CardCOntent>. TS will alert you if teh form fields defined in the shadCN code don't match twhat you've dfined via zxodSchema an dyour ts input Type.(this is in props of the shadcn <FormField>). Simply delete what is preassigned and press Ctr+spce in the quotes and you'll see the types you have defined. Pick one for the first field. Edit the <Input> placeholder value and add a type attribute with the value being a sytring mathcing the name prop value in the <FormField> for the text you want in this field/input etc.

//9 Add additional formfields by copy-pasting the <FormField /> shadcn component and everything inside it. In the name= prop of the <FormField />, pass in the name of the next form field from your schema (can CTrl+space to TS check). Change the input placeholder and the <FormDescription> to correspond with the new form/input/FormItem. Get rif of <FormDescription> if it is unecessary.

//10 Check if r-h-f is controlling the forms by console.logging form.watch() in the body of the component fucntion. INFO: mr-h-f form variable gives us a handy fnctn called form.watch(). It provides us with the updated info, so if you console.log(form.watch()) in the form component, check the console and you'll see an Object with all the fields we defined in our formSchema as properties. If you type in the form inputs, it will then show you the values changing live. This is a good way to check if r-h-f is controlling our forms properly.

/* 11 Adding a Select Box - check shadcn select component docs, and look at code for select compoonent in the context of a form. Make sure you have the shadcn select component installed and imported in your form. Copy the <FormField /> tag and everything in it from the shadcn code example, and paste into your form.  NOTE- this contains a <Link/> component that will cause an error and not render if undefined. So remove that if necessary, and re-add/define if necessary.
    -the shadcn code defines each option in the <Select> dropdown manually as a <SelectItem>. If desired, and likely necessary, you can instead replace it with a jsx tag of a mapped array that returns <SelectItem>s. Note that each item needs a key and value(attribute/prop?), so assign relvant keys and values. if you get a tsx red underline, use value={value.toString} if necessary

12) Validaion Error handling, Error Messages, and further defining validation rules: Test submit button. submit button will call onSubmit function in html <form> tag and that will call our custom onSubmit. Try it without values entered in the <inputs>- r-h-f will do the validation for you via the zodschema, and let you/user know if inputted form values are valid.
But what if we want to customize the messages displayed?
-customize the messages displayed if form input is invalid by additing {message: "message"} as the second argument for the relevant rule in the zod schema (for ex. name: z.string().min(3, "your name shouldn't be that short"))
And what if we need validation rules like string or number only?
-use the zod .refine method in the relvant schema rule, for ex. to dictate numbers only,  append .refine(val => !isNan(val as unknown as number), {message:'Id should be a number

13) confirm validation is working by entering appropriate values and seeing if the are logged to console and no errors occur (should have console.log() in your onSubmit fnctn at this point. Alternately, you could alert() it instead, by adding something like alert(JSON.stringify(data, null, 4)) to onSubmit instead)

14) At this point, you can pass to your backend, and be sure it's valid and type safe. 

15) if your form is very long, like this ExampleForm, you can watch the resto of the video @https://www.youtube.com/watch?v=26bSDD9IEG4&ab_channel=ElliottChong from 38' to see how to make it a multi step form with animation via framer motion. 
*/

//Final? Style: change the styling of the for input in the html <form>'s className Tailwind classes if desired
export const exampleRegisterSchema = z
  .object({
    //tell zod this will be a string and must be an email
    email: z.string().email(),
    name: z.string().min(3).max(255),
    password: z.string().min(6).max(100),
    //validation to ensure confirmation password matches first password:
    confirmPassword: z.string().min(6).max(100),
    //validation for a number val only(entered as string of course) value of certain length,
    number: z
      .string()
      .min(7)
      .max(15)
      .refine((val) => !isNaN(val as unknown as number), {
        message: 'Input should be number between 7 and 15 digits long',
      }),
    year: z.string().min(2).max(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

//Note on refine functions: When you append .refinde to an individual field, the validation is specific to that field. When you append it to the z.object, the validation is specific to the entire object, the validation considers the entire object, for example comparing two fields like 'password' and 'confirmPassword'. This is called 'cross-field validation'.

//Note on superRefine() functions: .refine() will only run if all the individual fields validation passes. superRefine() however runs even if individual field validations fail

/*When to use which:

Use individual field .refine() when you have validation logic specific to a single field.
Use z.object().refine() when you have cross-field validation logic.
Use z.object().superRefine() when you want to ensure a validation runs regardless of the state of individual fields
*/
