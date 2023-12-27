//Since we have a lot of error handling while fetching data from mongodb (since all the functions are async funcs) we need this file. 
//We'll wrap all the functions in route file within this async handler

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
