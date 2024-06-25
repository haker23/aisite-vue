<template>
  <div class="hx-form hx-form-margin">
    <el-form
      :model="interviewRecords"
      :rules="rules"
      ref="interviewRecords"
      label-width="250px"
    >
      <div class="sub-navbar">
        <el-button type="primary" @click="saveData">保存</el-button>
        <el-button type="primary" @click="cancelData">注销</el-button>
      </div>

      <el-collapse v-model="activeNames" class="hx-form-collapse">
        <el-collapse-item name="baseInfo">
          <template slot="title">
            <div class="hx-form-collapse-title">基本信息</div>
          </template>

          <el-row>
            <el-col :span="10">
              <el-form-item
                label="咨询师ID，关联consultants表中的咨询师："
                prop="consultantId"
              >
                <el-input
                  v-model="interviewRecords.consultantId"
                  placeholder="请输入咨询师ID，关联consultants表中的咨询师"
                  clearable
                />
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item
                label="客户ID，关联clients表中的客户："
                prop="clientId"
              >
                <el-input
                  v-model="interviewRecords.clientId"
                  placeholder="请输入客户ID，关联clients表中的客户"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="访谈日期：" prop="interviewDate">
                <el-date-picker
                  style="width: 100%"
                  type="date"
                  v-model="interviewRecords.interviewDate"
                  placeholder="请输入访谈日期"
                  clearable
                />
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="访谈开始时间：" prop="startTime">
                <el-date-picker
                  style="width: 100%"
                  type="date"
                  v-model="interviewRecords.startTime"
                  placeholder="请输入访谈开始时间"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="访谈结束时间：" prop="endTime">
                <el-date-picker
                  style="width: 100%"
                  type="date"
                  v-model="interviewRecords.endTime"
                  placeholder="请输入访谈结束时间"
                  clearable
                />
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item
                label="访谈方式，线上或线下进行："
                prop="interviewMode"
              >
                <el-input
                  v-model="interviewRecords.interviewMode"
                  placeholder="请输入访谈方式，线上或线下进行"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item
                label="访谈覆盖的主题或讨论要点："
                prop="topicsCovered"
              >
                <el-input
                  v-model="interviewRecords.topicsCovered"
                  placeholder="请输入访谈覆盖的主题或讨论要点"
                  clearable
                />
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item
                label="客户提出的主要问题或关心点："
                prop="clientConcerns"
              >
                <el-input
                  v-model="interviewRecords.clientConcerns"
                  placeholder="请输入客户提出的主要问题或关心点"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item
                label="咨询师提供的建议或解决方案："
                prop="adviceProvided"
              >
                <el-input
                  v-model="interviewRecords.adviceProvided"
                  placeholder="请输入咨询师提供的建议或解决方案"
                  clearable
                />
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item
                label="后续行动计划或建议的下一步："
                prop="nextSteps"
              >
                <el-input
                  v-model="interviewRecords.nextSteps"
                  placeholder="请输入后续行动计划或建议的下一步"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="其他备注或细节记录：" prop="notes">
                <el-input
                  v-model="interviewRecords.notes"
                  placeholder="请输入其他备注或细节记录"
                  clearable
                />
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="记录创建时间：" prop="createdAt">
                <el-date-picker
                  style="width: 100%"
                  type="date"
                  v-model="interviewRecords.createdAt"
                  placeholder="请输入记录创建时间"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="记录最后更新时间：" prop="updatedAt">
                <el-date-picker
                  style="width: 100%"
                  type="date"
                  v-model="interviewRecords.updatedAt"
                  placeholder="请输入记录最后更新时间"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script>
import {
  getInterviewRecords,
  saveInterviewRecords,
  deleteInterviewRecords
} from '@/api/interviewrecords/interviewrecords'

export default {
  name: 'InterviewRecordsEdit',
  components: {},
  data() {
    return {
      activeNames: ['baseInfo'],
      interviewRecords: {
        recordId: '',
        consultantId: '',
        clientId: '',
        interviewDate: '',
        startTime: '',
        endTime: '',
        interviewMode: '',
        topicsCovered: '',
        clientConcerns: '',
        adviceProvided: '',
        nextSteps: '',
        notes: '',
        createdAt: '',
        updatedAt: ''
      },
      taskId: this.$route.query.taskId,
      instId: this.$route.query.instId,
      taskCanOper: true,
      isCancel: true,
      isFile: true,
      processBoxVisible: false,
      rules: {
        recordId: [
          {
            required: true,
            message: '请填写访谈记录ID，自增长主键',
            trigger: 'blur'
          }
        ],
        consultantId: [
          {
            required: true,
            message: '请填写咨询师ID，关联consultants表中的咨询师',
            trigger: 'blur'
          }
        ],
        clientId: [
          {
            required: true,
            message: '请填写客户ID，关联clients表中的客户',
            trigger: 'blur'
          }
        ],
        interviewDate: [
          { required: true, message: '请填写访谈日期', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请填写访谈开始时间', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请填写访谈结束时间', trigger: 'blur' }
        ],
        interviewMode: [
          {
            required: true,
            message: '请填写访谈方式，线上或线下进行',
            trigger: 'blur'
          }
        ],
        topicsCovered: [
          {
            required: true,
            message: '请填写访谈覆盖的主题或讨论要点',
            trigger: 'blur'
          }
        ],
        clientConcerns: [
          {
            required: true,
            message: '请填写客户提出的主要问题或关心点',
            trigger: 'blur'
          }
        ],
        adviceProvided: [
          {
            required: true,
            message: '请填写咨询师提供的建议或解决方案',
            trigger: 'blur'
          }
        ],
        nextSteps: [
          {
            required: true,
            message: '请填写后续行动计划或建议的下一步',
            trigger: 'blur'
          }
        ],
        notes: [
          {
            required: true,
            message: '请填写其他备注或细节记录',
            trigger: 'blur'
          }
        ],
        createdAt: [
          { required: true, message: '请填写记录创建时间', trigger: 'blur' }
        ],
        updatedAt: [
          { required: true, message: '请填写记录最后更新时间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    //加载数据
    this.interviewRecords.recordId = this.$route.query.appId
    if (this.interviewRecords.recordId) {
      this.interviewRecords.new = false
      this.getData(this.interviewRecords.recordId)
    }
  },
  methods: {
    /**
     * 获取数据
     * @param id
     */

    getData(id) {
      this.taskCanOper = true
      getInterviewRecords(id).then((response) => {
        this.taskCanOper = false
        this.interviewRecords = response
        this.isFile = false
        this.$nextTick(() => {
          this.isFile = true
        })
        this.pageControlInit()
      })
    },
    /**
     * 保存数据
     * @param oper
     */
    saveData() {
      this.taskCanOper = true
      saveInterviewRecords(this.interviewRecords).then(() => {
        this.taskCanOper = false
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          offset: 70,
          duration: 2000
        })
      })
    },
    /**
     * 删除数据
     */
    cancelData() {
      this.$confirm('确定删除数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteInterviewRecords({ id: [this.interviewRecords.recordId] }).then(
            () => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                offset: 70,
                duration: 2000
              })
            }
          )
        })
        .catch(() => {})
    }
  }
}
</script>
