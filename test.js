// console.log('running');

// what are buffers in nodejs?
// what are middlewares in nodejs?
// how do you use middleware in express?
// what is the event loop?
// what are stubs?
// how to enhance node's performance through clustering?
// difference between worker_threads and clusters
// what is the arrange-act-assert pattern in testing?
// what are the timing features of node?
// difference between child process `spwan` and `exec`? And when would you use each one?
// why should we separate the express app and the server?
// what is the reactor pattern in node?
// diference between `readFile` vs `createReadStream`?


console.log('1 - Start');

setTimeout(() => {
console.log('2 - Timeout');
Promise.resolve().then(() => {
console.log('7 - Promise');
setTimeout(() => {
    console.log('12 - Timeout');
    Promise.resolve().then(() => {
    console.log('37 - Promise');
    });
    }, 0);
});
}, 0);

Promise.resolve().then(() => {
console.log('3 - Promise');
});

process.nextTick(() => {
console.log('4 - Next Tick');
});

setImmediate(() => {
console.log('5 - Immediate');
});

console.log('6 - End');