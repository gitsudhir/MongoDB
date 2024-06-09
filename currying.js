console.log("running");

const multiply = (x) => (y) => y ? multiply(x * y) : x;

const result = multiply(1)(2)(3)(4)(5)();
console.log(result)