import Compressor from 'compressorjs';

export const compressImage = (
  file,
  quality = 0.6,
  maxWidth = 800,
  maxHeight = 800
) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: quality, // 設置圖像質量
      maxWidth: maxWidth, // 最大寬度
      maxHeight: maxHeight, // 最大高度
      success(result) {
        resolve(result);
      },
      error(error) {
        reject(error);
      }
    });
  });
};
