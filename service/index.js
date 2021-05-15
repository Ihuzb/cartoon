const async = require('async');
const crypto = require('crypto');
const {maxParallel} = require('../config/config');
const initPuppeteerPool = require('../config/puppeteerPool');
const selectImg = require('./selectImg');
const selectMulu = require('./selectMulu');
const {selectAllCartoon, insertCartoonList, selectCartoonList, insertCartoonImg} = require('../sql/sqlFun');

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
async.waterfall([
  (callback) => {
    callback(null, {name: '进击的巨人', id: 1});
    // selectAllCartoon().then(res => {
    //   if (res.code == 'ok' && res.data.length > 0) {
    //     let list = res.data;
    //     async.mapLimit(list, maxParallel, function (item) {
    //       console.log(`正在获取《${item.name}》目录信息`);
    //       let {id} = item;
    //       selectMulu(pool).then(res => {
    //         if (res.length > 0) {
    //           console.log(`获取《${item.name}》目录信息成功！`);
    //           res = res.map(v => {
    //             let info = [id, v.href, v.title, v.page];
    //             let md5 = crypto.createHash('md5').update(JSON.stringify(info)).digest("hex");
    //             return [...info, md5]
    //           });
    //           insertCartoonList([res]).then(res => {
    //             console.log(`存储《${item.name}》目录信息成功！`);
    //             callback(null);
    //           }).catch(err => {
    //             console.log(`存储《${item.name}》目录信息失败！`);
    //           })
    //         } else {
    //           console.log(`获取《${item.name}》目录信息失败！`);
    //         }
    //       })
    //     }, function (err, results) {
    //       console.log(results);
    //     });
    //   }
    // })
  },
  (res, callback) => {
    let {id, name} = res;
    selectCartoonList(id).then(res => {
      if (res.code == 'ok' && res.data.length > 0) {
        console.log(`获取数据库《${name}》目录信息成功！`);
        let list = res.data;
        async.mapLimit(list, maxParallel, function (item, callback) {
          console.log(`正在获取《${name}》第${item.title}！`);
          let index = list.findIndex(v => v.id == item.id) + 1;
          selectImg(pool, item).then(res => {
            console.log(`《${name}》第${item.title}成功！${index}/${list.length}`);
            res = res.map((v, i) => {
              let info = [id, item.id, v, i + 1];
              let md5 = crypto.createHash('md5').update(JSON.stringify(info)).digest("hex");
              return [...info, md5]
            });
            insertCartoonImg([res]).then(res => {
              callback(null)
            });
          }).catch(err => {
            console.log(`《${name}》第${item.title}失败！`);
          })
        }, function (err, results) {
          // console.log(results);
          console.log(`《${name}》获取完成！`);
          callback(null);
        })
      } else {
        console.log(`获取数据库《${name}》目录信息失败！`);
      }
    }).catch(err => {
      console.log(err)
    })
  }
], function (res) {
  console.log('okk')
})


// let list = [
//     // {href: '/118/01.html', title: '00话', page: '35p'},
//     {href: '/118/02.html', title: '01话', page: '88p'},
//     // {href: '/118/03.html', title: '02话', page: '189p'}
// ]
// async.mapLimit(list, 1, function (item, callback) {
//     console.log(item)
//     selectImg(pool, item).then(res => {
//         callback(null, {title: item.title, imgList: res})
//     })
//
// }, function (err, results) {
//     console.log(results)
// });
