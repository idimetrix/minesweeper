## Minesweeper

### **Description**

The game (Minesweeper) is played by connecting to the websocket [wss://hometask.eg1236.com/game1/](wss://hometask.eg1236.com/game1/) and sending specific commands to it. Try sending single word “help” to retrieve the documentation of the game API. Note you need to keep the same websocket connection open while playing the game.

> **Note you need to keep the same websocket connection open while playing the game.**

### **Task**

Build fully-functional UI for the game.

### **Deliverables**

- github repo with source code
- deployed application. platform does not matter, it could be gh-pages, netlify etc

### **Tech Stack**

- React
- Material-ui using css-in-js solution provided by the library
- TypeScript
- Redux + Redux-saga + Redux Toolkit

### **Source code**

- is organised using feature-first approach - [https://gist.github.com/arnausd23/137bab46215d69023729a1b30fb3ec9b](https://gist.github.com/arnausd23/137bab46215d69023729a1b30fb3ec9b)
- is covered with tests. any coverage you see fit
- redux saga event channel is used to communicate with websocket - [https://redux-saga.js.org/docs/advanced/Channels/](https://redux-saga.js.org/docs/advanced/Channels/)
