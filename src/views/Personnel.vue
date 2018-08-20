<template>
    <section class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">人员管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
          <el-col :span="6">
              <el-form-item label="用户/联系人名称：">
                  <el-input placeholder="请输入用户/联系人名称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="用户/联系人手机：">
                  <el-input placeholder="请输入用户/联系人手机"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="用户昵称：">
                  <el-input placeholder="请输入用户昵称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="2.5">
              <el-form-item label="频道：" label-width="55px">
                  <el-select placeholder="全部" style="width: 80px;">
                      <el-option label="全部"  value="shanghai"></el-option>
                      <el-option label="留学" value="beijing"></el-option>
                      <el-option label="语培" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="2.5">
              <el-form-item label="性别：" label-width="55px">
                  <el-select placeholder="全部" style="width: 80px;">
                      <el-option label="男"  value="shanghai"></el-option>
                      <el-option label="女" value="beijing"></el-option>
                      <el-option label="空" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="2.5">
              <el-form-item label="认证：" label-width="55px">
                  <el-select placeholder="全部" style="width: 80px;">
                      <el-option label="全部"  value="shanghai"></el-option>
                      <el-option label="未认证" value="beijing"></el-option>
                      <el-option label="已认证" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="4">
              <el-form-item label="用户角色：" label-width="95px">
                  <el-select placeholder="全部" style="width: 80px;">
                      <el-option label="全部"  value="shanghai"></el-option>
                      <el-option label="普通个人" value="beijing"></el-option>
                      <el-option label="个人讲师" value="beijing"></el-option>
                      <el-option label="机构讲师" value="beijing"></el-option>
                      <el-option label="院校讲师" value="beijing"></el-option>
                      <el-option label="顾问" value="beijing"></el-option>
                      <el-option label="大咖" value="beijing"></el-option>
                      <el-option label="经纪人" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="2.5">
              <el-form-item label="状态：" label-width="55px">
                  <el-select placeholder="正常" style="width: 80px;">
                      <el-option label="正常"  value="shanghai"></el-option>
                      <el-option label="禁用" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="3">
              <el-button size="small" type="primary">搜索</el-button>
              <el-button size="small" type="primary">新增用户</el-button>
          </el-col>
        </el-form>

        <el-col :span='18.5' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData3" stripe width="100%">
                <el-table-column type="selection" label="全部" width="55"></el-table-column>
                <el-table-column prop="date" label="用户id" width="90"></el-table-column>
                <el-table-column prop="name" label="用户/联系人姓名" width="90"></el-table-column>
                <el-table-column prop="name" label="用户/联系人手机" width="90"></el-table-column>
                <el-table-column prop="name" label="角色" width="90"></el-table-column>
                <el-table-column prop="name" label="性别" width="90"></el-table-column>
                <el-table-column prop="name" label="用户注册时间" width="90"></el-table-column>
                <el-table-column prop="name" label="最近登录时间" width="90"></el-table-column>
                <el-table-column prop="name" label="状态" width="90"></el-table-column>
                <el-table-column prop="name" label="认证" width="90"></el-table-column>
                <el-table-column prop="name" label="注册频道" width="90"></el-table-column>
                <el-table-column prop="address" label="操作" show-overflow-tooltip></el-table-column>
            </el-table>
            <!-- </div> -->
        </el-col>
        <div style="height:30px"></div>

        <el-col :span="18" style="text-align: center;">
            <el-col :span="12">
                <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
            </el-col>
            <el-col :span="3">
                <el-button size="small" type="primary">确定</el-button>
            </el-col>
            <el-col :span="3" style="float: right;">
                <el-button size="small" type="primary">批量删除</el-button>
            </el-col>
        </el-col>
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 禁用编辑窗口 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <el-form >
                <el-form-item label="用户/联系人名称：" :label-width="formLabelWidth">
                    <el-input auto-complete="off" placeholder="xxxxxx" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户/联系人手机：" :label-width="formLabelWidth">
                    <el-input auto-complete="off" placeholder="13912xxxx34" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="禁用原因：" :label-width="formLabelWidth">
                    <el-input type="textarea" placeholder="请录入禁用原因" :rows="5"></el-input>
                </el-form-item>
            </el-form>
            <p style="font-size: 20px;">提示：禁用后该用户将无法登陆平台</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow1 = false">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
export default {
  data () {
    return {
      isDialogShow: false,
      isDialogShow1: false
    }
  }
}
</script>
<style scoped>
.personnel{
    margin-left: 10px;
}
.personnel-title{
    font-size: 20px;
    font-weight: 700;
}
</style>
