import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import {
  findAuthUserById,
  findUserByUsername,
} from "../repositories/user.repository.js";
import type { AuthUser } from "../types/auth.types.js";

const LocalStrategy = Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    void (async () => {
      try {
        const user = await findUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        const authUser: AuthUser = {
          id: user.id,
          username: user.username,
        };
        return done(null, authUser);
      } catch (err) {
        return done(err);
      }
    })();
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
  void (async () => {
    try {
      const user = await findAuthUserById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  })();
});

export default passport;
