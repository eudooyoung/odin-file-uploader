export interface FolderRequestBody {
  folderName: string;
}

export type FileInput = {
  originalName: string;
  fileName: string;
  size: number;
  path: string;
  folderId: number;
};
