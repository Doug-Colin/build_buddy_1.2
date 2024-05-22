Redux vs. Context API:

Scrimba no longer teaches redux, they teach ContextAPI. 

    -state can come from an API, exist for a local form state, and your apps loading state.
	-in react you may have to lift state higher and higher up the tree, context supposedly solves that.

-redux does help organize state. It's highly opinonated, meaning it's not just a tool, it's also a philosophy


Three primary concepts of redux

1) single source of truth- the store
2) State is read only! SO if a component wants to change a global state, it cant- basically, it can emit an action, which describes the kind of change, handing the action to redux, which figures out how to make the state change.
3) Any changes to state will always happen with pure functions called reducers:
    -pur fn's are defined by two things:
        - same params over and over always return same result, so fucntion cant rely on outside object or source which could change the output.
        -Pure fn makes no alterations or mutations outside of its self.
so a reducer as a pure fn, takes the prev. version of state and an action, and determines a brand new value for state. Suince its a pure fn it returns a new value for state rather than altering the originnal state

Redux fundamentals:
1) Actions and action creators - actions are a description of how you want to change the global state
2) Dispatch- the cehicle fir taking the action to the reducers
3) Reducers- pur fn's whose job is to take a description of the change it wants to make, and then makes that change
4) The Store- which is a bit of  a combination of these other things. 


ALYWAS THINK OF AN ANALLOGY:
1) Your order at a restaurant is the action, a description of what you want to happen
2)But you don't give it to the chef! You have an in betweem, the server. The servier is the dispatch, whose job is to take the order/action to the chef
3)The chef is the reducer, thier job is to take the order and produce something in response to it, a reducer recieves an action and alters global state in respose to it. 

Redux is usually used in React, but it can also be done in pure JS. 

BREAKDOWN, SIMPLE
All an actiion is, basically is an object with a type property describin which is a string description of the change you want to make. 

const redux = require("redux")

function increment() {
    return {
        type: "INCREMENT"
    }
}

A Reducer is a function, whose job it is to return a state. reducer accepts a state and a action as params...

It doesn't just return state, it returns state based on the incoming action. Since action is a objet with a type property, reducer considers that type, and returns the new state adjusted as the action instructed.  REMEMBER- it returns a NEW object that is the updated state. Imagine this as a if, else if, else; or switch case statement, the 'eslese' case: when you pass the trreducer to the store, it runs it so it can initialize state. But at that time, action will be null or undefined, so you need a default case in the else, in which you return the original cersion of state, wchic is the first arg. of the reducer:

function reducer(state = {count: 0}, action) {
    // return new state based on the incoming action.type
    switch(action.type) {
        case "INCREMENT":
            return {
                count: state.count + 1
            }
        case "DECREMENT":
            return {
                count: state.count - 1
            }
        default:
            return state  //this is the first arg, {count: 0}
    }
}

-----------------------

const redux = require("redux")

function increment() {
    return {
        type: "INCREMENT"
    }
}

function reducer(state = {count: 0}, action) {
    // return new state
}

 * 1. Action creators for increment, decrement, double, and halve
 * 2. Reducer to handle these actions 👆🏻
 */

function increment() {
    return {
        type: "INCREMENT"
    }
}

function decrement() {
    return {
        type: "DECREMENT"
    }
}

function double() {
    return {
        type: "DOUBLE"
    }
}

function halve() {
    return {
        type: "HALVE"
    }
}

function reducer(state = 0, action) {
    switch(action.type) {
        case "INCREMENT":
            return state + 1
        case "DECREMENT":
            return state - 1
        case "DOUBLE":
            return state * 2
        case "HALVE":
            return Math.round(state / 2)
        default:
            return state
    }
}

-----------------------
LESSON CREATE TJE STORE:

createStore takes on param, your reducer(s). Notice this plain JS non -react version doesn't even use redux until the store, that's moreso the opinionatino of redux. 

.createSAtore gives us a few cool things- an object with a dispatch method, a subscribe method, a getState method, and a replaceReducer methos. dispatchn and getstate most importatn. 

{dispatch: dispatch(action), subscribe: subscribe(listener), getState: getState(), replaceReducer: replaceReducer(nextReducer)}

subscribe is a redux method that accepts a function, and inside the function we can perform any operation we want aftetr a change is made to the store, so its subscribing to the changes in the store, and if they occur, it runs the provided method

getState is a quick way to get the current state of the apps data, and it returns state. 

dipatch() is the server at the restaurant than brings your action type to the store/kitchen. 

EX:
const redux = require("redux")

function increment() {
    return {
        type: "INCREMENT"
    }
}

function decrement() {
    return {
        type: "DECREMENT"
    }
}

function reducer(state = {count: 0}, action) {
    // return new state based on the incoming action.type
    switch(action.type) {
        case "INCREMENT":
            return {
                count: state.count + 1
            }
        case "DECREMENT":
            return {
                count: state.count - 1
            }
        default:
            return state
    }
}

const store = redux.createStore(reducer)
store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(increment)

This would log {count: 1} to the console.

NOTE: THE default return state at the end of the reducer returns the state in case some action indefined or calue in correct for the action gets passed in. 

PAYLOADS

if an action is simply the type of action to perform or function to call on the state,  the payload is at attachment to the action, basically, the payload is 'what are we going to perform the action on'. Payload is sometimes also called data or somehitng similar, but its best to keep it called payload for code legibility.
action.type is the type of action to perform.
action.payload is the payload to perform that action on. (or if the payload, or second arg. property of the action object, was called data, it would be action.dayta). So we can simplify the code thus far to:

"const redux = require("redux")

function changeCount(amount = 1) {
    return {
        type: "CHANGE_COUNT",
        payload: amount
    }
}

function reducer(state = {count: 0}, action) {
    switch(action.type) {
        case "CHANGE_COUNT":
            return {
                count: state.count + action.payload
            }
        default:
            return state
    }
}

const store = redux.createStore(reducer)
store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(changeCount())"

//Redux isn't just mean to hold parts of state, it's meant to tbe the single source of trruth, so often many types of state are therre. 

So how do we keep track of it? In this example, we have another state, the array favororiteThings. If we run this it will just replate the old state. So what we have to do is 