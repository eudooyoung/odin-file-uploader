export type Page =
  | "home"
  | "login"
  | "signup"
  | "dashboard"
  | "storage"
  | "folder";

export type FolderRequestBody = {
  folderName: string;
};
