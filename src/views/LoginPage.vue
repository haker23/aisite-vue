<template>
<div class="login-container">
    <el-card shadow="always" class="login-card">
      <h2 slot="header">登录</h2>
      <div class="login-form">
        <el-form ref="loginForm" :model="loginForm" :rules="rules" status-icon label-width="80px">
          <el-form-item label="用户类型" prop="userType">
            <el-select v-model="loginForm.userType" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in roleList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" prop="account">
            <el-input v-model="loginForm.account" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" show-password />
          </el-form-item>
          <div class="login-button">
            <el-button type="primary" @click="signIn">登录</el-button>
            <el-button @click="signUp">注册</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      loginForm: {
        userType: '2',
        account: '',
        password: ''
      },
      rules: {
        userType: [{ required: true, message: '请选择用户类型', trigger: 'blur' }],
        account: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      roleList: [
        {
          label: '咨询师',
          value: '2'
        },
        {
          label: '客户',
          value: '1'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: 'loading'
    })
  },
  created() {
  },
  methods: {
    signIn() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.$store.dispatch("login", this.loginForm).then(response => {
            if (response.code === 200) {
              this.$router.push({
                name: 'HomePage'
              })
            }
          })
        }
      })
    },
    signUp() {
      this.$router.push({
        name: 'SignUp'
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 450px;
}

.login-card >>> .el-card__header {
  padding: 0;
  text-align: center;
}

.login-form {
  margin: 0 30px 0 0;
}

.login-button {
  display: flex;
  justify-content: space-around;
}
</style>