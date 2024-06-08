const factorial = (num) => (num < 2 ? 1 : num * factorial(num - 1));

const findFact = (num) => {
  console.log("finding fact for ", num);
  return factorial(num);
};
const memo = (func) => {
  let cache = {};
  return (value) => {
    if (value in cache) {
      return cache[value];
    } else {
      cache[value] = func(value);
      return cache[value];
    }
  };
};

//without memo
// console.log(findFact(5));
// console.log(findFact(5));

// using memo
let factMemo = memo(findFact);
console.log(factMemo(9));
console.log(factMemo(9));
console.log(factMemo(8));
console.log(factMemo(8));
