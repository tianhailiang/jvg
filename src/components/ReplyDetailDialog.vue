<template>
  <el-dialog title="回复详情" :visible.sync="dialogFormVisible" :before-close="handleClose">
    <el-form >
      <el-form-item label="留言ID：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.id}}
      </el-form-item>
      <el-form-item label="留言人ID：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.userId}}
      </el-form-item>
      <el-form-item label="留言内容：" :label-width="formLabelWidth">
        {{dialogForm.contents}}
      </el-form-item>
      <div class="leave-box">
        <el-form-item label="留言人：" :label-width="formLabelWidth"> 
          {{dialogForm.userName}}
        </el-form-item>
        <el-form-item label="留言人联系方式："
        style="margin-left:10px;margin-right:10px;display:flex">
          {{dialogForm.phone}}
        </el-form-item>
        <el-form-item label="留言时间：" style="display:flex">
          {{dialogForm.createdAt}}
        </el-form-item>
      </div>
      <el-form-item label="回复内容：" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="replyContent" maxlength="50"></el-input>
      </el-form-item>
      <!-- <el-form-item label="回复人：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.adminName}}
      </el-form-item>
      <el-form-item label="回复时间：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.replyTime}}
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sure">回 复</el-button>
      <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['dialogFormVisible','dialogForm'],
  data () {
    return {
      replyContent: '',
      formLabelWidth: '90px'
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible',false)
    },
    sure () {
      if (this.replyContent == '') {
        this.$message({
          type: 'warning',
          message: '回复内容不能为空'
        })
        return false
      }
      axios.post('operation-management/message-feedback/update.json', {
        id: this.dialogForm.id,
        replyMemo: this.replyContent
      })
      .then(res => {
        if (res.data.code == 'OK') {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          setTimeout(function() {
            window.location.reload()
          },500)
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
  .leave-box {
    display: flex;
  }
</style>

