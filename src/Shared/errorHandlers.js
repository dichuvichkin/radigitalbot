export const catchErrors = promise =>
    promise.then(data => [null, data]).catch(err => [err]);

export const handleError = (text, err = {}) => console.log(text, err);
