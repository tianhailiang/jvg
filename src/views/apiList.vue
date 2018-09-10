<template>
    <div class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">API管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
            <el-col :span="5">
              <el-form-item label="ID：" label-width="80px">
                  <el-input placeholder="请输入ID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="名称：" label-width="80px">
                  <el-input placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="渠道：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="APP" :value="1" :key="1"></el-option>
                      <el-option label="PC" :value="2" :key="2"></el-option>
                      <el-option label="WAP" :value="3" :key="3"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="业务频道：" label-width="100px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="留学" :value="1" :key="1"></el-option>
                      <el-option label="语培" :value="2" :key="2"></el-option>
                      <el-option label="院校通道" :value="3" :key="3"></el-option>
                      <el-option label="移民" :value="4" :key="4"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="页面名称：" label-width="100px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="留学" :value="1" :key="1"></el-option>
                      <el-option label="语培" :value="2" :key="2"></el-option>
                      <el-option label="院校通道" :value="3" :key="3"></el-option>
                      <el-option label="移民" :value="4" :key="4"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="状态：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="正常" :value="1" :key="1"></el-option>
                      <el-option label="冻结" :value="2" :key="2"></el-option>
                      <el-option label="删除" :value="3" :key="3"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button size="small" type="primary">搜索</el-button>
              <el-button size="small" type="primary" @click="onDisableClik">追加</el-button>
            </el-col>
        </el-form>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55"></el-table-column>
                <el-table-column prop="collegesId" label="页面ID" align="center"></el-table-column>
                <el-table-column prop="collegesName" label="页面名称" align="center"></el-table-column>
                <el-table-column prop="country" label="页面URL" align="center"></el-table-column>
                <el-table-column prop="phone" label="渠道" align="center"></el-table-column>
                <el-table-column prop="userName" label="业务频道" align="center"></el-table-column>
                <el-table-column prop="category" label="状态" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small">冻结</el-button>
                        <el-button type="danger" size="small">查看</el-button>
                        <el-button @click="onDelClick" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
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
            <el-col :span="3" style="float: right;">
                <el-button size="small" type="primary">批量冻结</el-button>
            </el-col>
        </el-col>
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认是否继续删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加API -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p style="font-size: 30px;">添加API</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="API名称：" label-width="100px">
                        <el-input placeholder="请输入API名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="APIURL：" label-width="100px">
                        <el-input placeholder="请输入APIURL"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="渠道：" label-width="80px">
                        <el-select v-model="region" placeholder="全部" style="width: 80px;">
                            <el-option label="全部" :value="0" :key="0"></el-option>
                            <el-option label="APP" :value="1" :key="1"></el-option>
                            <el-option label="PC" :value="2" :key="2"></el-option>
                            <el-option label="WAP" :value="3" :key="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="业务频道：" label-width="100px">
                        <el-select v-model="region" placeholder="全部" style="width: 80px;">
                            <el-option label="全部" :value="0" :key="0"></el-option>
                            <el-option label="留学" :value="1" :key="1"></el-option>
                            <el-option label="语培" :value="2" :key="2"></el-option>
                            <el-option label="院校通道" :value="3" :key="3"></el-option>
                            <el-option label="移民" :value="4" :key="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="页面名称：" label-width="100px">
                        <el-select v-model="region" placeholder="全部" style="width: 80px;">
                            <el-option label="全部" :value="0" :key="0"></el-option>
                            <el-option label="留学" :value="1" :key="1"></el-option>
                            <el-option label="语培" :value="2" :key="2"></el-option>
                            <el-option label="院校通道" :value="3" :key="3"></el-option>
                            <el-option label="移民" :value="4" :key="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="页面URL：" label-width="100px">
                        <el-input placeholder="请输入页面URL" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow1 = false">提 交</el-button>
            </span>
        </el-dialog>
        <!-- 编辑API -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">编辑API</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="API名称：" label-width="100px">
                        <el-input placeholder="请输入API名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="APIURL：" label-width="100px">
                        <el-input placeholder="请输入APIURL"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="渠道：" label-width="80px">
                        <el-input placeholder="请输入渠道" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="业务频道：" label-width="100px">
                        <el-input placeholder="请输入业务频道" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="页面名称：" label-width="100px">
                        <el-input placeholder="请输入页面名称" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="页面URL：" label-width="100px">
                        <el-input placeholder="请输入页面URL" disabled></el-input>
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
    onDisableClik () {
      this.isDialogShow1 = true
    },
    onDelClick () {
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
