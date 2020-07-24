<template>
  <div>
    <van-sticky>
    <van-nav-bar
            style="background: #4fc08d"
    >
      <template #left>
        <van-icon name="location" color="#fff"/>
        <span style="color: #fff">商家名称</span>
      </template>
      <template #right>
        <van-icon name="manager" @click="showPopup" color="#fff"/>
      </template>
    </van-nav-bar>
    <van-popup
         v-model="show"
         position="right"
         :style="{ height: '100%',width: '100%' }"
         closeable
    >
    </van-popup>
    </van-sticky>
    <router-view></router-view>
    <div class="footer">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o">个人中心</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'layOut',
        data() {
            return {
                show: false,
                active: '首页'
            }
        },
        methods: {
            showPopup() {
                this.show = true;
            },
        }
    }
</script>
