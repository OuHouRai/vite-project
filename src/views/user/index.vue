<template>
  <div style="margin-bottom: 20px;">
    <el-button type="primary" @click="handleAddUser">
      新增用户
    </el-button>
  </div>
  <el-table :data="tableData" class="body-table">
    <el-table-column type="selection" class="table-selection" width="55" />
    <el-table-column label="编号" class="table-index" width="80">
      <template #default="scope">{{ scope.$index + 1 }}</template>
    </el-table-column>
    <el-table-column property="userIndex" label="用户名" />
    <el-table-column property="position" label="职位" show-overflow-tooltip />
    <el-table-column property="telephone" label="手机号码" />
    <el-table-column property="permissions" label="权限" width="120" />
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
    <span>请问确定要删除用户么？</span>
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
  <el-dialog v-model="dialogVisible" :title="action == 'add' ? '新增用户' : '修改用户'" width="35%" :before-close="handleClose">
    <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item lable="用户名" prop="userIndex">
            <el-input v-model="formUser.userIndex" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item lable="职位" prop="position">
            <el-input v-model="formUser.position" placeholder="请输入职位" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item lable="手机号码" prop="telephone">
            <el-input v-model="formUser.telephone" placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item lable="权限" prop="permissions">
            <el-input v-model="formUser.permissions" placeholder="权限" />
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
    telephone: '',
    permissions: ''
  })
  const rules = reactive({
    userIndex: [{ required: true, message: "用户名为必须入力项", trigger: "blur" }]
  })
  const tableData = ref([
    {
      userIndex: '张三',
      position: '经理',
      telephone: '13687979233',
      permissions: '用户'
    },
    {
      userIndex: '李四',
      position: '文员',
      telephone: '13073448079',
      permissions: '用户'
    },
    {
      userIndex: '王五',
      position: '总经理',
      telephone: '13888888888',
      permissions: '管理员'
    },
    {
      userIndex: '赵伊尔',
      position: '公关经理',
      telephone: '13812334343',
      permissions: '特殊用户'
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
    formUser.telephone = tableData.value[index].telephone
    formUser.permissions = tableData.value[index].permissions
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
        const projectAdd = {
          userIndex: formUser.userIndex,
          position: formUser.position,
          telephone: formUser.telephone,
          permissions: formUser.permissions
        }
        if (action.value == 'add') {
          tableData.value.push(projectAdd)
          dialogVisible.value = false
          proxy.$refs['userForm'].resetFields()
        } else {
          tableData.value.splice(updateIndex.value, 1, projectAdd)
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