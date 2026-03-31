export function getStoredFile(): File | null {
  if (typeof window !== 'undefined') {
    const fileData = sessionStorage.getItem('uploadedFile');
    if (fileData) {
      const { name, type, content } = JSON.parse(fileData);
      // Convertir base64 en File
      const byteCharacters = atob(content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new File([byteArray], name, { type });
    }
  }
  return null;
}
