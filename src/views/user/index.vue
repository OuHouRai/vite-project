<template>
  <div style="margin-bottom: 20px;">
    <el-button type="primary" @click="handleAddUser">
      添加专家信息
    </el-button>
  </div>
  <el-table :data="tableData" class="body-table">
    <el-table-column type="selection" class="table-selection" width="55" />
    <el-table-column label="编号" class="table-index" width="80">
      <template #default="scope">{{ scope.$index + 1 }}</template>
    </el-table-column>
    <el-table-column property="userIndex" label="姓名" width="80" />
    <el-table-column property="position" label="职称" width="100" />
    <el-table-column property="sex" label="性别" width="80" />
    <el-table-column property="specialized" label="专业" width="100" />
    <el-table-column property="firm" label="公司" />
    <el-table-column property="identificationNumber" label="身份证号" />
    <el-table-column property="telephone" label="手机号" width="180" />
    <el-table-column width="100">
      <template #default="scope">
        <el-button type="primary" @click.prevent="handleUpdate(scope.$index)">
          修改
        </el-button>
      </template>
    </el-table-column>
    <el-table-column width="100">
      <template #default="scope">
        <el-button type="danger" @click.prevent="handleDelete(scope.$index)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 删除弹窗 -->
  <el-dialog v-model="centerDialogVisible" title="提示" width="500">
    <span>请问确定要删除该专家么？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 修改或编辑项目弹窗 -->
  <el-dialog v-model="dialogVisible" :title="action == 'add' ? '添加专家信息' : '修改专家'" width="35%"
    :before-close="handleClose">
    <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item lable="姓名" prop="userIndex">
            <el-input v-model="formUser.userIndex" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item lable="职称" prop="position">
            <el-input v-model="formUser.position" placeholder="请输入职称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item lable="性别" prop="position">
            <el-input v-model="formUser.sex" placeholder="请输入性别" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item lable="专业" prop="specialized">
            <el-input v-model="formUser.specialized" placeholder="请输入专业" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item lable="公司" prop="firm">
            <el-input v-model="formUser.firm" placeholder="请输入公司" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item lable="身份证号" prop="identificationNumber">
            <el-input v-model="formUser.identificationNumber" placeholder="请输入身份证号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item lable="手机号" prop="telephone">
            <el-input v-model="formUser.telephone" placeholder="请输入手机号" />
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

<script lang="ts" setup>
  import { ElTable } from 'element-plus'
  import { reactive, ref, getCurrentInstance } from "vue"

  const { proxy } = getCurrentInstance()
  const action = ref('add')
  const updateIndex = ref(0)
  const centerDialogVisible = ref(false)
  const dialogVisible = ref(false)
  const formUser = reactive({
    userIndex: '',
    position: '',
    sex: '',
    specialized: '',
    firm: '',
    identificationNumber: '',
    telephone: '',
  })
  const rules = reactive({
    userIndex: [{ required: true, message: "姓名为必须入力项", trigger: "blur" }]
  })
  const tableData = ref([
    {
      userIndex: '张又名',
      position: '普通专家',
      sex: '男',
      specialized: '居家类',
      firm: '太康县信达商业咨询有限公司',
      identificationNumber: '412724199709082675',
      telephone: '136879792533',
    },
    {
      userIndex: '刘书纯',
      position: '高级专家',
      sex: '男',
      specialized: '商务类',
      firm: '洛阳市云天盛科技有限公司',
      identificationNumber: '498724199809082675',
      telephone: '136823434433',
    },
    {
      userIndex: '陈永红',
      position: '中级专家',
      sex: '女',
      specialized: '技术类',
      firm: '洛阳市天大商务有限公司',
      identificationNumber: '353724199009082675',
      telephone: '136823434433',
    },

  ])
  const handleAddUser = () => {
    //清空原始对象
    for (const key in formUser) {
      delete formUser[key]
    }
    Object.assign(formUser, {})
    dialogVisible.value = true
    action.value = 'add'
  }
  const handleClose = () => {
    dialogVisible.value = false
  }
  const handleCancel = () => {
    dialogVisible.value = false
  }
  const handleUpdate = (index) => {
    action.value = 'update'
    updateIndex.value = index
    dialogVisible.value = true
    formUser.userIndex = tableData.value[index].userIndex
    formUser.position = tableData.value[index].position
    formUser.sex = tableData.value[index].sex
    formUser.specialized = tableData.value[index].specialized
    formUser.firm = tableData.value[index].firm
    formUser.identificationNumber = tableData.value[index].identificationNumber
    formUser.telephone = tableData.value[index].telephone
  }
  const handleDelete = (index) => {
    centerDialogVisible.value = true
    updateIndex.value = index
  }
  const handleConfirm = () => {
    tableData.value.splice(updateIndex, 1)
    centerDialogVisible.value = false
  }
  const onSubmit = () => {
    proxy.$refs['userForm'].validate((vaild) => {
      if (vaild) {
        const userAdd = {
          userIndex: formUser.userIndex,
          position: formUser.position,
          sex: formUser.sex,
          specialized: formUser.specialized,
          firm: formUser.firm,
          identificationNumber: formUser.identificationNumber,
          telephone: formUser.telephone,
        }
        if (action.value == 'add') {
          tableData.value.push(userAdd)
          dialogVisible.value = false
          proxy.$refs['userForm'].resetFields()
        } else {
          tableData.value.splice(updateIndex.value, 1, userAdd)
          dialogVisible.value = false
          proxy.$refs['userForm'].resetFields()
        }
      } else {
        alert('请输入必须入力项目')
      }
    })
  }
</script>

<style scoped lang="less">
  .body-table {
    width: 100%;
  }
</style>