const handleBlogRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  // get blog list
  if (method === 'GET' && path === '/api/blog/list') {
    return {
      msg: '这是获取博客列表的接口'
    }
  }

  // get blog detail
  if (method === 'GET' && path === '/api/blog/detail') {
    return {
      msg: '这是获取博客详情的接口'
    }
  }

  // add new blog
  if (method === 'POST' && path === '/api/blog/new') {
    return {
      msg: '这是新建博客的接口'
    }
  }

  // update blog
  if (method === 'POST' && path === '/api/blog/update') {
    return {
      msg: '这是更新博客的接口'
    }
  }

  // delete a blog
  if (method === 'POST' && path === '/api/blog/delete') {
    return {
      msg: '这是删除博客的接口'
    }
  }
}

module.exports = handleBlogRouter