const async = require('async');
const {maxParallel} = require('../config/config');
const initPuppeteerPool = require('../config/puppeteerPool');
const selectImg = require('./selectImg');
const selectMulu = require('./selectMulu');
const pool = initPuppeteerPool({ // 全局只应该被初始化一次
    puppeteerArgs: {
        ignoreHTTPSErrors: true,
        headless: true,
        args: [
            '-–disable-dev-shm-usage',
            '-–disable-setuid-sandbox',
            '-–no-first-run',
            '--no-sandbox',
            '-–no-zygote',
            '-–single-process',
            // `--proxy-server=${proxyUrl}`
        ],
        //pipe: true, // 不使用 websocket
    }
});
// selectMulu(pool).then(res => {
//     console.log(res)
// })
let list = [
    // {href: '/118/01.html', title: '00话', page: '35p'},
    {href: '/118/02.html', title: '01话', page: '88p'},
    // {href: '/118/03.html', title: '02话', page: '189p'}
]
async.mapLimit(list, 1, function (item, callback) {
    console.log(item)
    selectImg(pool, item).then(res => {
        callback(null, {title: item.title, imgList: res})
    })

}, function (err, results) {
    console.log(results)
});
