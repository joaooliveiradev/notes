# Overview

#### Basic examples

## JavaScript

What is a closure?

Closure is basically a technique that allows a function to be able to use the lexical scope of where it was created, for example if we have a parent function and inside of it we have a variable called name and a function that we are returing , let’s say that the variable is used by the nested function to print the name of the variable, if we executed this parent function, we receive the nested function, but, the JS already read that variable called name so we suppose that variable doesn’t exist inside the child function that we need execute after, but exist’s, even if the compiler already go to another line, the nested function will remember of the lexical scope and everything inside, so he can use the variable even if we execute later.

#### Use cases for closure, where to use?

With closure, we can use partial application/curry since our returned function can access the parameter of the parent function, and in the child function being returned, we have access to the parameters as well, so we can use currying/partial application technique.

Or we can use closure to made private methods on module pattern.

```jsx
var Exposer = (function () {
  var privateVariable = 10;

  var privateMethod = function () {
    console.log("Inside a private method!");
    privateVariable++;
  };

  var methodToExpose = function () {
    console.log("This is a method I want to expose!");
  };

  var otherMethodIWantToExpose = function () {
    privateMethod();
  };

  return {
    first: methodToExpose,
    second: otherMethodIWantToExpose,
  };
})();

Exposer.first(); // Output: This is a method I want to expose!
Exposer.second(); // Output: Inside a private method!
Exposer.methodToExpose; // undefined
```

How we can see in the above example, we can made private methods inside an function that it’s not possible to access directly but you can access using another method that remembers the scope that he was created, because of closures, so even the variable and the function already was read by compiler, we can access the private method.

#### Explain what promises are and what they're useful for

Promises is an object that represents an eventual completed or failure asynchronous operation.

Promise has three states: pending, fullfilled(completed succefully) and reject(failure).

You can pass some callbacks to the promises with the methods `.then`, `.catch`. The `.then` is executed when the promise is fullfiled, `.catch` is executed when the promise is reject.

Promises are mostly used when you want handle with asynchronous operations like fetch calls or reading a huge file and you do not want to block the javascript of reading other lines.

#### What is the difference between a promise and a callback?

Callbacks are not asynchronous by nature, but can used for handle in asynchronous operations, we can receives callback from arguments, return from a function to execute after some asynchronous operation, things like that. Promises otherwise is an object that represents an eventual completion of an asynchronous operation, it allows you o register callbacks for when the promise is resolved or rejected and it returns a value once the operation completes successfully.

One of the main differences between promises and callback is that promises has more powerful and methods to handle with errors or the values, you can based on a value, reject a promise and catch in the `.catch` method

Other difference is that you can chain more async operations, in .then method we can trigger another async operation that will return a promise and we can use the `.then` and the `.catch` again and will goes until you want to stop.

#### Explain this in JavaScript.

`this` is an keyword that refers to an object, the object changes dependes where `this` is been called or used.

If you call `this` inside an object x, will refer to that object x.

If you call `this` inside a function, will refer to the global object ( yes, that object that has window and some other things).

If you call `this` inside nothing, just where the regular code is, will refer to the global object.

If you call `this` inside in a event, will refer to that element that receives the event.

If you use function like `apply`, `bind`, or `call` will can "put" the `this` to refeer any object.

Obs: you can't modify the value of this, this is an reserved keyword of the language.
