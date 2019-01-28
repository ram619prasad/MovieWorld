const config = (baseURL, basePath, apiKey) => {
   return {
        baseURL: baseURL + basePath,
        params: { api_key: apiKey },
        headers: {
            'Content-Type': 'application/json',
        }
    };
};

export default config;