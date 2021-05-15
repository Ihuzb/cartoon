const {urlList} = require('../config/config');

module.exports = function selectInfo(pool, item) {
    return new Promise(async (re, rj) => {
        let url = `${urlList.masterUrl}${item.href}`;
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
        let herfList = await selectImg(page, item);
        // await page.close();
        re(herfList);
        //等待时长
        // await page.waitFor(waitTime);
    })
}

// 获取目录列表
async function selectImg(page, item) {
    let herfList = [], maxPage = parseInt(item.page);
    for (let i = 1; i <= maxPage; i++) {
        await page.waitForTimeout(1000);
        await page.waitForSelector('img');
        let commentDom = await page.$('#next');//翻页信息
        const imgDom = await page.$('#tbCenter');//图片信息
        let imgHref = await page.evaluate((e) => {
            let img = e.getElementsByTagName('img')[0].getAttribute('src');
            return img
        }, imgDom);
        herfList.push(imgHref);
        await commentDom.click();
    }
    // console.log(herfList);
    return herfList;
}

