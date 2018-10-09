<template>
  <el-dialog title="回复详情" :visible.sync="dialogFormVisible" :before-close="handleClose">
    <el-form >
      <el-form-item label="举报ID：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.id}}
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" style="display: inline-block">
        <div >
          <i>举报类别：</i>
          <span>{{dialogForm.reportCategory}}</span>
        </div>
        <div v-if="dialogForm.reportCategory == 7">
          <i>订单号：</i>
          <span>{{dialogForm.orderNumber}}</span>
        </div>
      </el-form-item>
      <el-form-item label="频道：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.professionName}}
      </el-form-item>
      <el-form-item label="留言内容：" :label-width="formLabelWidth">
        {{dialogForm.details}}
      </el-form-item>
      <div class="report-box" >
        <el-form-item label="举报人ID：" :label-width="formLabelWidth"> 
          {{dialogForm.userId}}
        </el-form-item>
        <el-form-item label="举报人：" :label-width="formLabelWidth"> 
          {{dialogForm.userName}}
        </el-form-item>
        <el-form-item label="举报时间：" :label-width="formLabelWidth">
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
      formLabelWidth: '120px'
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
      axios.post('/api/c/operation-management/message-report/update.json', {
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
  .report-box {
    display: flex
  }
</style>