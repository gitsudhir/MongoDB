function sum(a, b, fn) {
  fn(a + b);
}

sum(5000, 333, (result) => {
  console.log("result", result);
});
