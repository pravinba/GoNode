const config = {}

const REDIS_STORE_URI = 'localhost:6379';
const REDIS_STORE_SECRET = 'keyboard cat';

config.redisStore = {
  url: REDIS_STORE_URI,
  secret: REDIS_STORE_SECRET
}

module.exports = config