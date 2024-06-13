<template>
  <div class="login-container">
    <el-card shadow="always" class="login-card">
      <h2 slot="header">注册</h2>
      <div class="login-form">
        <el-form ref="userForm" :model="userForm" :rules="rules" status-icon label-width="80px">
          <el-form-item label="用户类型" prop="userType">
            <el-select v-model="userForm.userType" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in roleList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" prop="account">
            <el-input v-model="userForm.account" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password" type="password" show-password />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword" key="confirmPassword">
            <el-input v-model="userForm.confirmPassword" type="password" show-password />
          </el-form-item>
          <div class="login-button">
            <el-button type="primary" @click="doSignUp">注册</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { signUp } from '@/api/user/login'

export default {
  name: 'SignUp',
  data() {
    return {
      userForm: {
      },
      rules: {
        userType: [{ required: true, message: '请选择用户类型', trigger: 'blur' }],
        acocunt: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }]
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
  created() {

  },
  methods: {
    doSignUp() {
      this.$refs['userForm'].validate(valid => {
        if (valid) {
          signUp(this.userForm).then(response => {
            if (response.data) {
              this.userForm = response.data
              this.$store.dispatch("login", this.userForm).then(response => {
                if (response.code === 200) {
                  this.$router.push({
                    name: 'HomePage'
                  })
                }
              })
            }
          })
        }
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