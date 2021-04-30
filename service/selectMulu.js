const {maxParallel, waitTime, urlList} = require('../config/config');

module.exports = function selectMulu(pool) {
    return new Promise(async (re, rj) => {
        let url = `${urlList.masterUrl}/118/`;
        let page = await pool.use(async (browser) => {
            const page = await browser.newPage();
            // await page.setExtraHTTPHeaders({
            //     'Accept-Encoding': 'gzip'
            // });
            // await page.authenticate(agencyIp);
            const status = await page.goto(url, {
                'timeout': 1000 * 100 //这里超时是60s
            });
            if (!status.ok) {
                throw new Error('cannot open google.com')
            }
            return page;
        });
        //获取页面数据
        let herfList = await selectDom(page);
        await page.close();
        re(herfList);
    })
}

// 获取目录列表
async function selectDom(page) {
    // Get the "viewport" of the page, as reported by the page.
    const commentDom = await page.$('#chpater-list-1');//评论信息
    let herfList = await page.evaluate((e) => {
        let hrefTitle = {}, info = [];
        let mulu = e.getElementsByClassName('status0');
        mulu = Array.from(mulu);
        let herfList = mulu.map(v => ({
            href: v.getAttribute('href'),
            title: v.getAttribute('title'),
            page: v.getElementsByTagName('i')[0].innerText
        }));
        herfList = herfList.filter(v => v.title.indexOf('话') > -1 && v.title.length <= 4).sort((a, b) => a.title.split('话')[0] - b.title.split('话')[0]);
        herfList.forEach(v => {
            if (!hrefTitle[v.title]) {
                hrefTitle[v.title] = v.title;
                info.push(v)
            }
        })
        return info
    }, commentDom);
    return herfList;
}
