export const api = 'http://localhost:2000/api'
export const generatePublicUrl = (fileName) => {
    return `${api}/public/${fileName}`;
  };