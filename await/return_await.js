async function waitAndMaybeReject() {
  // Wait one second
  await new Promise(r => setTimeout(r, 10));
  // Toss a coin
  const isHeads = Boolean(Math.round(Math.random()));

  if (isHeads) return 'yay';
  console.log('sdfajf');
  throw Error('Boo!');
}

async function foo() {
  try {
    waitAndMaybeReject();
  }
  catch (e) {
    console.log('caught');
  }
  console.log('--------');
}
foo()