<template>
<div class="layui-container fly-marginTop">
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title">
        <li class="layui-this">登录</li>
        <li>
          <router-link :to="{name:'reg'}">注册</router-link>
        </li>
      </ul>
      <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
        <validation-observer v-slot={validate} ref="observer">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">用户名</label>
                  <validation-provider rules="required|email" v-slot={errors}>
                    <div class="layui-input-inline">
                      <input
                      type="text"
                      name="email"
                      placeholder="请输入用户名"
                      autocomplete="off"
                      class="layui-input"
                      v-model="username">
                    </div>
                    <div class="layui-form-mid">
                      <span style="color:#c00;">
                        {{errors[0]}}
                      </span>
                    </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <validation-provider rules="required" v-slot={errors}>
                    <div class="layui-input-inline">
                      <input
                        type="password"
                        name="password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        class="layui-input"
                        v-model="password"
                        >
                    </div>
                    <div class="layui-form-mid">
                      <span style="color:#c00;">
                        {{errors[0]}}
                      </span>
                    </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <validation-provider ref="codeField" rules="required|length:4" v-slot={errors}>
                    <div class="layui-row">
                      <label for="L_vercode" class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                            v-model="code">
                        </div>

                      <div class="">
                        <span style="color: #c00;"
                        @click="_getCode" class="svg" v-html="svg"></span>
                      </div>
                    </div>
                    <div class="layui-form-mid">
                      <span style="color:#c00;">
                        {{errors[0]}}
                      </span>
                    </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" type="button"  @click="validate().then(submit)" >立即登录</button>
                  <span style="padding-left:20px;">
                    <router-link :to="{name:'forget'}">忘记密码</router-link>
                  </span>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者使用社交账号登入</span>
                  <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq" title="QQ登入"></a>
                  <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo" title="微博登入"></a>
                </div>
              </form>
            </div>
          </div>
        </validation-observer>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { getCode, login } from '../api/login'
import { nanoid } from 'nanoid'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    }
  },
  components: {
  },
  mounted () {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = nanoid()
      localStorage.setItem('sid', sid)
    }
    // this.$store.commit('setSid',sid)
    this.setSid(sid)
    this._getCode()
  },
  methods: {
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.msg
        }
      })
    },
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          this.username = ''
          this.password = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          console.log(res)
        } else if (res.code === 500) {
          this.$alert('用户名或密码错误')
        } else if (res.code === 401) {
          this.$refs.codeField.setErrors([res.msg])
        }
      })
    },
    ...mapMutations(['setSid'])
  }
}
</script>
<style lang="scss" scoped>
.svg{
  position: relative;
  top: -5px;
}
</style>
