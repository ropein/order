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
<!--              规格弹出框-->
              <van-sku
                      v-model="specificationShow"
                      :sku="sku"
                      :goods="goods"
                      :goods-id="goodsId"
                      :quota="quota"
                      :quota-used="quotaUsed"
                      :hide-stock="sku.hide_stock"
                      :message-config="messageConfig"
                      @buy-clicked="onBuyClicked"
                      @add-cart="onAddCartClicked"
              />
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
                        console.log('wu')
                        this.list
                        this.dataList = []
                        this.finished = true
                    }
                }
                // this.dataList = [
                //     {
                //         productId:0,
                //         productName:'名字',
                //         minPrice:100,
                //         productDesc:'描述',
                //         // 购物车中的数量
                //         productNumOfCart:0,
                //         productStorage:10,
                //         productPicturePath:'http://121.199.49.199:8082/upload/202008032221.jpg',
                //         specificationNumber: 1
                //     },
                //     {
                //         productId:1,
                //         productName:'名字',
                //         minPrice:100,
                //         productDesc:'描述',
                //         // 购物车中的数量
                //         productNumOfCart:0,
                //         productStorage:10,
                //         productPicturePath:'http://121.199.49.199:8082/upload/202008032221.jpg',
                //         specificationNumber: 2
                //     }
                // ]
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
                // let { data } = await this.$api.getProductAttributeListByProductId(id)
                // this.attributeList = data.data
                // console.log('规格列表', this.attributeList)
                this.sku = {
                    // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                    tree: [
                        {
                            k: '颜色', // skuKeyName：规格类目名称
                            k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                            v: [
                                {
                                    id: '1', // skuValueId：规格值 id
                                    name: '红色', // skuValueName：规格值名称
                                    imgUrl: 'https://img.yzcdn.cn/1.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                    previewImgUrl: 'https://img.yzcdn.cn/1p.jpg', // 用于预览显示的规格类目图片
                                },
                                {
                                    id: '1',
                                    name: '蓝色',
                                    imgUrl: 'https://img.yzcdn.cn/2.jpg',
                                    previewImgUrl: 'https://img.yzcdn.cn/2p.jpg',
                                }
                            ],
                            largeImageMode: true, //  是否展示大图模式
                        }
                    ],
                        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                        list: [
                        {
                            id: 2259, // skuId
                            s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
                            price: 100, // 价格（单位分）
                            stock_num: 110 // 当前 sku 组合对应的库存
                        }
                    ],
                        price: '1.00', // 默认价格（单位元）
                        stock_num: 227, // 商品总库存
                        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                        none_sku: false, // 是否无规格商品
                        messages: [
                        {
                            // 商品留言
                            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                            name: '留言', // 留言名称
                            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                            required: '1', // 是否必填 '1' 表示必填
                            placeholder: '' // 可选值，占位文本
                        }
                    ],
                        hide_stock: false // 是否隐藏剩余库存
                }
            },
            getSku() {
                this.sku = {
                    // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                    tree: [
                        {
                            k: '颜色',
                            k_id: '1',
                            v: [
                                {
                                    id: '30349',
                                    name: '天蓝色',
                                    imgUrl:
                                        'https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'
                                },
                                {
                                    id: '1215',
                                    name: '白色'
                                }
                            ],
                            k_s: 's1',
                            count: 2
                        },
                        {
                            k: '尺寸',
                            k_id: '2',
                            v: [
                                {
                                    id: '1193',
                                    name: '1'
                                },
                                {
                                    id: '1194',
                                    name: '2'
                                }
                            ],
                            k_s: 's2',
                            count: 2
                        }
                    ],
                        // 所有 sku 的组合列表，如下是：白色1、白色2、天蓝色1、天蓝色2
                        list: [
                        {
                            id: 2259,
                            price: 120, //价格
                            discount: 122,
                            s1: '1215',
                            s2: '1193',
                            s3: '0',
                            s4: '0',
                            s5: '0',
                            stock_num: 20, //库存
                            goods_id: 946755
                        },
                        {
                            id: 2260,
                            price: 110,
                            discount: 112,
                            s1: '1215',
                            s2: '1194',
                            s3: '0',
                            s4: '0',
                            s5: '0',
                            stock_num: 2, //库存
                            goods_id: 946755
                        },
                        {
                            id: 2257,
                            price: 130,
                            discount: 132,
                            s1: '30349',
                            s2: '1193',
                            s3: '0',
                            s4: '0',
                            s5: '0',
                            stock_num: 40, //库存
                            goods_id: 946755
                        },
                        {
                            id: 2258,
                            price: 100,
                            discount: 100,
                            s1: '30349',
                            s2: '1194',
                            s3: '0',
                            s4: '0',
                            s5: '0',
                            stock_num: 50, //库存
                            goods_id: 946755
                        }
                    ],
                        price: '5.00',
                        stock_num: 227, // 商品总库存
                        none_sku: false,  // 是否无规格商品
                        hide_stock: false  // 是否隐藏剩余库存
                }
                // goods_id: '946755',
                //     quota: 3, //限购数量
                //     quota_used: 0,  //已经购买过的数量
                //     goods_info: {
                //     title: '测试商品A',
                //         picture:
                //     'https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg'
                // },
                // initialSku:{
                //     s1: "0001",
                //         s2: "1001",
                //         selectedNum: 3
                // }
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
</style>
