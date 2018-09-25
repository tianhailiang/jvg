<template>
  <section class="member-content">
    <h3 class="content-title">会员列表</h3>
    <el-row :gutter="20">
        <el-form label-width="80px">
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="">
                    <span @click="dialogShow = true" class="open-madel">用户ID</span>
                  <el-input type="text" size="small" :disabled="true"></el-input>
                </el-form-item>  
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="会员名称">
                  <el-input type="text" size="small" :disabled="true"></el-input>
                </el-form-item>  
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="">
                    <span @click="dialogVisible = true" class="open-madel">VIP会员</span>
                  <el-input type="text" size="small"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="会员等级">
                  <el-input type="text" size="small"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="">
                    <span @click="dialogFormVisible = true" class="open-madel">会员积分</span>
                  <el-input type="text" size="small"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="会员ID">
                  <el-input type="text" size="small" :disabled="true"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="当前状态">
                    <el-select placeholder="" v-model="defaultValue" size="small">
                        <el-option 
                        :label="item.label" 
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in actives"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="开通频道">
                    <el-select placeholder="" v-model="value" size="small">
                        <el-option 
                        :label="item.label"
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in ktdatas"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
        </el-form>
    </el-row>
    <div class="btn-ok-group">
        <el-button type="primary" size="small">确定</el-button>
        <el-button type="primary" size="small">取消</el-button>
    </div>
    <!-- 详情弹窗1 -->
    <el-dialog title="会员积分详情" :visible.sync="dialogFormVisible" class="modal">
        <el-form :model="form" size="small" :inline="true">
            <el-form-item label="会员名称">
                <el-input v-model="form.name" :disabled="true" placeholder="自动生成"></el-input>
            </el-form-item>
            <el-form-item label="会员ID">
                <el-input v-model="form.name" :disabled="true" placeholder="自动生成"></el-input>
            </el-form-item>
            <el-form-item label="开通频道">
                <el-input v-model="form.name" :disabled="true" placeholder="自动生成"></el-input>
            </el-form-item>
        </el-form>
        <el-table :data="data" style="width: 100%" border size="medium">
          <el-table-column prop="currentid" label="NO" width="50" align="center"></el-table-column>
          <el-table-column prop="currentid" label="行为" width="120" align="center"></el-table-column>
          <el-table-column prop="currentid" label="获得积分" width="120" align="center"></el-table-column>
          <el-table-column prop="currentname" width="120" label="积分增减" align="center"></el-table-column>
          <el-table-column prop="current" width="120" label="活动日期" align="center"></el-table-column>
          <el-table-column label="行为次数" width="120" align="center"></el-table-column>
        </el-table>
        <el-form :model="form" size="small" :inline="true" style="margin-top:20px;">
            <el-form-item label="初始化积分">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="积分总数">
                <el-input v-model="form.name" :disabled="true" placeholder="自动生成"></el-input>
            </el-form-item>
            <el-form-item label="调整积分">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
        </el-form>
      </el-dialog>
    <!-- 详情弹窗 2-->
    <el-dialog title="VIP会员详情" :visible.sync="dialogVisible" class="modal">
        <el-form :model="form" size="small" :inline="true">
            <el-form-item label="会员名称">
                <el-input v-model="form.name" :disabled="true" placeholder="自动生成"></el-input>
            </el-form-item>
            <el-form-item label="会员ID">
                <el-input v-model="form.name" :disabled="true" placeholder="自动生成"></el-input>
            </el-form-item>
            <el-form-item label="开通频道">
                <el-input v-model="form.name" :disabled="true" placeholder="自动生成"></el-input>
            </el-form-item>
        </el-form>
        <el-table :data="vipdata" style="width: 100%" border size="medium">
          <el-table-column prop="id" label="NO" width="50" align="center"></el-table-column>
          <el-table-column prop="id" label="用户ID" width="120" align="center"></el-table-column>
          <el-table-column prop="id" label="开通时长" width="120" align="center"></el-table-column>
          <el-table-column prop="idtime" label="开通日期" width="120" align="center"></el-table-column>
          <el-table-column prop="currentname" width="120" label="截止日期" align="center"></el-table-column>
          <el-table-column prop="current" width="120" label="开通费用" align="center"></el-table-column>
          <el-table-column label="缴费" width="120" align="center"></el-table-column>
        </el-table>
        <div class="open-btn">
          <el-button type="primary">打开到期缴费提醒</el-button>
        </div>
      </el-dialog>
      <!--  -->
      <!-- 详情弹窗 3-->
    <el-dialog title="用户选择列表" :visible.sync="dialogShow" class="modal">
        <el-form :model="form" size="small">
            <el-row :gutter="20">
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="用户/联系人名称">
                      <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="用户/联系人手机">
                      <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="用户昵称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="用户角色">
                        <el-input v-model="form.name" placeholder="个人"></el-input>
                    </el-form-item>  
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="状态">
                        <el-input v-model="form.name" placeholder="正常"></el-input>
                    </el-form-item>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="性别">
                        <el-select placeholder="" v-model="value1" size="small">
                            <el-option 
                            :label="item.label" 
                            :value="item.value"
                            :key="index"
                            v-for="(item, index) in value1Data"></el-option>
                        </el-select>
                    </el-form-item>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="频道">
                        <el-select placeholder="" v-model="qudaoVal" size="small">
                            <el-option 
                            :label="item.label"
                            :value="item.value"
                            :key="index"
                            v-for="(item, index) in qudao"></el-option>
                        </el-select>
                    </el-form-item>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="认证">
                        <el-select placeholder="" v-model="attest" size="small">
                            <el-option
                            :label="item.label"
                            :value="item.value"
                            :key="index"
                            v-for="(item, index) in attestData"></el-option>
                        </el-select>
                    </el-form-item>  
                </div></el-col>
            </el-row>
        </el-form>
        <el-table :data="vipdata" style="width: 100%" border size="medium">
          <el-table-column prop="id" label="NO" width="50" align="center"></el-table-column>
          <el-table-column prop="id" label="用户ID" width="80" align="center"></el-table-column>
          <el-table-column prop="id" label="用户/联系人姓名" width="120" align="center"></el-table-column>
          <el-table-column prop="id" label="用户/联系人手机" width="120" align="center"></el-table-column>
          <el-table-column prop="id" label="性别" width="45" align="center"></el-table-column>
          <el-table-column prop="id" label="用户注册时间" width="120" align="center"></el-table-column>
          <el-table-column prop="id" label="最近登录时间" width="120" align="center"></el-table-column>
          <el-table-column prop="idtime" label="状态" width="100" align="center"></el-table-column>
          <el-table-column prop="currentname" width="100" label="认证" align="center"></el-table-column>
          <el-table-column prop="current" width="120" label="注册频道" align="center"></el-table-column>
          <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                  <el-button size="small" type="danger">选择</el-button>
              </template>
          </el-table-column>
        </el-table>
        <!--  -->
        <div class="row-container">
            <el-pagination 
            background layout="prev, pager, next, jumper" :total="100"></el-pagination>
            <el-button size="small" type="primary">确定</el-button>
          </div>
      </el-dialog>
  </section>
</template>
<script>
export default {
  name: 'memberDetails',
  data () {
    return {
      defaultValue: '',
      value: '',
      actives: [
        {value: '1', label: '全部'},
        {value: '2', label: '使用中'},
        {value: '3', label: '已过期'}
      ],
      ktdatas: [
        {value: '1', label: '全部'},
        {value: '2', label: '留学'},
        {value: '3', label: '语培'}
      ],
      dialogFormVisible: false,
      dialogVisible: false,
      dialogShow: false,
      value1: '',
      attest: '',
      qudaoVal: '',
      form: {
        name: ''
      },
      data: [
        {currentid: '001'}
      ],
      vipdata: [
        {id: '001', idtime: '2018-8-31'}
      ],
      value1Data: [
        {value: '1', label: '空'},
        {value: '2', label: '男'},
        {value: '3', label: '女'},
        {value: '4', label: '全部'}
      ],
      attestData: [
        {value: '1', label: '全部'},
        {value: '2', label: '已认证'},
        {value: '3', label: '未认证'}
      ],
      qudao: [
        {value: '1',label: '全部'},
        {value: '2',label: '留学'},
        {value: '3',label: '语培'}
      ]
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_title.css';
.btn-ok-group,.open-btn{
  display: flex;
  justify-content: center;
}
.open-btn {
  margin-top: 20px;
}
.open-madel{
  position: absolute;
  margin-left: -65px;
  cursor: pointer;
  color: #409EFF;
}
.open-madel:after{
  display: block;
  position: absolute;
  bottom: 8px;
  content: '';
  height: 1px;
  width: 100%;
  background: #409EFF;
}
</style>