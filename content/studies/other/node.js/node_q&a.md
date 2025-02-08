---
date: 2024-12-28
tags:
  - javascript
title: Node.js Q&A
---
![[attachments/node.js/Node.js_logo.svg|100]]
# Event Loop
An Event Loop is a loop that waits for events and then triggers a callback function when one of those events is detected. It is a mechanism that allows Node.js to perform non-blocking I/O operations, even though JavaScript is single-threaded.

Example:
```javascript
setTimeout(() => console.log('Done'), 1000);
console.log('Hello');
```

In the above example, the `setTimeout` function is called with a delay of 1000 milliseconds. The `console.log('Hello')` statement is executed first, and then the `setTimeout` function is executed. After 1000 milliseconds, the callback function is executed and the message 'Done' is logged to the console.

# Non-blocking Code
Non-blocking code is code that doesn't block the execution of the program during its execution. In Node.js, non-blocking code is used to perform I/O operations asynchronously. This allows the program to continue executing other code while waiting for the I/O operation to complete.

In opposite to popular belief, **async/await** and promises are effectively blocking the execution of the rest of the function until the awaited promise resolves, therefore they are NOT non-blocking.

Non-blocking code examples:
1. Child Processes ([more](https://nodejs.org/api/child_process.html))
2. Worker Threads ([more](https://nodejs.org/api/worker_threads.html)) 
3. Cluster Module ([more](https://nodejs.org/api/cluster.html))
4. Non-blocking Native Modules (fs, http, etc.)
5. Queues
6. Streaming APIs


> [!warning] More is coming soon