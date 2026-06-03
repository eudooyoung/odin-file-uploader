import upload from "@/config/multer.config.js";
import type { RequestHandler } from "express";

export const homeGet: RequestHandler = (req, res) => {
  res.render("index");
};

export const dashboardGet: RequestHandler = (req, res) => {
  res.render("index");
};

export const storageGet: RequestHandler = (req, res) => {
  res.render("index");
};

const uploadPostHandler: RequestHandler = (req, res, next) => {
  console.log(req.files);
  res.redirect("/upload");
};

export const uploadPost = [upload.array("files"), uploadPostHandler];
