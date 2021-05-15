module.exports = {
  //查询所有漫画列表
  selectAllCartoon: 'SELECT * FROM cartoon_name;',
  //查询制定id的目录信息
  selectCartoonList: 'SELECT * FROM cartoon_mulu WHERE cartoon_id=?;',
  //存储漫画目录信息
  insertCartoonList: 'INSERT IGNORE INTO cartoon_mulu (cartoon_id,href,title,page,md5) VALUES ?;',
  //存储漫画内容信息
  insertCartoonImg: 'INSERT IGNORE INTO cartoon_img (cartoon_id,mulu_id,img,page,md5) VALUES ?;'
}