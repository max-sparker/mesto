// добавление данных об изображении
import {popupImageDescription, popupImageElement} from "./constants.js";

export const setImageDescription = (image) => {
  popupImageElement.src = image.src;
  popupImageElement.alt = `Фото ${image.alt}`;
  popupImageDescription.textContent = image.alt;
}
