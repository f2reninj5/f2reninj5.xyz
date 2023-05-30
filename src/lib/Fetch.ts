
const { fetchBuilder, MemoryCache } = require('node-fetch-cache')

const fetch = fetchBuilder.withCache(new MemoryCache({ ttl: 1000 * 60 * 5 })) // 5 minutes

export { fetch }
