<template>
  <el-dialog title="不通过编辑窗口" :visible.sync="dialogFormVisible" :before-close="handleClose">
    <el-form >
      <el-form-item label="活动ID：" :label-width="formLabelWidth">
        {{dialogForm.id}}
      </el-form-item>
      <el-form-item label="活动标题：" :label-width="formLabelWidth">
        {{dialogForm.title}}
      </el-form-item>
      <el-form-item label="发布用户名：" :label-width="formLabelWidth">
        {{dialogForm.issuerVal}}
      </el-form-item>
      <el-form-item label="原因：" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="reason" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="提示：" :label-width="formLabelWidth">
        用户重新申请审核
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sure">确 定</el-button>
      <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['dialogFormVisible','dialogForm'],
  data () {
    return {
      reason: '',
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible',false)
    },
    sure () {
      if (!this.reason) {
        this.$message({
          type: 'warning',
          message: '不通过原因不能为空'
        })
        return false
      }
      axios.post('/api/c/operation-activity/verify/verify.json', {
        id: this.dialogForm.id,
        auditStatus: 3,
        auditStatusMemo: this.reason
      })
      .then(res => {
        if (res.data.code == 'OK') {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          setTimeout(function () {
            window.location.reload()
          },500)
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style>

</style>
