//  An overloaded function is a function 'am i authorized' and if I pass a project it will check the project creator, or note will ehck the note creator,

// Suss out middleware ,

//You're checking if person is logged in, but it looks like middleware is supposed to do that and return 403 9ahtorized but noit authenticated/401 (somthing else like that)... one is forbidden, it's like "ywe know who you"

//seems like you have checks you don't need cause the middleware should be doing it

//see if your middleware is actually functional.
