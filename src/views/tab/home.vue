<template>
  <div>
    <van-search
            v-model="searchValue"
            shape="round"
            background="#4fc08d"
            placeholder="请输入搜索关键词"
    />
    <div class="swipe">
      <van-swipe :autoplay="3000" width="300px" height="300px">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue';
    import { Lazyload } from 'vant';

    Vue.use(Lazyload);
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
                searchValue:''
            }
        },
        methods: {
        }
    }
</script>

<style scoped>


</style>
