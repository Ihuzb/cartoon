const mysql = require('mysql');
let onelib = {
    host: '39.107.89.238',      // MySQL所在服务器IP
    user: 'root',           // 用户名
    password: 'Hzb136877',           // 密码
    database: 'cartoon',      // 数据库名称
    port: 3306,             // 端口号
    charset: "utf8mb4",
    dateStrings: true,      // 时间以字符串形式显示，否则会有类似这样的显示：Thu Apr 14 2016 00:00:00 GMT+0800 (中国标准时间) 17:20:12
};
let onelib_pool = mysql.createPool(onelib);

class connectMysql {
    static instance = null;

    static getInstance() {//防止重复实例化
        if (!connectMysql.instance) {
            connectMysql.instance = new connectMysql()
        }
        return connectMysql.instance
    }

    constructor() {
        this.connection = null;//防止重复连接
        this.pingInterval = null;//定时器
        this.connect();
        this.pingConnent();
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                onelib_pool.getConnection((err, connection) => {
                    if (err) {
                        reject(err)
                    } else {
                        this.connection = connection;
                        resolve(connection)
                    }
                })
            } else {
                resolve(this.connection)
            }
        })
    }

    selectInfo(sql, value) {
        return new Promise((resolve, reject) => {
            this.connect().then(connection => {
                connection.query(sql, value, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                });
            }).catch(err => {
                reject(err)
            })
        })
    }

    pingConnent() {
        clearInterval(this.pingInterval);
        this.pingInterval = setInterval((() => {
            this.connection.ping((err) => {
                if (err) {
                    console.log('ping error:' + err)
                }
            })
        }).bind(this), 3600000 * 4)
    }
}


module.exports = connectMysql.getInstance();