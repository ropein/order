import axios from './request'

// 获取商品分类
const getProductCategoryList = p => axios.get('product/getProductCategoryList', { params: p })
// 获取所有商品
const getAllProductList = p => axios.get('product/getAllProductList', { params: p })
// 搜索商品
const getProductListByProductName = (p) => axios.get(`/product/getProductListByProductName/${p}`)
// 根据id获取规格列表
const getProductAttributeListByProductId = (p) => axios.get(`/product/getProductAttributeListByProductId/${p}`)
// 根据分类id获取商品列表
const getProductListByProductCategoryId = (p) => axios.get(`/product/getProductListByProductCategoryId`, { params: p })
// http://localhost:3000/api/product/getProductAttributeListByProductId/1
// const getArticleList = p => axios.get('/article-list', { params: p }) // 获取文章列表
// const modifyArticle = (id, p) => axios.put(`/article-modify/${id}`, p) // 修改文章
// const writeArticle = p => axios.post(`/article-write`, p) // 写文章
// const deleteArticle = id => axios.post(`/article-delete/${id}`) // 删除文章
export default {
    getProductCategoryList,
    getAllProductList,
    getProductListByProductName,
    getProductAttributeListByProductId,
    getProductListByProductCategoryId
    // getArticleList,
    // modifyArticle,
    // writeArticle,
    // deleteArticle
}
