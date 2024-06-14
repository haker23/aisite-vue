<template>
  <div style="margin-top: 50px;">
    <el-form :model="listQuery" label-width="5px">
      <el-row>
        <!--查询列按需设置-->
        <el-col :span="4">
          <el-form-item>
            <el-input :placeholder="'客户姓名'" v-model="listQuery.customerName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input :placeholder="'客户居住地址'" v-model="listQuery.residentialAddress" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item style="float:right">
            <el-button-group>
              <el-button type="primary" size="mini" @click="handleAdd">新增</el-button>
              <el-button type="primary" size="mini" @click="handleQuery(1)">查询</el-button>
              <el-button type="primary" size="mini" :disabled="canUpdate" @click="handleUpdate">修改</el-button>
              <el-button type="primary" size="mini" :disabled="canDelete" @click="handleDelete">删除</el-button>
            </el-button-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="list" v-loading="listLoading" :height="tableHeight" :row-style="{height:'30px'}" border
      ref="CustomerAnalysisTable" highlight-current-row stripe @selection-change="handleSelectionChange"
      style="width:100%">
      <el-table-column type="selection" />
      <el-table-column prop="name" label="客户姓名" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="age" label="客户年龄" width="160" header-align="center" align="center" show-overflow-tooltip />
      <el-table-column prop="phoneNumber" label="客户联系电话" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="email" label="客户电子邮箱" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="residentialAddress" label="客户居住地址" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="workplace" label="客户工作地点" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="educationLevel" label="客户教育背景" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="occupation" label="客户职业" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="familyStatus" label="客户家庭基本情况" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="averageSpending" label="客户平均每次消费金额" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="shoppingFrequency" label="客户购物的大致频率" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="socialMedia" label="客户活跃的社交媒体平台" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="onlineBehavior" label="客户的网络行为概述" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="financialPreferences" label="客户的支付偏好和财务习惯概述" width="160" header-align="center"
        align="center" show-overflow-tooltip />
      <el-table-column prop="paymentMethods" label="客户常用的支付手段" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="creditScore" label="客户的信用评估分数" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="customerFeedback" label="客户对产品或服务的反馈记录" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="interactionRecords" label="客户与客服或其他渠道的互动记录" width="160" header-align="center"
        align="center" show-overflow-tooltip />
      <el-table-column prop="membershipLevel" label="客户的会员等级" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="points" label="客户累积的积分" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="eventParticipation" label="客户参与会员活动的活跃度" width="160" header-align="center" align="center"
        show-overflow-tooltip />
    </el-table>

    <el-pagination :current-page.sync="listQuery.pageNum" :page-size.sync="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleQuery"
      @current-change="handleQuery">
    </el-pagination>
  </div>
</template>

<script>
  import { queryCustomerAnalysis } from "@/api/customeranalysis/customeranalysis";

  export default {
    name: "CustomerList",
    data () {
      return {
        tableHeight: '430px',
        showQuery: false,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 10
        },
        multipleSelection: [],
        canDelete: true,
        canUpdate: true
      };
    },
    beforeMount () {
      // 设置列表高度
      var h = document.documentElement.clientHeight || document.body.clientHeight
      this.tableHeight = (h - 228) + 'px'
    },
    created () {
      //数据获取
      this.handleQuery();
    },
    methods: {
      handleQuery () {
        //点击查询回到第一页
        this.listLoading = true;
        queryCustomerAnalysis(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        });
      },
      handleAdd () {
        this.$router.push({
          name: "CustomerAnalysisEdit"
        });
      },
      handleView () {
        this.$router.push({
          name: "CustomerAnalysisView",
          query: { appId: this.multipleSelection[0].id }
        });
      },
      handleSelectionChange (val) {
        if (val.length > 1) {
          this.$refs.InterviewRecordsTable.clearSelection()
          this.$refs.InterviewRecordsTable.toggleRowSelection(val.pop())
        } else {
          this.multipleSelection = val
        }
      },
      handleUpdate () {
        this.$router.push({
          name: "CustomerAnalysisEdit",
          query: { appId: this.multipleSelection[0].id }
        });
      }
    }
  };
</script>