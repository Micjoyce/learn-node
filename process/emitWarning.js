process.emitWarning('Something wrong', ' CustomWarning')

process.on('warning', (warning) => {
    console.warn(warning.name);
    console.warn(warning.message);
    console.warn(warning.stack);
  });