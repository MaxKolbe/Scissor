const nodeCache = require("node-cache") 
const cache = new nodeCache()
require("dotenv").config()
const cacheKey = process.env.CACHE_KEY

const checkCache = (req, res, next) => {
    // Check if the data exists in cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log('Serving from cache:', cacheKey);
      res.locals.data = cachedData;
    }
  
    // Proceed to the next middleware
    next();
  };
  
  // Middleware to set cache
  const setCache = (req, res, next) => {
    // Save the response data in cache
    if (!cache.get(cacheKey)) {
      cache.set(cacheKey, res.locals.data);
    }
  
    // Proceed to the next middleware
    next();
};

module.exports = {
    checkCache,
    setCache
}
