function resolveAfter(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

function timeout(ms, promise) {
  let timeoutID;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutID = setTimeout(() => {
      reject(
        new Error(`Operation timed out after ${ms}ms`)
      );
    }, ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(
    () => {
      clearTimeout(timeoutID);
    }
  );
}

const promise = resolveAfter(1000, "A");

timeout(500, promise).then(
  value => {
    console.log(`Fulfilled: ${value}`);
  },
  error => {
    console.log(`Rejected: ${error}`);
  }
);
