//async connection function (all mongoose methods are async and return promises)

---

//install & initialize express-async-handler middleware package to catch errors automatically and handle  them via errorMiddleware.js (instead of try-catch)


from projecController.js:

---

descr: Set project - route: POST /api/project -access: Private

When an error occurs within this async route:

1. The error is caught by express-async-handler.
2. Express automatically passes the caught error to the next middleware in line, which in this case is the errorHandler middleware from errorMiddleware.js.
3. errorHandler formats the error as JSON, ensuring a consistent error response to the frontend.
4. This approach replaces Express' default HTML error page with a more informative JSON error message.

*/

---

 //create User

    //ES6 shorthand property names for when property and value are identical (equivalent to name: name)

    constuser=awaitUser.create({

    name,

    email,

    password: hashedPassword,

    })

---

The `req` object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on. In Express.js, this object is passed as an argument to the middleware function. (or atleast it is in your authMiddleware backend code)

---



Is this always possible with objects?

If I had an object with no properties names "Banjo", could I simply write Banjo.numOfStrings="4"?

Hell yeah, you can. In JavaScript, objects are dynamic, meaning you can add properties on the fly. Your example would work just fine.

<pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>javascript</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" data-darkreader-inline-stroke=""><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-javascript">const Banjo = {};
Banjo.numOfStrings = "4";
</code></div></div></pre>

Now, `Banjo` would look like this:

<pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>javascript</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" data-darkreader-inline-stroke=""><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-javascript">{
  numOfStrings: "4"
}
</code></div></div></pre>

Just keep in mind that this dynamic nature doesn't apply to all programming languages or to special kinds of objects in JavaScript that are frozen or sealed. But for your regular, everyday JS objects? Go nuts.

---

`.select('-password')` is a MongoDB query modifier that says, "Hey, get me all the fields of this document except the password."
----------------------------------------------------------------------------------------------------------


  // Date sent from frontend in ISO string format (JSON lacks Date object)

// Mongoose Date type automatically converts ISO string to MongoDB-compatible date.

---

In Mongoose schema, enum is not a TS type. It is similar to a union of values in TS, but it's a Mongoose specific enum: ['In progress', 'Completed', 'Long-Term'], // Mongoose enum for valid statuses



---

In a Mongoose schema for MongoDB document how do you add createdAt and updatedAt properties with timestamps at time of creation of that document

{

    timestamps: true,

  }

---

What is the 'enum' option in Mongoose?
In Mongoose, the `enum` option is used for data validation. It specifies a set of allowed values for a string field. When you try to save a document, Mongoose will check that the field's value is in the set of allowed values specified by the `enum`. If it's not, Mongoose will throw a validation error. This ensures data integrity by limiting the possible values that can be stored in that field.

Basically, it's a fucking TS string literal union for Mongoose document schemas

---



What's express.Router()?

`express.Router()` is a middleware in Express.js that allows you to create modular, mountable route handlers. It helps organize routes into separate files for better code structure.

Example: projectRoutes.js: 

constexpress=require('express')

constrouter=express.Router()

const { getProjects, setProject, updateProject, deleteProject } =require('../controllers/projectController')

const { protect } =require('../middleware/authMiddleware')

//protected & combined route for get and post requests (create/read)

router.route('/').get(protect, getProjects).post(protect, setProject)

//protected & combined route for put and delete requests (update/delete)

router.route('/:id').delete(protect, deleteProject).put(protect, updateProject)

module.exports=router
