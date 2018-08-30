<template>
  <el-dialog title="回复详情" :visible.sync="dialogFormVisible" :before-close="handleClose">
    <el-form >
      <el-form-item label="举报ID：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.reportId}}
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" style="display: inline-block">
        <div >
          <i>举报类别：</i>
          <span>{{dialogForm.reportCategory}}</span>
        </div>
        <div >
          <i>订单号：</i>
          <span>{{dialogForm.orderNumber}}</span>
        </div>
      </el-form-item>
      <el-form-item label="频道：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.channel}}
      </el-form-item>
      <el-form-item label="留言内容：" :label-width="formLabelWidth">
        {{dialogForm.reportContent}}
      </el-form-item>
      <el-form-item label="举报人ID：" :label-width="formLabelWidth" style="display: inline-block"> 
        {{dialogForm.reportId}}
      </el-form-item>
      <el-form-item label="举报人：" :label-width="formLabelWidth" style="display: inline-block"> 
        {{dialogForm.reportName}}
      </el-form-item>
      <el-form-item label="举报时间：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.reportTime}}
      </el-form-item>
      <el-form-item label="回复内容：" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="replyContent" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="回复人：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.replyName}}
      </el-form-item>
      <el-form-item label="回复时间：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.replyTime}}
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('update:dialogFormVisible',false)">回 复</el-button>
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
    }
  }
}
</script>

<style>

</style>