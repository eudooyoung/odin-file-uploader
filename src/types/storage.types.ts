import type { File } from "generated/prisma/client.js";

export interface FolderRequestBody {
  folderName: string;
}

export interface FileInput extends Pick<
  File,
  "originalName" | "fileName" | "size" | "path" | "folderId"
> {}
