import type { RequestHandler } from "express";
import jsConvert from "js-convert-case";

const requestBodyCaseConverter: RequestHandler = (req, res, next) => {
  if (req.body) {
    req.body = jsConvert.camelKeys(req.body);
  }
  next();
};

export default requestBodyCaseConverter;
