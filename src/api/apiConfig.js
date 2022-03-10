const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "775c82528794f6f38cd6a9bd7c080365",
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
};
export default apiConfig;