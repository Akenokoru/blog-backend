const getList = (author, keyword) => {
  // return mock data
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1610013669369,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1610013685777,
      author: 'lisi'
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1610013669369,
    author: 'zhangsan'
  }
}

module.exports = {
  getList,
  getDetail
}