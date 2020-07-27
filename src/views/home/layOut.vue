<template>
  <div>
    <van-sticky>
    <van-nav-bar
            style="background: #E62F2D"
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
    <router-view style="padding-bottom: 53px"></router-view>
    <div class="footer">
      <van-tabbar v-model="active" placeholder="true">
        <van-tabbar-item icon="home-o" @click="$router.push('/')">首页</van-tabbar-item>
<!--        <van-tabbar-item icon="apps-o">分类</van-tabbar-item>-->
        <van-tabbar-item icon="shopping-cart-o" @click="$router.push('/cart')">购物车</van-tabbar-item>
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
                if (!this.username){
                  this.$router.push('/login')
                } else {
                    this.show = true;
                }
            },
        }
    }
</script>
<style>
  .footer {
    position: fixed;
  }
</style>
