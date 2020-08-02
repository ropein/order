<template>
  <div>
    <van-nav-bar
            title="注册"
            left-arrow
            @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit" ref="form">
      <van-field
              v-model="username"
              name="name"
              label="用户名"
              placeholder="用户名"
              :rules="[
                  { required: true, message: '请填写用户名' },
                  { pattern: patternUser, message: '用户名不超过十位数且不能有特殊字符' }
                  ]"
      />
      <van-field
              name="portrait"
              label="头像"
              :rules="[
                  { required: true, message: '请上传头像' },
                  ]"
      >
        <template #input>
          <van-uploader
                  v-model="portrait"
                  :max-count="1"
                  :after-read="afterRead"
          />
        </template>
      </van-field>
      <van-field
              v-model="tel"
              name="tel"
              label="手机号"
              placeholder="手机号"
              :rules="[
                  { required: true, message: '请填写手机号' },
                  { pattern:patternPhone, message: '手机号格式错误' },
              ]"
      />
      <van-field
              v-model="password"
              :type="flag === true?'password':'text'"
              name="password"
              label="密码"
              clearable
              autocomplete
              placeholder="密码"
              :right-icon="flag === true?'eye-o':'closed-eye'"
              @click-right-icon="changeType"
              :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
              v-model="certainpassword"
              :type="certainflag === true?'password':'text'"
              name="certainpassword"
              label="确定密码"
              clearable
              autocomplete
              placeholder="请再次输入密码"
              :right-icon="certainflag === true?'eye-o':'closed-eye'"
              @click-right-icon="changeCertainType"
              :rules="[
                      { required: true, message: '请再次填写密码' },
                      { validator: validatorCertainPassword, message: '两次密码不一致' }
                  ]"
      />
      <van-field
              v-model="verifycode"
              center
              clearable
              label="验证码"
              placeholder="请输入验证码"
              :rules="[{ required: true, message: '请输入验证码' }]"
      >

        <div slot="button" style="width: 70px;" >
          <img :src="vImg"  @click="getVerifyCode"/>
        </div>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                portrait:[],
                tel:'',
                password: '',
                certainpassword:'',
                verifycode:'',
                vImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595910341360&di=ddc0499bcd525cd02751e14a78cf9be7&imgtype=0&src=http%3A%2F%2Fs4.sinaimg.cn%2Fmw690%2F003bsgbmgy6R6efoOr1c3',
                flag: true,
                certainflag:true,
                action:'',
                // 操作面板
                show:false,
                actions: [{ name: '找回密码' }, { name: '短信验证通过' }],
                // 校验规则
                // 手机号校验
                patternPhone:/^1[3456789]\d{9}$/,
                patternUser:/^[\u4e00-\u9fffa-zA-Z0-9]{1,10}$/
            }
        },
        mounted() {
            this.getVerifyCode()
        },
        methods: {
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                console.log(file);
            },
            onSubmit(values) {
                console.log('submit', values);
            },
            onClickLeft() {
                this.$router.back()
            },
            changeType() {
                this.flag = !this.flag
            },
            changeCertainType() {
              this.certainflag = !this.certainflag
            },
            getVerifyCode() {
                console.log('获取验证码图片')
            },
            validatorCertainPassword(val) {
                console.log('val', val)
                if (val === this.password) {
                    return true
                } else {
                    return false
                }
            },
        }
    }
</script>

<style scoped>


</style>
