<template>
    <div class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">敏感词管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
            <el-col :span="4">
              <el-form-item label="业务类型：" label-width="100px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="课程" :value="1" :key="1"></el-option>
                      <el-option label="问答" :value="2" :key="2"></el-option>
                      <el-option label="文章" :value="3" :key="3"></el-option>
                      <el-option label="相册" :value="4" :key="4"></el-option>
                      <el-option label="圈子" :value="5" :key="5"></el-option>
                      <el-option label="评论" :value="6" :key="6"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button size="small" type="primary" @click="onDisableClik(1)">追加业务类型</el-button>
              <el-button size="small" type="primary" @click="onEditClick(1)">追加敏感词</el-button>
            </el-col>
        </el-form>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
        <el-table :data="tableData" stripe width="100%" border>
            <el-table-column prop="userClassify" label="业务类型" align="center"></el-table-column>
            <el-table-column prop="collegesId" label="敏感词" align="center"></el-table-column>
            <el-table-column width="250" label="操作" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-button @click="onEditClick(scope.$index)" type="danger" size="small">编辑</el-button>
                    <el-button @click="onDelClick(scope.$index)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        </el-col>
        <div style="height:30px"></div>

        <el-col :span="18" style="text-align: center;">
            <el-col :span="12">
                <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
            </el-col>
            <el-col :span="3">
                <el-button size="small" type="primary">确定</el-button>
            </el-col>
            <!-- <el-col :span="3" style="float: right;">
                <el-button size="small" type="primary">批量删除</el-button>
            </el-col> -->
        </el-col>
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认是否继续删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 追加业务类型 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p style="font-size: 30px;">追加业务类型</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="业务名称：" label-width="100px">
                        <el-input placeholder="请输入业务名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="业务说明：" label-width="100px">
                        <el-input placeholder="请输入业务说明"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow1 = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 追加敏感词 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">追加敏感词</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="业务名称：" label-width="100px">
                        <el-input placeholder="请输入业务名称" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="业务说明：" label-width="100px">
                        <el-input placeholder="请输入业务说明" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="敏感词：" label-width="100px">
                        <el-input type="textarea" placeholder="请录入敏感词" :rows="5" style="width: 400px"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow2 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow2 = false">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      region: '',
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      tableData: [{
        phone: '15200000001',
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registertime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }, {
        phone: '15200000001',
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registertime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }, {
        phone: '15200000001',
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registertime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }, {
        phone: '15200000001',
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registertime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }]
    }
  },
  methods: {
    onEditClick (index) {
      this.isDialogShow2 = true
    },
    onDisableClik (index) {
      this.isDialogShow1 = true
    },
    onDelClick (index) {
      this.isDialogShow = true
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
