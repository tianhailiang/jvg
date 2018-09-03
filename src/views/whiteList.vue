<template>
    <div class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">白名单管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
            <el-col :span="5">
              <el-form-item label="白名单ID：" label-width="100px">
                  <el-input placeholder="请输入白名单ID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="白名单内容：" label-width="100px">
                  <el-input placeholder="请输入白名单内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="白名单分类：" label-width="100px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="广告" :value="1" :key="1"></el-option>
                      <el-option label="宣传" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="审核状态：" label-width="100px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="待审核" :value="1" :key="1"></el-option>
                      <el-option label="通过" :value="2" :key="2"></el-option>
                      <el-option label="不通过" :value="3" :key="3"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="状态：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="正常" :value="1" :key="1"></el-option>
                      <el-option label="冻结" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item>
                    <span style="width: 83px;font-size: 14px;color: #606266;float: left;line-height: 30px;text-align: right;padding-right: 12px;">创建时间：</span>
                    <el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" style="float: left;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button size="small" type="primary" @click="onDisableClik">添加</el-button>
              <el-button size="small" type="primary">搜索</el-button>
              <el-button size="small" type="primary" @click="onDelClick">一键清除</el-button>
            </el-col>
        </el-form>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column prop="collegesId" label="白名单ID" align="center"></el-table-column>
                <el-table-column prop="collegesName" label="白名单内容" align="center"></el-table-column>
                <el-table-column prop="country" label="白名单说明" align="center"></el-table-column>
                <el-table-column prop="phone" label="白名单分类" align="center"></el-table-column>
                <el-table-column prop="userName" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="category" label="创建人" align="center"></el-table-column>
                <el-table-column prop="collegesNature" label="状态" align="center"></el-table-column>
                <el-table-column prop="state" label="审核状态" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small">编辑</el-button>
                        <el-button @click="onDisableClik" type="danger" size="small">冻结</el-button>
                        <el-button @click="onTong" type="danger" size="small">通过</el-button>
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
        </el-col>
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认是否继续删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 白名单添加 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p style="font-size: 30px;">白名单添加</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="白名单内容：" label-width="100px">
                        <el-input placeholder="请输入白名单内容"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="白名单分类：" label-width="100px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="广告" :value="1" :key="1"></el-option>
                      <el-option label="宣传" :value="2" :key="2"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow1 = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 白名单编辑 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">白名单编辑</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="白名单内容：" label-width="100px">
                        <el-input placeholder="请输入白名单内容" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="白名单分类：" label-width="100px">
                    <el-input placeholder="请输入白名单内容" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="状态：" label-width="80px">
                    <el-input placeholder="请输入白名单内容" disabled></el-input>
                  </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow2 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow2 = false">冻 结</el-button>
            </span>
        </el-dialog>
        <!-- 白名单审核 -->
        <el-dialog v-model="isDialogShow3" size="small" :visible.sync="isDialogShow3">
            <p style="font-size: 30px;">白名单编辑</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="白名单内容：" label-width="100px">
                        <el-input placeholder="请输入白名单内容" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="白名单分类：" label-width="100px">
                    <el-input placeholder="请输入白名单内容" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="状态：" label-width="80px">
                    <el-input placeholder="请输入白名单内容" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="不通过原因：" label-width="100px">
                        <el-input type="textarea" placeholder="请录入不通过原因" :rows="5" style="width: 400px"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow3 = false">通 过</el-button>
                <el-button type="primary" @click="isDialogShow3 = false">不 通 过</el-button>
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
      isDialogShow3: false,
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
    onEditClick () {
      this.isDialogShow1 = true
    },
    onTong () {
      this.isDialogShow3 = true
    },
    onDisableClik (index) {
      this.isDialogShow2 = true
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
