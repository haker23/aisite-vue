<template>
  <div style="margin-top: 50px;">
    <el-form :model="listQuery" label-width="5px">
      <el-row>
        <!--查询列按需设置-->
        <el-col :span="4">
          <el-form-item>
            <el-input :placeholder="'咨询师姓名'" v-model="listQuery.name" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input :placeholder="'客户姓名'" v-model="listQuery.customerName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item style="float:right">
            <el-button-group>
              <el-button type="primary" size="mini" :disabled="canUpdate" @click="handleQuery(1)">查看访谈记录</el-button>
              <el-button type="primary" size="mini" @click="handleQuery(1)">查询</el-button>
            </el-button-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="list" v-loading="listLoading" :height="tableHeight" :row-style="{height:'30px'}" border
      ref="InterviewRecordsTable" highlight-current-row stripe style="width:100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column prop="consultantId" label="咨询师ID" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="clientId" label="客户ID" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column label="访谈日期" width="160" header-align="center" align="center">
        <template slot-scope="scope"><span>{{ scope.row.interviewDate | parseTime('{y}-{m}-{d}') }}</span></template>
      </el-table-column>
      <el-table-column label="访谈开始时间" width="160" header-align="center" align="center">
        <template slot-scope="scope"><span>{{ scope.row.startTime | parseTime('{y}-{m}-{d}') }}</span></template>
      </el-table-column>
      <el-table-column label="访谈结束时间" width="160" header-align="center" align="center">
        <template slot-scope="scope"><span>{{ scope.row.endTime | parseTime('{y}-{m}-{d}') }}</span></template>
      </el-table-column>
      <el-table-column prop="interviewMode" label="访谈方式" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="topicsCovered" label="访谈覆盖的主题或讨论要点" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="clientConcerns" label="客户提出的主要问题或关心点" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="adviceProvided" label="咨询师提供的建议或解决方案" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="nextSteps" label="后续行动计划或建议的下一步" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column prop="notes" label="其他备注或细节记录" width="160" header-align="center" align="center"
        show-overflow-tooltip />
      <el-table-column label="记录创建时间" width="160" header-align="center" align="center">
        <template slot-scope="scope"><span>{{ scope.row.createdAt | parseTime('{y}-{m}-{d}') }}</span></template>
      </el-table-column>
      <el-table-column label="记录最后更新时间" width="160" header-align="center" align="center">
        <template slot-scope="scope"><span>{{ scope.row.updatedAt | parseTime('{y}-{m}-{d}') }}</span></template>
      </el-table-column>
    </el-table>

    <el-pagination :current-page.sync="listQuery.pageNum" :page-size.sync="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleQuery"
      @current-change="handleQuery">
    </el-pagination>
  </div>
</template>

<script>
  import { queryInterviewRecords } from "@/api/interviewrecords/interviewrecords";

  export default {
    name: "InterviewRecordsList",
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
        queryInterviewRecords(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        });
      },
      handleSelectionChange (val) {
        if (val.length > 1) {
          this.$refs.InterviewRecordsTable.clearSelection()
          this.$refs.InterviewRecordsTable.toggleRowSelection(val.pop())
        } else {
          this.multipleSelection = val
        }
        if (this.multipleSelection.length > 0) {
          this.canUpdate = false
        } else {
          this.canUpdate = true
        }
      },
      handleView () {
        this.$router.push({
          name: "CustomerAnalysisView",
          query: { appId: this.multipleSelection[0].id }
        });
      }
    }
  };
</script>