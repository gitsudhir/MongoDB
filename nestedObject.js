let obj1 = {
  a: 1,
  b: 2,
  c: 7,
  d: 2,
  e: { q: 2, r: 6, l: { m: 7, n: 8 } },
  o: 2,
};

//

function sumNestedEven(obj) {
  return sumNestedEvenRecursion(Object.values(obj), 0);
}
function sumNestedEvenRecursion([nowVal, ...rest], sum) {
  if (nowVal == undefined) {
    return sum;
  } else if (typeof nowVal === "object") {
    return sumNestedEvenRecursion([...Object.values(nowVal), ...rest], sum);
  } else if (nowVal % 2 == 0) {
    sum += nowVal;
    return sumNestedEvenRecursion(rest, sum);
  } else {
    return sumNestedEvenRecursion(rest, sum);
  }
}

const result = sumNestedEven(obj1);
console.log(result);
