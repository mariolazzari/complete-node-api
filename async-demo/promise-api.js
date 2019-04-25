const p = Promise.resolve({ id: 1 });
p.then(res => console.log(res));

const r = Promise.reject(new Error("error message"));
r.catch(err => console.log(err.message));

// parallel promises
const p1 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async op1");
    resolve(1);
  }, 4000);
});

const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async op2");
    resolve(2);
  }, 3000);
});

Promise.all([p1, p2]).then(res => console.log(res));
// asap first reolved
Promise.race([p1, p2]).then(res => console.log(res));
