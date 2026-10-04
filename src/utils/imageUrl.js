const imageUrl = (image) => {
  if (!image) {
    return "";
  }

  if (image.startsWith("http")) {
    return image;
  }

  return `https://nattyexpress-backend.onrender.com${image}`;
};

export default imageUrl;
