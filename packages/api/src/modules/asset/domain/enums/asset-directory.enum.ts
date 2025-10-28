export enum AssetDirectory {

  // Public directories (accessible via direct URL)
  PROFILE_IMAGES = 'profile-images',
  PUBLIC_ASSETS  = 'public-assets',

  // Private directories (accessible via presigned URL only)
  DOCUMENTS  = 'documents',
  USER_FILES = 'user-files',
  TEMP       = 'temp',
}

export function isPublicDirectory(directory: AssetDirectory | string): boolean {
  const publicDirs = [
    AssetDirectory.PROFILE_IMAGES,
    AssetDirectory.PUBLIC_ASSETS,
  ];

  return publicDirs.includes(directory as AssetDirectory);
}
