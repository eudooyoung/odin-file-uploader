import type { RequestHandler } from "express";

const commonLink = [{ href: "/home", text: "홈" }];

const publicLink = [
  { href: "/auth/signup", text: "회원가입" },
  { href: "/auth/login", text: "로그인" },
];

const authLink = [
  { href: "/dashboard", text: "대시보드" },
  { href: "/storage", text: "파일 저장소" },
];

const linkProvider: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.links = [...commonLink, ...authLink];
  } else {
    res.locals.links = [...commonLink, ...publicLink];
  }
  next();
};

export default linkProvider;
