<template>
  <div class="hx-form hx-form-margin">
    <el-form :model="customerAnalysis" :rules="rules" ref="customerAnalysis" label-width="250px">
      <sticky :z-index="10" :sticky-top="89">
        <div class="sub-navbar">
          <el-button type="primary" @click="saveData">保存</el-button>
        </div>
      </sticky>

      <el-collapse v-model="activeNames" class="hx-form-collapse">
        <el-collapse-item name="baseInfo">
          <template slot="title">
            <div class="hx-form-collapse-title">基本信息</div>
          </template>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户姓名：" prop="name">
                <el-input v-model='customerAnalysis.name' placeholder="请输入客户姓名" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户性别：" prop="gender">
                <el-input v-model='customerAnalysis.gender' placeholder="请输入客户性别" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户年龄：" prop="age">
                <el-input v-model='customerAnalysis.age' placeholder="请输入客户年龄" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户联系电话：" prop="phoneNumber">
                <el-input v-model='customerAnalysis.phoneNumber' placeholder="请输入客户联系电话" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户电子邮箱：" prop="email">
                <el-input v-model='customerAnalysis.email' placeholder="请输入客户电子邮箱" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户居住地址：" prop="residentialAddress">
                <el-input v-model='customerAnalysis.residentialAddress' placeholder="请输入客户居住地址" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户工作地点：" prop="workplace">
                <el-input v-model='customerAnalysis.workplace' placeholder="请输入客户工作地点" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户教育背景：" prop="educationLevel">
                <el-input v-model='customerAnalysis.educationLevel' placeholder="请输入客户教育背景" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户职业：" prop="occupation">
                <el-input v-model='customerAnalysis.occupation' placeholder="请输入客户职业" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户家庭基本情况：" prop="familyStatus">
                <el-input v-model='customerAnalysis.familyStatus' placeholder="请输入客户家庭基本情况" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户平均每次消费金额：" prop="averageSpending">
                <el-input v-model='customerAnalysis.averageSpending' placeholder="请输入客户平均每次消费金额" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户购物的大致频率：" prop="shoppingFrequency">
                <el-input v-model='customerAnalysis.shoppingFrequency' placeholder="请输入客户购物的大致频率" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户活跃的社交媒体平台：" prop="socialMedia">
                <el-input v-model='customerAnalysis.socialMedia' placeholder="请输入客户活跃的社交媒体平台" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户的网络行为概述：" prop="onlineBehavior">
                <el-input v-model='customerAnalysis.onlineBehavior' placeholder="请输入客户的网络行为概述" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户的支付偏好和财务习惯概述：" prop="financialPreferences">
                <el-input v-model='customerAnalysis.financialPreferences' placeholder="请输入客户的支付偏好和财务习惯概述" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户常用的支付手段：" prop="paymentMethods">
                <el-input v-model='customerAnalysis.paymentMethods' placeholder="请输入客户常用的支付手段" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户的信用评估分数：" prop="creditScore">
                <el-input v-model='customerAnalysis.creditScore' placeholder="请输入客户的信用评估分数" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户对产品或服务的反馈记录：" prop="customerFeedback">
                <el-input v-model='customerAnalysis.customerFeedback' placeholder="请输入客户对产品或服务的反馈记录" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户与客服或其他渠道的互动记录：" prop="interactionRecords">
                <el-input v-model='customerAnalysis.interactionRecords' placeholder="请输入客户与客服或其他渠道的互动记录" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户的会员等级：" prop="membershipLevel">
                <el-input v-model='customerAnalysis.membershipLevel' placeholder="请输入客户的会员等级" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="客户累积的积分：" prop="points">
                <el-input v-model='customerAnalysis.points' placeholder="请输入客户累积的积分" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户参与会员活动的活跃度：" prop="eventParticipation">
                <el-input v-model='customerAnalysis.eventParticipation' placeholder="请输入客户参与会员活动的活跃度" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script>
  import { getCustomerAnalysis, saveCustomerAnalysis } from "@/api/customeranalysis/customeranalysis";

  export default {
    name: "CustomerAnalysisEdit",
    components: {},
    data () {
      return {
        activeNames: ["baseInfo", "filelistInfo", "processSuggest"],
        customerAnalysis: {
          id: '',
          name: '',
          gender: '',
          age: '',
          phoneNumber: '',
          email: '',
          residentialAddress: '',
          workplace: '',
          educationLevel: '',
          occupation: '',
          familyStatus: '',
          averageSpending: '',
          shoppingFrequency: '',
          socialMedia: '',
          onlineBehavior: '',
          financialPreferences: '',
          paymentMethods: '',
          creditScore: '',
          customerFeedback: '',
          interactionRecords: '',
          membershipLevel: '',
          points: '',
          eventParticipation: '',
          userId: '',
        },
        rules: {
          id: [{ required: true, message: '请填写自增主键', trigger: 'blur' }],
          name: [{ required: true, message: '请填写客户姓名', trigger: 'blur' }],
          gender: [{ required: true, message: '请填写客户性别', trigger: 'blur' }],
          age: [{ required: true, message: '请填写客户年龄', trigger: 'blur' }],
          phoneNumber: [{ required: true, message: '请填写客户联系电话', trigger: 'blur' }],
          email: [{ required: true, message: '请填写客户电子邮箱', trigger: 'blur' }],
          residentialAddress: [{ required: true, message: '请填写客户居住地址', trigger: 'blur' }],
          workplace: [{ required: true, message: '请填写客户工作地点', trigger: 'blur' }],
          educationLevel: [{ required: true, message: '请填写客户教育背景', trigger: 'blur' }],
          occupation: [{ required: true, message: '请填写客户职业', trigger: 'blur' }],
          familyStatus: [{ required: true, message: '请填写客户家庭基本情况', trigger: 'blur' }],
          averageSpending: [{ required: true, message: '请填写客户平均每次消费金额', trigger: 'blur' }],
          shoppingFrequency: [{ required: true, message: '请填写客户购物的大致频率', trigger: 'blur' }],
          socialMedia: [{ required: true, message: '请填写客户活跃的社交媒体平台', trigger: 'blur' }],
          onlineBehavior: [{ required: true, message: '请填写客户的网络行为概述', trigger: 'blur' }],
          financialPreferences: [{ required: true, message: '请填写客户的支付偏好和财务习惯概述', trigger: 'blur' }],
          paymentMethods: [{ required: true, message: '请填写客户常用的支付手段', trigger: 'blur' }],
          creditScore: [{ required: true, message: '请填写客户的信用评估分数，如有', trigger: 'blur' }],
          customerFeedback: [{ required: true, message: '请填写客户对产品或服务的反馈记录', trigger: 'blur' }],
          interactionRecords: [{ required: true, message: '请填写客户与客服或其他渠道的互动记录', trigger: 'blur' }],
          membershipLevel: [{ required: true, message: '请填写客户的会员等级', trigger: 'blur' }],
          points: [{ required: true, message: '请填写客户累积的积分', trigger: 'blur' }],
          eventParticipation: [{ required: true, message: '请填写客户参与会员活动的活跃度', trigger: 'blur' }],
          userId: [{ required: true, message: '请填写用户ID', trigger: 'blur' }],
        }
      };
    },
    created () {
      //加载数据
      this.customerAnalysis.id = this.$route.query.appId;
      if (this.customerAnalysis.id) {
        this.customerAnalysis.new = false;
        this.getData(this.customerAnalysis.id);
      } else {
        this.customerAnalysis.new = true;
      }
    },
    methods: {
      /**
       * 获取数据
       * @param id
       */

      getData (id) {
        getCustomerAnalysis(id).then(response => {
          this.customerAnalysis = response;
        });
      },
      /**
       * 保存数据
       * @param oper
       */
      saveData (oper) {
        if (oper == "submit") {
          this.$refs['customerAnalysis'].validate(valid => {
            if (valid) {
              saveCustomerAnalysis(this.customerAnalysis).then(response => {
                this.customerAnalysis = response;
                this.customerAnalysis.new = false;
              });
            } else {
              this.$message({
                message: '请填写必填字段！',
                type: 'warning'
              })
            }
          })
        } else {
          saveCustomerAnalysis(this.customerAnalysis).then(response => {
            this.customerAnalysis = response;
            this.customerAnalysis.new = false;
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success",
              offset: 70,
              duration: 2000
            });
          });
        }
      }
    }
  };
</script>