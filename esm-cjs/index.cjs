const { add } = require("./util.mjs");

async function foo() {
  const a = await add(1,2)
  console.log(add(1, 2));
}

foo();