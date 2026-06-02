import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import {
  findAuthUserById,
  findUserByUsername,
} from "../features/user/user.repository.js";
import type { AuthUser } from "../features/auth/auth.types.js";

const LocalStrategy = Strategy;

export const configurePassport = () => {
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
          done(null, authUser);
        } catch (err) {
          done(err);
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
    });
  });
};
