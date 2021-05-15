const mysql = require('../config/mySqlConfig');
const sqlCode = require('./sqlCode');
let sqlFun = {
  //查询所有漫画列表
  selectAllCartoon: () => {
    return new Promise((resolve, reject) => {
      mysql.selectInfo(sqlCode.selectAllCartoon).then(res => {
        resolve({code: 'ok', data: res});
      }).catch(err => {
        reject({code: 'no', data: err})
      });
    })
  },
  //查询制定id的目录信息
  selectCartoonList: (id) => {
    return new Promise((resolve, reject) => {
      mysql.selectInfo(sqlCode.selectCartoonList, id).then(res => {
        resolve({code: 'ok', data: res});
      }).catch(err => {
        reject({code: 'no', data: err})
      });
    })
  },
  //存储漫画目录信息
  insertCartoonList: (info) => {
    return new Promise((resolve, reject) => {
      mysql.selectInfo(sqlCode.insertCartoonList, info).then(res => {
        resolve({code: 'ok', data: res});
      }).catch(err => {
        reject({code: 'no', data: err})
      });
    })
  },
  //存储漫画内容信息
  insertCartoonImg: (info) => {
    return new Promise((resolve, reject) => {
      mysql.selectInfo(sqlCode.insertCartoonImg, info).then(res => {
        resolve({code: 'ok', data: res});
      }).catch(err => {
        reject({code: 'no', data: err})
      });
    })
  },
}

module.exports = sqlFun;
