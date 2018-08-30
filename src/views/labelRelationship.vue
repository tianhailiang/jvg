<template>
    <div class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">标签关系</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
            <el-col :span="5">
              <el-form-item label="标签名称：" label-width="100px">
                  <el-input placeholder="请输入标签ID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="语种：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="中文" :value="1" :key="1"></el-option>
                      <el-option label="英语" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="频道：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="留学" :value="1" :key="1"></el-option>
                      <el-option label="语培" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="类别：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="课程" :value="1" :key="1"></el-option>
                      <el-option label="照片" :value="2" :key="2"></el-option>
                      <el-option label="文章" :value="3" :key="3"></el-option>
                      <el-option label="出版物" :value="4" :key="4"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
                <el-form-item>
                    <span style="width: 83px;font-size: 14px;color: #606266;float: left;line-height: 30px;text-align: right;padding-right: 12px;">创建时间：</span>
                    <el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button size="small" type="primary">搜索</el-button>
              <el-button size="small" type="primary">新建关系</el-button>
            </el-col>
        </el-form>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55"></el-table-column>
                <el-table-column prop="collegesId" label="一级类目" align="center"></el-table-column>
                <el-table-column prop="collegesName" label="二级类目" align="center"></el-table-column>
                <el-table-column prop="country" label="三级类目" align="center"></el-table-column>
                <el-table-column prop="phone" label="语种" align="center"></el-table-column>
                <el-table-column prop="userName" label="频道" align="center"></el-table-column>
                <el-table-column prop="category" label="类别" align="center"></el-table-column>
                <el-table-column prop="collegesNature" label="类型" align="center"></el-table-column>
                <el-table-column prop="registertime" label="创建时间" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
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
        </el-col>
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认是否继续删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 标签排序 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p class="personnel-title">标签关系编辑</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
                <el-col :span="10">
                    <el-form-item label="级别：" label-width="80px">
                        <el-input placeholder="请输入标签级别" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="标签名称：" label-width="100px">
                        <el-input placeholder="请输入标签名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="频道：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="中文" :value="1" :key="1"></el-option>
                      <el-option label="英语" :value="2" :key="2"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                <el-form-item label="类别：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="课程" :value="1" :key="1"></el-option>
                      <el-option label="照片" :value="2" :key="2"></el-option>
                      <el-option label="文章" :value="3" :key="3"></el-option>
                      <el-option label="出版物" :value="4" :key="4"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="10">
                <el-form-item label="类型：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="热搜" :value="1" :key="1"></el-option>
                      <el-option label="分类" :value="2" :key="2"></el-option>
                      <el-option label="特征" :value="3" :key="3"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" type="primary">搜索</el-button>
                </el-col>
            </el-form>
            <p style="font-size: 20px;">———————————————————————————————</p>
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="collegesId" label="标签名称" align="center"></el-table-column>
                <el-table-column width="250" label="下一级" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <el-button @click="onNext(scope.$index)" type="primary" size="small">二级</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-show="isTabShow">
            <p style="width: 83px;font-size: 14px;color: #606266;line-height: 30px;text-align: right;padding-right: 12px;">级别：二级</p>
            <el-table  :data="tableData" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55" align="center"></el-table-column>
                <el-table-column prop="collegesId" label="标签ID" align="center"></el-table-column>
                <el-table-column prop="collegesId" label="标签名称" align="center"></el-table-column>
                <el-table-column width="250" label="下一级" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <el-button @click="onNextThree(scope.$index)" type="primary" size="small">三级</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>
            <div v-show="isTabShow1">
            <p style="width: 83px;font-size: 14px;color: #606266;line-height: 30px;text-align: right;padding-right: 12px;">级别：三级</p>
            <el-table  :data="tableData" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55" align="center"></el-table-column>
                <el-table-column prop="collegesId" label="标签ID" align="center"></el-table-column>
                <el-table-column prop="collegesId" label="标签名称" align="center"></el-table-column>
                <el-table-column prop="collegesId" label="推荐状态" align="center"></el-table-column>
                <el-table-column prop="collegesId" label="推荐顺序" align="center" width="100">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入标签级别"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onNextThree(scope.$index)" type="primary" size="small">推荐</el-button>
                        <el-button @click="onNextThree(scope.$index)" type="primary" size="small">撤销</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow1 = false">确 定</el-button>
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
      isTabShow: false,
      isTabShow1: false,
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
    onNextThree (index) {
      this.isTabShow1 = true
    },
    onNext (index) {
      this.isTabShow = true
    },
    onEditClick (index) {
      this.isDialogShow1 = true
    },
    onDisableClik (index) {
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
