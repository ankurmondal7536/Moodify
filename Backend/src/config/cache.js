const Redis = require('ioredis').default

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})

redis.on("connect", ()=>{
    console.log("Connected to Redis DB")
})
redis.on("error", (err)=>{
    console.log("Error in Redis DB")
})

module.exports = redis