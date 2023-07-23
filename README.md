# web-tetrinet

`./server/proxy.js` will wrap a tetrinet server in a websocket and run a static http server on the main directory

Dockerfile will build an image to play on `play.tetrinet.xyz`. Change the server in the Dockerfile to play on a different server.
`docker build -t tetrinet .`

For development
1. `npm i`
2. `npx tsc --watch`