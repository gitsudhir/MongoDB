const http = require('http');

const server = http.createServer((req,rest)=>{
    rest.end('Hello World!');
});

server.listen(process.env.port || 3000,()=>{
    console.log('Server running ... ')
})