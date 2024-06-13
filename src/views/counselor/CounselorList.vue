<template>
  <div>
    <el-form ref="listQuery" :model="listQuery" label-width="100px" class="query-form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="咨询师姓名">
            <el-input v-model="listQuery.account" class="query-input" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button-group style="float: right;">
            <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-form>

    <el-table
      v-loading="listLoading"
      ref="ConsultantsTable"
      :data="list"
      border
      highlight-current-row
      stripe
      style="width:100%"
    >
      <el-table-column type="selection"/>
      <el-table-column prop="userId" label="用户ID" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="name" label="咨询师姓名" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="gender" label="咨询师性别" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="age" label="咨询师年龄" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="expertise" label="专业领域" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="educationBackground" label="教育背景" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="certifications" label="持有证书" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="yearsOfExperience" label="从业年数" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="bio" label="个人简介或简历摘要" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="contactPhone" label="联系方式—电话号码" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="email" label="联系方式—电子邮箱" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="address" label="办公地址或服务区域" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="availability" label="上班时间" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="hourlyRate" label="每小时咨询费用" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="languages" label="服务语言" width="160" header-align="center" align="center" show-overflow-tooltip/>
      <el-table-column prop="photoUrl" label="个人照片URL" width="160" header-align="center" align="center" show-overflow-tooltip/>
    </el-table>

    <el-pagination
      :current-page.sync="listQuery.pageNum"
      :page-size.sync="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleQuery"
      @current-change="handleQuery"
    >
    </el-pagination>
  </div>
</template>

<script>
import { queryCounselorList } from '@/api/counselor/counselor'

export default {
  name: 'CounselorList',
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      listLoading: false
    }
  },
  created() {
    this.handleQuery()
  },
  methods: {
    handleQuery() {
      this.listLoading = true
      queryCounselorList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.query-form {
  margin-top: 10px;
}

.query-input >>> .el-input__inner {
  width: 200px;
  height: 30px;
}
</style>
