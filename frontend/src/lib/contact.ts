export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "9779855046299";
export const PHONE_DISPLAY = "+977 9855046299";
export const EMAIL = "omsatyam299@gmail.com";
export const ADDRESS = "Bharatpur, Chitwan, Nepal";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
