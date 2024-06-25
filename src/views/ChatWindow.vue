<template>
  <div style="margin-top: 40px;">
    <el-row>
      <el-col :span="16">
        <el-input v-model="prompt" placeholder="请输入你的提问" />
      </el-col>
      <el-col :span="8">
        <el-button type="primary" style="margin-left: 20px;" @click="doChat">提问</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 40px;">
      <span class="response-message">>>> {{ response }}</span>
    </el-row>
  </div>
</template>

<script>
import {
  chat
} from '@/api/interview/interview'

export default {
  name: 'ChatWindow',
  data() {
    return {
      prompt: '你好',
      response: ''
    }
  },
  created() {
  },
  methods: {
    doChat() {
      chat(this.prompt).then(response => {
        this.response = response.data.responseMsg
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>
.response-message {
  
}
</style>