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
            <el-col :span="4">
              <el-form-item label="语种：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="中文" :value="1" :key="1"></el-option>
                      <el-option label="英语" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="频道：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="留学" :value="1" :key="1"></el-option>
                      <el-option label="语培" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
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
            <el-col :span="11">
                <el-form-item>
                    <span style="width: 83px;font-size: 14px;color: #606266;float: left;line-height: 30px;text-align: right;padding-right: 12px;">创建时间：</span>
                    <el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" style="float: left;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button size="small" type="primary">搜索</el-button>
              <el-button size="small" type="primary" @click="onDisableClik">新建关系</el-button>
            </el-col>
        </el-form>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55"></el-table-column>
                <el-table-column label="一级类目" align="center">
                    <template slot-scope="scope">
                        <el-button @click="onDisableClik" type="text" size="small">{{scope.row.firstName}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="secondName" label="二级类目" align="center"></el-table-column>
                <el-table-column prop="thirdName" label="三级类目" align="center"></el-table-column>
                <el-table-column prop="languagesName" label="语种" align="center"></el-table-column>
                <el-table-column prop="professionName" label="频道" align="center"></el-table-column>
                <el-table-column prop="type" label="类别" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.type == 1">课程</div>
                        <div v-if="scope.row.type == 2">照片</div>
                        <div v-if="scope.row.type == 3">文章</div>
                        <div v-if="scope.row.type == 4">出版物</div>
                        <div v-if="scope.row.type == 5">圈子</div>
                        <div v-if="scope.row.type == 6">问答</div>
                        <div v-if="scope.row.type == 7">讲师标签</div>
                        <div v-if="scope.row.type == 8">院校</div>
                        <div v-if="scope.row.type == 9">话题</div>
                    </template>
                </el-table-column>
                <el-table-column prop="collegesNature" label="类型" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onDelClick" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- </div> -->
        </el-col>
        <!-- 分页 -->
        <el-col :span='18' style="float: right;margin-right: 100px;">
        <el-row :gutter="20" v-if="tableData.length" class="pagina-tion">
        <el-col :span="11">
            <el-pagination background layout="prev, pager, next, jumper" 
            :total="total"
            :page-size="20"></el-pagination>
        </el-col>
        <el-col :span="8">
            <el-button size="small" type="primary">确定</el-button>
        </el-col>
        <el-col :span="5">
            <el-button size="small" type="primary" @click="">批量删除</el-button>
            <!-- <el-button size="small" type="primary" @click="dialogVisible = true">批量冻结</el-button> -->
        </el-col>
        </el-row>
        </el-col>
        <!-- 分页end -->
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认是否继续删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 标签关系编辑 -->
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
                <el-table-column label="操作" align="center" fixed="right" width="200">
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
import { labelRelationshipList,labelShipDelete,labelRecommendationOrCancellation,labelLevelOneList,labelLevelOneToThirdList,labelRelationship } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      isDialogShow: false,
      isDialogShow1: false,
      isTabShow: false,
      isTabShow1: false,
      tableData: []
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
    onDisableClik () {
      this.isDialogShow1 = true
    },
    onDelClick () {
      this.isDialogShow = true
    },
    postData () {
      labelRelationshipList().then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result.modelData
          this.total = res.result.total
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    }
  },
  mounted () {
    this.postData()
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
