<template>
  <el-dialog title="禁用编辑窗口" :visible.sync="dialogFormVisible" :before-close="handleClose">
    <el-form >
      <el-form-item label="文章ID：" :label-width="formLabelWidth">
        {{dialogForm.id}}
      </el-form-item>
      <el-form-item label="文章标题：" :label-width="formLabelWidth">
        {{dialogForm.title}}
      </el-form-item>
      <el-form-item label="发布用户名：" :label-width="formLabelWidth">
        {{dialogForm.realName}}
      </el-form-item>
      <el-form-item label="禁用原因：" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="reason" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="提示：" :label-width="formLabelWidth">
        禁用后该文章在前端无法显示
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
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
      /* 禁用 */
      if (this.reason == '') {
        this.$message({
          type: 'warning',
          message: '请填写禁用理由'
        })
        return false
      }
      axios.post('/api/c/article/list/change-updown.json', {
        id: this.dialogForm.id,
        upDown: 2,
        downMemo: this.reason
      })
      .then( response => {
        if (response.data.code == 'OK') {
          this.$message({
            type: 'success',
            message: response.data.message
          })
          setTimeout(function () {
            window.location.reload()
          },500)
        }else {
          this.$message({
            type: 'error',
            message: response.data.message
          })
        }
      })
      .catch( error => {
        console.log(error);
      })
    }
  }
}
</script>

<style>

</style>

