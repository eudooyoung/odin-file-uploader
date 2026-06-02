import type { RequestHandler } from "express";

const commonLink = [{ href: "/home", text: "홈" }];

const publicLink = [
  { href: "/auth/signup", text: "회원가입" },
  { href: "/auth/loging", text: "로그인" },
];

const authLink = [
  { href: "/dashboard", text: "대시보드" },
  { href: "/auth/logout", text: "로그아웃" },
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
