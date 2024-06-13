<template>
  <div class="hx-form hx-form-margin">
    <el-form :model="customerAnalysis" label-width="250px" class="hx-form-label">

      <sticky :z-index="10" :sticky-top="89">
        <div class="sub-navbar">
          <el-button type="primary" :disabled="taskCanOper || customerAnalysis.workflowState === '4'"
            @click="saveData">保存</el-button>
          <el-button type="primary" @click="saveData('submit')"
            :disabled="taskCanOper || customerAnalysis.workflowState === '4'">提交</el-button>
          <el-button type="primary" @click="cancelData"
            :disabled="taskCanOper || customerAnalysis.workflowState === '4'"
            v-show="isCancel || customerAnalysis.workflowState === '2'">注销</el-button>
        </div>
      </sticky>

      <el-collapse v-model="activeNames" class="hx-form-collapse">
        <el-collapse-item name="baseInfo">
          <template slot="title">
            <div class="hx-form-collapse-title">基本信息</div>
          </template>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户姓名：" prop="name">{{customerAnalysis.name}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户性别：" prop="gender">{{customerAnalysis.gender}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户年龄：" prop="age">{{customerAnalysis.age}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户联系电话：" prop="phoneNumber">{{customerAnalysis.phoneNumber}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户电子邮箱：" prop="email">{{customerAnalysis.email}}</el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="客户居住地址："
                prop="residentialAddress">{{customerAnalysis.residentialAddress}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户工作地点：" prop="workplace">{{customerAnalysis.workplace}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户教育背景：" prop="educationLevel">{{customerAnalysis.educationLevel}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户职业：" prop="occupation">{{customerAnalysis.occupation}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户家庭基本情况：" prop="familyStatus">{{customerAnalysis.familyStatus}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户平均每次消费金额："
                prop="averageSpending">{{customerAnalysis.averageSpending}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户购物的大致频率："
                prop="shoppingFrequency">{{customerAnalysis.shoppingFrequency}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户活跃的社交媒体平台：" prop="socialMedia">{{customerAnalysis.socialMedia}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户的网络行为概述：" prop="onlineBehavior">{{customerAnalysis.onlineBehavior}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户的支付偏好和财务习惯概述："
                prop="financialPreferences">{{customerAnalysis.financialPreferences}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户常用的支付手段：" prop="paymentMethods">{{customerAnalysis.paymentMethods}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户的信用评估分数：" prop="creditScore">{{customerAnalysis.creditScore}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户对产品或服务的反馈记录："
                prop="customerFeedback">{{customerAnalysis.customerFeedback}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户与客服或其他渠道的互动记录："
                prop="interactionRecords">{{customerAnalysis.interactionRecords}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户的会员等级：" prop="membershipLevel">{{customerAnalysis.membershipLevel}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户累积的积分：" prop="points">{{customerAnalysis.points}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户参与会员活动的活跃度："
                prop="eventParticipation">{{customerAnalysis.eventParticipation}}</el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script>
  import { getCustomerAnalysis } from "@/api/customeranalysis/customeranalysis";

  export default {
    name: "CustomerAnalysisView",
    components: {},
    data () {
      return {
        activeNames: ["baseInfo"],
        customerAnalysis: {
          id: ""
        },
      };
    },
    created () {
      //加载数据
      this.customerAnalysis.id = this.$route.query.appId;
      if (this.customerAnalysis.id) {
        this.getData(this.customerAnalysis.id);
      }
    },
    methods: {
      getData (id) {
        getCustomerAnalysis(id).then(response => {
          this.customerAnalysis = response;
        });
      }
    }
  };
</script>