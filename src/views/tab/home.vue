<template>
  <div>
    <van-search
            v-model="searchValue"
            shape="round"
            background="#E62F2D"
            placeholder="请输入搜索关键词"
    />
    <div class="swipe">
      <van-swipe :autoplay="3000" width="300px" height="300px">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
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
                  v-for="item in list"
                  :key="item.id"
                  :price="item.price"
                  :desc="item.desc"
                  :title="item.title"
                  :thumb="item.thumb"
          >
<!--            <template #tags>-->
<!--              <van-tag plain type="danger">标签</van-tag>-->
<!--              <van-tag plain type="danger">标签</van-tag>-->
<!--            </template>-->
            <template #footer>
              <svg class="icon" aria-hidden="true" @click="sub(item)" v-if="item.num>0">
                <use xlink:href="#iconsub"></use>
              </svg>
              <span>{{item.num}}</span>
              <svg class="icon" aria-hidden="true" @click="add(item)">
                <use xlink:href="#iconadd"></use>
              </svg>
            </template>
          </van-card>
<!--          <van-cell-->
<!--                  v-for="item in list"-->
<!--                  :key="item.id"-->
<!--                  :title="item.name"-->
<!--          />-->
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
    import img1 from '../../assets/images/apple-3.jpg'
    export default {
        name: 'home',
        data() {
            return {
                images: [
                    img1,
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg',
                ],
                searchValue:'',
                // 懒加载内容
                list: [],
                data:[],
                finished: false,
                loading: false,
                offset: 0,
                page: 0,
                limit: 10,
                // 左侧
                active: 0,
                items: [{ text: '分组 1' }, { text: '分组 2' }],
            }
        },
        watch:{
            active: {
                handler: function (newValue, oldValue) {
                    console.log(newValue, oldValue)
                }
            }
        },
        mounted() {
            this.fetch_items()
        },
        methods: {
            sub(item) {
                console.log('item', item.num)
                if (item.num>0){
                    item.num--
                }
            },
            add(item) {
                if (item.num<item.stock){
                    item.num++
                } else {
                    Toast(`该商品仅剩${item.stock}件`);
                }
            },
            load_more_items: function() {
                this.page += 1;
                this.offset = this.limit * this.page;
                this.fetch_items();
            },

            fetch_items: function() {
                // var that = this;

                // $.ajax({
                //     url: `/api/get_items?offset=${this.offset}&limit=${this.limit}`,
                //     type: 'get',
                //     dataType: 'json',
                //     success: function(data) {
                //         that.loading = false;
                //         if (data.data.length) {
                //             that.items.push(...data.data);
                //         } else {
                //             that.finished = true;
                //         }
                //     }
                // });
                this.list = [
                    {
                        id:0,
                        title:'名字',
                        price:'30.00',
                        desc:'描述',
                        num:2,
                        stock:10,
                        thumb:'https://img.yzcdn.cn/vant/ipad.jpeg'
                    },
                    {
                        id:1,
                        title:'名字1',
                        price:'50.00',
                        desc:'描述5',
                        num:1,
                        stock:2,
                        thumb:'https://img.yzcdn.cn/vant/ipad.jpeg'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
  .icon {
    /*height: 1.2em;*/
    color: #E62F2D;
  }
</style>
