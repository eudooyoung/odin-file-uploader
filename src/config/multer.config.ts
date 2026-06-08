import multer from "multer";
import { existsSync, mkdirSync } from "node:fs";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const dir = `uploads/${req.user!.id}/${Number(req.params.folderId)}`;
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    callback(null, dir);
  },
});

export const upload = multer({ storage });
