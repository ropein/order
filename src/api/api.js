import axios from './request'

const getList = p => axios.get('demo/list', { params: p })
// const getArticleList = p => axios.get('/article-list', { params: p }) // 获取文章列表
// const modifyArticle = (id, p) => axios.put(`/article-modify/${id}`, p) // 修改文章
// const writeArticle = p => axios.post(`/article-write`, p) // 写文章
// const deleteArticle = id => axios.post(`/article-delete/${id}`) // 删除文章
export default {
    getList
    // getArticleList,
    // modifyArticle,
    // writeArticle,
    // deleteArticle
}
