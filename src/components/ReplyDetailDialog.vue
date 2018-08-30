<template>
  <el-dialog title="回复详情" :visible.sync="dialogFormVisible" :before-close="handleClose">
    <el-form >
      <el-form-item label="留言ID：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.leaveId}}
      </el-form-item>
      <el-form-item label="留言人ID：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.leaveNameId}}
      </el-form-item>
      <el-form-item label="留言内容：" :label-width="formLabelWidth">
        {{dialogForm.leaveContent}}
      </el-form-item>
      <el-form-item label="留言人：" :label-width="formLabelWidth" style="display: inline-block"> 
        {{dialogForm.leaveName}}
      </el-form-item>
      <el-form-item label="留言人联系方式：" label-width="125px" style="display: inline-block">
        {{dialogForm.phone}}
      </el-form-item>
      <el-form-item label="留言时间：" :label-width="formLabelWidth" style="display: inline-block">
        {{dialogForm.leaveTime}}
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

