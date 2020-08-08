<template>
  <div>
    <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
    >
      <template #action>
        <van-button round type="danger" size="small" @click="onSearch">搜索</van-button>
      </template>
    </van-search>
    <van-list
            v-model="loading"
            :finished="finished"
            @load="load_more_items"
            finished-text="没有更多了"
    >
      <!--          :value="item.created_at"-->
      <van-card
              v-for="item in dataList"
              :key="item.id"
              :price="item.price"
              :desc="item.desc"
              :title="item.name"
              :thumb="item.thumb"
      >
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
    </van-list>
  </div>
</template>
<script>
    import Vue from 'vue';
    import {Lazyload, Toast} from 'vant';
    Vue.use(Lazyload);
    export default {
        name: 'search',
        data() {
            return {
                value: '',
                list: [],
                dataList: [],
                finished: false,
                loading: false,
                // 一页条数
                pageSize: 10,
                // 第几页
                pageNum: 1,
            }
        },
        mounted() {
            this.value = this.$route.query.value
        },
        methods:{
            load_more_items: function() {
                this.onSearch();
            },
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
            async onSearch() {
                // let { data } = await this.$api.getProductListByProductName(this.value)
                // console.log('data', data.data)
                // let { data } = await this.$api.getList({pageSize:this.pageSize, pageNum:this.pageNum})
                // this.list = data.data.list
                // console.log(1, this.list)
                // if (this.pageNum > 1) {
                //     this.dataList = this.list.concat(this.dataList)
                //     // this.dateList = [...this.dateList, ...this.list]
                // } else {
                //     this.dataList = this.list
                // }
                // // 如果当前页数 = 总页数，则已经没有数据
                // if (this.pageNum === Math.ceil(data.data.total / 10)) {
                //     this.finished = true
                // }
                // // 如果总页数大于当前页码，页码+1
                // if (Math.ceil(data.data.total / 10) > this.pageNum) {
                //     this.pageNum++
                // }
                // this.loading = false
                // this.dataList = [
                //     {
                //         id:0,
                //         title:'名字',
                //         price:'30.00',
                //         desc:'描述',
                //         num:0,
                //         stock:10,
                //         thumb:'https://img.yzcdn.cn/vant/ipad.jpeg'
                //     },
                //     {
                //         id:1,
                //         title:'名字1',
                //         price:'50.00',
                //         desc:'描述5',
                //         num:1,
                //         stock:2,
                //         thumb:'https://img.yzcdn.cn/vant/ipad.jpeg'
                //     }
                // ]
            }
        }
    }
</script>
