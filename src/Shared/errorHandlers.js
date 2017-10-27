import chalk from "chalk";

export const catchErrors = fn => (req, res, next) =>
    fn(req, res, next).catch(next);

export const developmentErrors = (err, req, res, next) => {
    const status = err.status || 500;
    console.error("message", chalk.yellow(err.message));
    console.error("status", status);
    console.error("Stack", err.stack);
    res.sendStatus(status);
    next();
};

export const handleError = (result) => {
    console.log(result);
};
