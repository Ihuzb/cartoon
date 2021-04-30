const redis = require('redis');
const config = {ip: '39.107.89.238', port: 20203, pasw: 136877};
//const config = {ip: '127.0.0.1', port: 6379, pasw: ""};
let redisClient = redis.createClient(config.port, config.ip);
let redisClientSub = redis.createClient(config.port, config.ip);
if (config.pasw != '') {
    redisClient.auth(config.pasw);
    redisClientSub.auth(config.pasw);
}

let redisKey = {
    musicHotId: {key: 0, keyName: "musicHotId"},//初始化榜单id列表
    musicLoveId: {key: 0, keyName: "musicLoveId"},//喜欢的音乐id列表
    musicInfo: {key: 1, keyName: "musicInfo", seconds: 10 * 60},//获取得音乐信息  可以获取到符合条件的音乐评论信息
    musicAllId: {key: 0, keyName: "musicAllId", seconds: 2 * 60 * 60},//获取的所有榜单音乐+用户最近收听的id列表
    timing: {key: 3, keyName: "start", seconds: {h: 0, m: 1, s: 1}},//每日执行定时
    musicUserId: {keyName: 'musicUserId'}
};
module.exports = {
    redis: redisClient,
    redisSub: redisClientSub,
    redisKey
};