<template>
  <div class="information-form">
    <div class="form-buttom">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <el-form ref="informationForm" :model="information" :rules="rules" label-width="100px">
      <el-row>
        <el-form-item label="用户名">
          {{ information.account }}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="联系方式" prop="telNumber">
          <el-input v-model="information.telNumber" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="性别">
          {{ information.genderValue }}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="密码" prop="password">
          <el-input v-model="information.password" type="password" show-password />
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { updateUser } from '@/api/user/user'

export default {
  name: 'PersonInformation',
  data() {
    return {
      information: {},
      rules: {
        telNumber: [{ required: true, message: '联系方式不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.information = this.$store.state.user
  },
  methods: {
    save() {
      this.$refs['informationForm'].validate(valid => {
        if (valid) {
          updateUser(this.information).then(response => {
            this.information = response.data
            this.$notify({
              type: 'success',
              message: '保存成功'
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.information-form {
  margin: 30px 60px 0 60px;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
}

.form-buttom {
  text-align: end;
  margin: 20px 0 0 40px;
}

</style>