<template>
  <div>
    <van-search
            v-model="searchValue"
            shape="round"
            background="#E62F2D"
            placeholder="请输入搜索关键词"
            @search="onSearch"
    >
    </van-search>
<!--    轮播-->
    <div class="swipe">
      <van-swipe :autoplay="3000" width="300px" height="300px">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
<!--    树选择-->
    <van-tree-select height="55vw" :items="items" :main-active-index.sync="active">
      <template #content>
        <van-list
                v-model="loading"
                :finished="finished"
                @load="load_more_items"
                finished-text="没有更多了"
        >
<!--          :value="item.created_at"-->
          <van-card
                  v-for="item in dataList"
                  :key="item.productId"
                  :price="item.minPrice.toFixed(2)"
                  :desc="item.productDesc"
                  :title="item.productName"
                  :thumb="item.productPicturePath"
          >
            <template #footer>
              <div v-if="item.specificationNumber === 1" class="specification">
                <svg class="icon" aria-hidden="true" @click="sub(item)" v-if="item.productNumOfCart>0">
                  <use xlink:href="#iconsub"></use>
                </svg>
                <span>{{item.productNumOfCart}}</span>
                <svg class="icon" aria-hidden="true" @click="add(item)">
                  <use xlink:href="#iconadd"></use>
                </svg>
              </div>
              <div v-if="item.specificationNumber > 1" class="specification">
                <van-button round type="info" size="mini" @click="selectSpecification(item.productId)">选规格</van-button>
              </div>
              <div>

              </div>
            </template>
          </van-card>
        </van-list>
      </template>
    </van-tree-select>
  </div>
</template>
<script>
    import Vue from 'vue';
    import { Lazyload } from 'vant';
    import { Toast } from 'vant';
    Vue.use(Lazyload);
    Vue.use(Toast)
    export default {
        name: 'home',
        data() {
            return {
                images: [
                    // img1,
                    // 'https://img.yzcdn.cn/vant/apple-1.jpg',
                    // 'https://img.yzcdn.cn/vant/apple-2.jpg',
                ],
                searchValue:'',
                // 懒加载内容
                list: [],
                dataList: [],
                finished: false,
                loading: false,
                // 一页条数
                pageSize: 10,
                // 第几页
                pageNum: 1,
                // 左侧
                active: 0,
                items: [],
                // 规格数据
                // 规格框
                specificationShow:false,
                // 规格列表
                attributeList:[],
                sku: {
                    // 数据结构见下方文档
                },
                goods: {
                    // 数据结构见下方文档
                },
                goodsId:0,
                messageConfig: {
                    // 数据结构见下方文档
                },
                // 根据商品分类id获取列表
                id:0
            }
        },
        watch:{
            // 根据分类获取列表
            active: {
                handler: function (newValue) {
                    this.id=this.items[newValue].id
                    this.fetch_items(this.id)
                }
            }
        },
        created() {
            // 获取分类
            this.getProductCategoryList()
            this.fetch_items(this.id)
        },
        methods: {
            onSearch() {
                console.log('sousuo', this.searchValue)
                this.$router.push({name: 'search', query: {value: this.searchValue}})
            },
            sub(item) {
                if (item.productNumOfCart>0){
                    item.productNumOfCart--
                }
            },
            add(item) {
                if (item.productNumOfCart<item.productStorage){
                    item.productNumOfCart++
                } else {
                    Toast(`该商品仅剩${item.productStorage}件`);
                }
            },
            // 懒加载
            load_more_items: function() {
                this.fetch_items();
            },
            // 商品列表
            async fetch_items(){
                console.log('active', this.active)
                if (this.active===0){
                    let { data } = await this.$api.getAllProductList({pageSize:this.pageSize, pageNum:this.pageNum})
                    this.list = data.data.list
                    this.images=[]
                    for (let i=0;i<4;i++) {
                        this.images.push(this.list[i].productPicturePath)
                    }
                    if (this.pageNum > 1) {
                        this.dataList = this.list.concat(this.dataList)
                        // this.dateList = [...this.dateList, ...this.list]
                    } else {
                        this.dataList = this.list
                    }
                    // 如果当前页数 = 总页数，则已经没有数据
                    if (this.pageNum === Math.ceil(data.data.total / 10)) {
                        this.finished = true
                    }
                    // 如果总页数大于当前页码，页码+1
                    if (Math.ceil(data.data.total / 10) > this.pageNum) {
                        this.pageNum++
                    }
                    this.loading = false
                }
                else {
                    this.pageSize = 10
                    this.pageNum=1
                    let { data } = await this.$api.getProductListByProductCategoryId({productCategoryId:this.id,pageSize:this.pageSize, pageNum:this.pageNum})
                    if (data.data) {
                        console.log('yyou', data)
                        this.list = data.data.list
                        if (this.pageNum > 1) {
                            this.dataList = this.list.concat(this.dataList)
                            // this.dateList = [...this.dateList, ...this.list]
                        } else {
                            this.dataList = this.list
                        }
                        // 如果当前页数 = 总页数，则已经没有数据
                        if (this.pageNum === Math.ceil(data.data.total / 10)) {
                            this.finished = true
                        }
                        // 如果总页数大于当前页码，页码+1
                        if (Math.ceil(data.data.total / 10) > this.pageNum) {
                            this.pageNum++
                        }
                        this.loading = false
                    } else {
                        this.list
                        this.dataList = []
                        this.finished = true
                    }
                }
            },
            // 获取分类
            async getProductCategoryList() {
                let { data } = await this.$api.getProductCategoryList()
                console.log('分类列表')
                data.data.forEach(item => {
                    this.items.push({
                        id:item.productCategoryId,
                        text:item.categoryName
                    })
                })
                this.items.unshift({
                    id: 0,
                    text: '全部'
                })
            },
            // 选规格
            selectSpecification(id) {
                this.specificationShow = true
                this.getProductAttributeList(id)
            },
            // 根据id获取规格
            async getProductAttributeList(id) {
                // 商品id
                this.goodsId = id
                // let { data } = await this.$api.getProductAttributeListByProductId(id)
                // this.attributeList = data.data
                // console.log('规格列表', this.attributeList)
            },
            onAddCartClicked() {
                console.log('加入购物车')
            }
        }
    }
</script>

<style scoped>
  .icon {
    /*height: 1.2em;*/
    color: #E62F2D;
  }
  .specification{
    position: absolute;
    right: 20px;
    bottom: 8px;
  }
  /deep/.van-sku-row__title{
    float: left;
  }
</style>
