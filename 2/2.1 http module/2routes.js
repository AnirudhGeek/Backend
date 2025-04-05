const http = require("http");
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Home page");
  } else if (url === "/projects") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Project page");
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("This page cannot be found ");
  }  
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
