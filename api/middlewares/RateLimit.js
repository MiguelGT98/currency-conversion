// Import redis
const redis = require("redis");

// Create a redis client
const redisClient = redis.createClient(process.env.REDIS_URL || "//redis:6379");

// Define limits
const timeInterval = 60 * 1000;
const maxRequests = 30;

const limit = (req, res, next) => {
  // If you've come this far, req.token should be filled with the JWT provided
  const token = req.token;

  // Assign the current time in MS to the requestedAt const
  const requestedAt = new Date().getTime();

  try {
    // Check if token is already on the redis client
    redisClient.get(token, (error, record) => {
      if (error) throw error;

      // If it's not, push it into the redis client and continue with the request
      if (!record) {
        redisClient.set(
          token,
          JSON.stringify({ count: 1, firstRequest: requestedAt })
        );
        next();
      } else {
        // Parse data inside the record
        const data = JSON.parse(record);

        // Check if time interval since first request has passed
        if (data.firstRequest + timeInterval < requestedAt) {
          // If it has, set firstRequest to current time and reset the request count to 1
          redisClient.set(
            token,
            JSON.stringify({ firstRequest: requestedAt, count: 1 })
          );

          // Continue with the request
          next();
        } else {
          // Check if request count is more than the max request amount
          if (data.count + 1 > maxRequests) {
            // Send an error message
            return res.status(429).json({
              error: {
                message: "The amount of requests has been exceeded.",
                retryAt: new Date(data.firstRequest + timeInterval),
              },
            });
          }

          // If it's not, increment the request count by 1 and continue with request
          redisClient.set(
            token,
            JSON.stringify({ ...data, count: data.count + 1 })
          );
          next();
        }
      }
    });
  } catch (error) {
    return res.status(401).json({
      error,
    });
  }
};

module.exports = { limit };
