<template>
  <section class="advert-review-content" style="overflow:hidden;margin-left:260px;">
    <el-row :gutter="20">
      <el-form class="demo-form-inline" label-width="80px" size="small">
      <el-col :span="6">
        <div class="grid-content bg-purple">
            <el-form-item label="ID">
                <el-input placeholder=""></el-input>
            </el-form-item>
        </div>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
          <el-form-item label="名称">
              <el-input placeholder=""></el-input>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="广告类型">
              <el-select v-model="value">
                  <el-option
                  :label="item.label"
                  :value="item.value" v-for="(item, index) in adverttype"></el-option>
              </el-select>
            </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="审核状态">
              <el-select v-model="val3">
                  <el-option 
                  :label="item.label"  
                  :value="item.value" v-for="(item, index) in shenhe"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
          <el-form-item label="所有权">
              <el-select v-model="totalval">
                  <el-option 
                  :label="item.label"  
                  :value="item.value" v-for="(item, index) in total"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-form-item label="购买人名称">
          <el-input type="text"></el-input>
        </el-form-item>
    </div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">
      <el-form-item label="联系方式">
        <el-input type="text"></el-input>
      </el-form-item>
  </div></el-col>
    </el-form>
    </el-row>
    <el-row :gutter="20"  class="row-bg">
      <el-form class="demo-form-inline" label-width="80px" size="small">
      <el-col :span="6"><div class="grid-content bg-purple">
          <el-form-item label="渠道">
              <el-select v-model="qudaoVal">
                  <el-option :label="item.label"  :value="item.value" v-for="(item, index) in qudao"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">
          <el-form-item label="业务频道">
              <el-select placeholder="全部" v-model="val">
                  <el-option
                    v-for="items in options2"
                    :key="items.value"
                    :label="items.label"
                    :value="items.value">
                  </el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
          <el-form-item label="广告模板">
              <el-select v-model="value2">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-button size="small" type="primary">搜索</el-button>
    </div></el-col>
    </el-form>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData3" border>
      <el-table-column type="selection" width="66"></el-table-column>
      <el-table-column prop="name" label="广告位ID" width="100" align="center"></el-table-column>
      <el-table-column prop="name" label="广告名称" width="110" align="center"></el-table-column>
      <el-table-column prop="name" label="广告位模板" width="110" align="center"></el-table-column>
      <el-table-column prop="name" label="广告位类型" width="110" align="center"></el-table-column>
      <el-table-column prop="name" label="所有权" width="60" align="center"></el-table-column>
      <el-table-column prop="name" label="开始时间" width="110" align="center"></el-table-column>
      <el-table-column prop="name" label="结束时间" width="110" align="center"></el-table-column>
      <el-table-column prop="name" label="渠道" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="业务频道" width="110" align="center"></el-table-column>
      <el-table-column prop="name" label="审核状态" width="100" align="center"></el-table-column>
      <el-table-column prop="name" label="销售方" width="110" align="center"></el-table-column>
      <el-table-column prop="name" label="购买方" width="110" align="center"></el-table-column>
      <el-table-column prop="address" align="center" label="操作" show-overflow-tooltip width="150">
          <template slot-scope="scope">
              <el-button size="small" type="danger" @click="dialogVisible = true">不通过</el-button>
              <el-button size="small" type="danger">通过</el-button>
            </template>
      </el-table-column>
   </el-table>
   <div style="height:30px;"></div>
   <!-- 分页 -->
    <el-row :gutter="20">
      <el-col :span="11">
          <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
      </el-col>
      <el-col :span="6">
          <el-button size="small" type="primary">确定</el-button>
      </el-col>
      <el-col :span="6">
          <el-button size="small" type="primary">批量删除</el-button>
          <el-button size="small" type="primary">批量通过</el-button>
      </el-col>
    </el-row>
    <el-dialog title="不通过编辑提示窗口" :visible.sync="dialogVisible" width="30%">
        <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="广告ID">
            <el-input type="text" size="small" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="广告名称">
                <el-input type="text" size="small" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="创建用户">
                <el-input type="text" size="small" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="原因">
            <el-input type="textarea" size="small"></el-input>
            </el-form-item>
        </el-form>
        <span>提示：用户重新申请审核</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </section>
</template>
<script>
export default {
  name: 'advertReview',
  data () {
    return {
      options: [
        {value: '选项1', label: '留学首页'},
        {value: '选项2', label: '问答详情页'}
      ],
      options2: [
        {value: '选项1', label: '留学'},
        {value: '选项2', label: '语培'},
        {value: '选项3', label: '院校直通'},
        {value: '选项4', label: '移民'}
      ],
      value: '',
      val: '',
      value2: '',
      qudaoVal: '',
      dialogVisible: false,
      totalval: '',
      tableData3: [
        {name: '测试'}],
      adverttype: [
        {value: '选项1', label: '单页'},
        {value: '选项2', label: '轮播'},
        {value: '选项3', label: '全部'}
      ],
      val3: '',
      total:[
        {value: '选项1', label: '全部'},
        {value: '选项2', label: '平台'},
        {value: '选项3', label: '用户'}
      ],
      shenhe: [
        {value: '选项1', label: '通过'},
        {value: '选项2', label: '待审核'},
        {value: '选项3', label: '不通过'}
      ],
      qudao: [
        {value: '选项1', label: '全部'},
        {value: '选项2', label: 'WAP'},
        {value: '选项3', label: 'APP'},
        {value: '选项4', label: 'PC'}
      ]
    }
  }
}
</script>
<style>
.advert-review-content .el-form-item .el-form-item__label{
  min-width:80px !important;
}
</style>
