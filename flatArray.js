// create a custom which can flat the nested array in a single array as Array.flat() does.

function flatArray(inputArray) {
  return makeFlatUsingRecusion(inputArray, []);
}

function makeFlatUsingRecusion([curr, ...rest], result) {
//   console.log("--", curr, rest);
  if (curr == undefined) {
    return result;
  } else if (Array.isArray(curr)) {
    return makeFlatUsingRecusion([...curr, ...rest], result);
  } else {
    result.push(curr);
    return makeFlatUsingRecusion(rest, result);
  }
}

// [[1]]

console.log(
  flatArray([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
);
