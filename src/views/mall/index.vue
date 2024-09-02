<template>
  <div>
    <el-button type="primary" @click="handleAddProject" style="margin-bottom: 20px;">
      新增项目
    </el-button>
  </div>
  <el-table :data="tableData" class="body-table">
    <el-table-column type="selection" class="table-selection" width="55" />
    <el-table-column label="序号" class="table-index" width="80">
      <template #default="scope">{{ scope.$index + 1 }}</template>
    </el-table-column>
    <el-table-column property="projectIndex" label="项目标号" />
    <el-table-column property="projectName" label="项目名称" show-overflow-tooltip />
    <el-table-column property="tenderer" label="招标人" />
    <el-table-column property="date" label="日期" width="180" />
  </el-table>
  <el-dialog v-model="dialogVisible" :title="action == 'add' ? '新增用户' : '编辑用户'" width="35%" :before-close="handleClose">
    <el-form :inline="true" :model="formProject" :rules="rules" ref="projectForm">
      <el-row>
        <el-col :span="12">
          <el-form-item lable="项目标号" prop="projectIndex">
            <el-input v-model="formProject.projectIndex" placeholder="请输入项目标号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item lable="项目名称" prop="projectName">
            <el-input v-model="formProject.projectName" placeholder="请输入项目名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item lable="项目名称" prop="tenderer">
            <el-input v-model="formProject.tenderer" placeholder="请输入招标人" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item lable="日期" prop="date">
            <el-input v-model="formProject.date" placeholder="请输入日期" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup>
  import { ElTable } from 'element-plus'
  import { reactive, ref, getCurrentInstance } from "vue"

  const { proxy } = getCurrentInstance()
  const action = ref('add')
  const dialogVisible = ref(false)
  const formProject = reactive({})
  const rules = reactive({
    projectIndex: [{ required: true, message: "项目标号为必须入力项", trigger: "blur" }]
  })
  const tableData = ref([
    {
      projectIndex: 'CDZBFW-2024-101',
      projectName: '郑东新区社区服务项目',
      tenderer: '社区居民委员会',
      date: '2024-05-04'
    },
    {
      projectIndex: 'CDZBFW-2024-102',
      projectName: '洛阳市人民政府后勤保障处',
      tenderer: '社会保障部',
      date: '2024-06-08'
    },
    {
      projectIndex: 'CDZBFW-2024-103',
      projectName: '洛阳市运河水利指挥系统中心',
      tenderer: '民众运营中心',
      date: '2024-12-06'
    },

  ])
  const handleAddProject = () => {
    dialogVisible.value = true
    action.value = 'add'
  }
  const handleClose = () => {
    dialogVisible.value = false
  }
  const handleCancel = () => {
    dialogVisible.value = false
  }
  const onSubmit = () => {
    proxy.$refs['projectForm'].validate((vaild) => {
      if (vaild) {
        if (action.value == 'add') {
          const projectAdd = {
            projectIndex: formProject.projectIndex,
            projectName: formProject.projectName,
            tenderer: formProject.tenderer,
            date: formProject.date
          }
          tableData.value.push(projectAdd)
          dialogVisible.value = false
          proxy.$refs['projectForm'].resetFields()
        }
      } else {
        alert('请输入必须入力项目')
      }

    })
  }
  const tableData1 = [
    {
      projectIndex: 'CDZBFW-2024-101',
      projectName: '郑东新区社区服务项目',
      tenderer: '社区居民委员会',
      date: '2024-05-04'
    },
    {
      projectIndex: 'CDZBFW-2024-102',
      projectName: '洛阳市人民政府后勤保障处',
      tenderer: '社会保障部',
      date: '2024-06-08'
    },
    {
      projectIndex: 'CDZBFW-2024-103',
      projectName: '洛阳市运河水利指挥系统中心',
      tenderer: '民众运营中心',
      date: '2024-12-06'
    },

  ]
</script>

<style scoped lang="less">
  .body-table {
    width: 100%;
  }
</style>