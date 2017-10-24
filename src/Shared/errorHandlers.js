// export const catchErrors = promise =>
//     promise.then(data => [null, data]).catch(err => [err]);

export const catchErrors = fn => (req, res, next) =>
  fn(req, res, next).catch(next);

export const developmentErrors = (err, req, res) => {
  // err.stack = err.stack || "";
  // const errorDetails = {
  //   message: err.message,
  //   status: err.status
  // };
  const status = err.status || 500;
  console.error("message", err.message);
  console.error("status", status);
  console.error("stack", err.stack);
  res.sendStatus(status);
  // res.format({
  //   // Based on the `Accept` http header
  //   "text/html": () => {
  //     res.render("error", errorDetails);
  //   }, // Form Submit, Reload the page
  //   "application/json": () => res.json(errorDetails), // Ajax call, send JSON back
  // });
};
