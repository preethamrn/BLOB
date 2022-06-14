[x] Board UI
[x] Draw players
[x] Movement and controls
[] Better board UI (score, timer, attack count, etc.)
[] Update favicon
[] Websockets
[] Refactor client side game code (split out the event handling, rendering, gameloop, websocket code, etc.)
[] Migrate to Typescript


### Netcode design
0. When game starts server sends all players a "monotonic time" reference (https://stackoverflow.com/questions/46964779/monotonically-increasing-time-in-node-js). All movement times are in reference to this timestamp (not performance.now()). NOTE: deal with integer overflow on both server and client side.
1. Player sends movement command (along with game tick timestamp) to server + sees movement reflected locally
2. Server responds with the using websockets
3. Player "rollsback" to that gamestate assuming there's desync