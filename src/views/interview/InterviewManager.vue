<template>
  <div class="interview">
    <el-button class="interview-button" @click="doCreateInterview">创建访谈室</el-button>
    <el-button class="interview-button" type="primary" @click="doCreateResult">生成访谈结果</el-button>

    <div v-if="isCreatedInterview" class="interview-video">
      <video class="video-player" :src="videoUrl1" controls autoplay></video>
      <video v-if="isInterviewerEnter" class="video-player" :src="videoUrl2" controls autoplay></video>
    </div>

    
    <div class="interview-title">
      <span>
        >>> 提示内容 
      </span>
    </div>
    <div class="interview-chat">
      <div class="chat-view">
        您可以尝试提问以下问题：<br>
        <div v-for="(question, index) in questionList" :key="index" :value="question">
          <span class="question">{{ (index + 1) + '、' + question }}</span>
          <br>
          <br>
        </div>
      </div>
      <div class="chat-input">
        <span style="margin: 10px;">根据对话识别以下关键词：<br></span>
        <el-input v-model="audioContent" type="textarea" :rows="5"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { createInterview } from '@/api/interview/interview'
import { saveCustomerAnalysis } from '@/api/customeranalysis/customeranalysis'
import hakerMp4 from '@/assets/video/haker.mp4'
import kann from '@/assets/video/kann.mp4'

export default {
  name: 'InterviewManager',
  data() {
    return {
      interview: {},
      user: {},
      videoUrl1: hakerMp4,
      videoUrl2: kann,
      isCreatedInterview: false,
      isInterviewerEnter: false,
      audioContent: '就业',
      questionList: [
        '在当前的经济环境下，您认为就业市场面临的最大挑战是什么？这些挑战对求职者和雇主分别有何影响？',
        '随着科技的发展和自动化程度的提高，您如何看待未来就业市场的变化趋势？这些变化对特定行业或职业领域的影响如何？',
        '针对年轻人和初入职场的新人，您有哪些建议以提高他们的就业竞争力？有哪些技能和知识是他们应该特别重视的？',
        '您认为政府在促进就业方面应该扮演什么样的角色？有哪些政策措施可以有效地缓解就业压力，并促进劳动力市场的健康发展？',
        '当前，远程工作和灵活就业模式越来越普遍。您认为这些新兴就业模式对就业市场带来了哪些机遇和挑战？个人和企业应该如何适应这种变化？'
      ]
    }
  },
  created() {
    this.user = this.$store.state.user
  },
  methods: {
    doCreateInterview() {
      createInterview(this.user.userId).then(response => {
        this.interview = response.data
        this.isCreatedInterview = true
        console.log(this.interview)
      })
    },
    doCreateResult() {
      const loading = this.$loading({
        lock: true,//lock的修改符--默认是false
        text: 'Loading',//显示在加载图标下方的加载文案
        spinner: 'el-icon-loading',//自定义加载图标类名
        background: 'rgba(240, 240, 240, 0.7)',//遮罩层颜色
        target: document.querySelector('#table')//loadin覆盖的dom元素节点
      })
      setTimeout(() => {
        var customerAnalusis = {
          name: 'kann',
          gender: '男',
          userId: 'dbd9ce5c-3dc5-4031-b3ca-e9fe0c20be9f',
          isNew: true
        }
        saveCustomerAnalysis(customerAnalusis).then(response => {
          console.log(response)
          this.$notify({
            type: 'success',
            message: '更新成功'
          })
        })
        loading.close()
      }, 3000 )
    }
  }
}
</script>

<style scoped>

.interview {
  width: 100%;
}

.interview-button {
  margin: 50px 20px 20px 0;
}

.interview-video {
  display: flex;
}

.video-player {
  width: 300px;
}

.interview-title {
  margin: 30px 0 10px 0;
}

.interview-chat {
  border-radius: 20px;
  box-shadow: 0 0 3px #000;
  height: 600px;
  margin-right: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: column;
}

.chat-view {
  height: 450px;
  width: 100%;
  border: 1px;
  margin: 10px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.chat-input >>> .el-textarea__inner {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.question {

}

</style>