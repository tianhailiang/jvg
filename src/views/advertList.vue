<template>
  <section class="advert-container" style="overflow:hidden;">
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
      <el-col :span="8"><div class="grid-content bg-purple">
          <el-form-item label="位置类型">
              <el-select placeholder="全部" v-model="values4">
                  <el-option 
                  v-for="items in areatype"
                  :key="items.value"
                  :label="items.label"
                  :value="items.value"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="广告类型">
              <el-select placeholder="全部" v-model="values3">
                  <el-option 
                  v-for="items in adverttypes"
                  :key="items.value"
                  :label="items.label"
                  :value="items.value"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="广告状态">
              <el-select v-model="advertval">
                  <el-option
                  :label="items.label"
                  :value="items.value"
                  :key="index" v-for="(items, index) in advertoption"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
          <el-form-item label="所有权">
              <el-select placeholder="全部" v-model="values2">
                  <el-option 
                  v-for="items in options4"
                  :key="items.value"
                  :label="items.label"
                  :value="items.value"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
    </el-form>
    </el-row>
    <!--  -->
    <el-row :gutter="20"  class="row-bg">
        <el-form class="demo-form-inline" label-width="80px" size="small">
        <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="渠道">
                <el-select placeholder="全部" v-model="values1">
                    <el-option
                    v-for="items in options3"
                    :key="items.value"
                    :label="items.label"
                    :value="items.value"></el-option>
                </el-select>
            </el-form-item>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light">
            <el-form-item label="业务频道">
                <el-select placeholder="全部" v-model="values">
                    <el-option
                    v-for="(items, index) in options2"
                    :key="index"
                    :label="items.label"
                    :value="items.value">
                  </el-option>
                </el-select>
            </el-form-item>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="广告位模板">
                <el-select placeholder="全部" v-model="value5">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
        </div></el-col>
      </el-form>
      </el-row>
      <div class="btn-planes">
        <el-row>
            <el-button type="primary" size="medium">搜索</el-button>
            <el-button type="primary" size="medium">创建广告位</el-button>
            <el-button type="primary" size="medium" @click="isShow = true">一键替换</el-button>
          </el-row>
      </div>
      <el-table :data="tableData3" style="width: 100%" border>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="num" label="广告位ID" width="120" align="center"></el-table-column>
          <el-table-column prop="name1" label="广告位名称" width="120" align="center"></el-table-column>
          <el-table-column prop="name2" label="广告位模板" width="120" align="center"></el-table-column>
          <el-table-column prop="name3" label="广告位类型" width="120" align="center"></el-table-column>
          <el-table-column prop="name4" label="广告位状态" width="120" align="center"></el-table-column>
          <el-table-column prop="name5" label="所有权" width="120" align="center"></el-table-column>
          <el-table-column prop="name6" label="位置类型" width="120" align="center"></el-table-column>
          <el-table-column prop="name7" label="创建时间" width="120" align="center"></el-table-column>
          <el-table-column prop="name8" label="渠道" width="120" align="center"></el-table-column>
          <el-table-column prop="name9" label="业务频道" width="120" align="center"></el-table-column>
          <el-table-column prop="address" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="dialogVisible = true">冻结</el-button>
                </template>
          </el-table-column>
      </el-table>
      <div style="height:30px;"></div>
      <!-- 分页 -->
      <el-row :gutter="20">
          <el-col :span="11">
              <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
          </el-col>
          <el-col :span="5">
              <el-button size="small" type="primary">确定</el-button>
          </el-col>
          <el-col :span="5">
              <el-button size="small" type="primary">批量删除</el-button>
              <el-button size="small" type="primary">批量冻结</el-button>
          </el-col>
      </el-row>
      <!-- 删除模态框 -->
      <el-dialog title="删除提示窗口" :visible.sync="dialogVisible" width="30%">
            <span>请确认是否继续删除</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 一键替换 -->
        <el-dialog title="一键替换" :visible.sync="isShow">
            <el-row :gutter="20">
                <el-form label-width="80px">
                <el-col :span="8"><div class="grid-content bg-purple">
                    <el-form-item label="开始时间">
                        <el-input type="text" size="small"></el-input>
                    </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                    <el-form-item label="结束时间">
                        <el-input type="text" size="small"></el-input>
                    </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                    <el-form-item label="">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="自动定时替换" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                    <el-form-item label="所有权">
                        <el-select size="small" v-model="syvalue">
                            <el-option 
                            :label="item.label"
                            :value="item.value"
                            :key="index" v-for="(item, index) in totaleval"></el-option>
                        </el-select>
                    </el-form-item>
                
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                        <div class="grid-content bg-purple">
                            <el-form-item label="业务频道" >
                                <el-select size="small" v-model="ywvalue">
                                    <el-option 
                                    :label="items.label"
                                    :value="items.value"
                                    :key="index" v-for="(items, index) in options2"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                </div></el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purole">
                        <el-form-item label="广告模板">
                            <el-select size="small" v-model="advertdefalutVal">
                                <el-option 
                                :label="items.label"
                                :value="items.value"
                                :key="index"
                                v-for="(items, index) in options6"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="渠道">
                            <el-select size="small" v-model="defalutVal">
                                <el-option 
                                    :label="items.label"
                                    :value="items.value"
                                    :key="index"
                                    v-for="(items, index) in options5"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                </el-form>
            </el-row>
            <div class="dialog-content">
                <div class="dialog-main_1">
                    <h3>替换内容</h3>
                    <el-form label-width="80px">
                    <el-row :gutter="20">
                        <el-col :span="15">
                            <el-form-item label="">
                                <el-input type="text" placeholder="URL" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="15">
                            <el-form-item label="">
                                    <el-input type="text" size="small" placeholder="图片"></el-input>
                                    <el-upload class="upload-demo upload-btn uploade-cust">
                                        <el-button size="small" type="primary">上传</el-button>
                                    </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="isShow = false">取 消</el-button>
              <el-button type="primary" @click="isShow = false">确认替换</el-button>
            </div>
        </el-dialog>
  </section>
</template>
<script>
export default {
  name: 'advertList',
  data () {
    return {
      options: [
        {value: '选项1', label: '使用中'},
        {value: '选项2', label: '冻结'},
        {value: '选项3', label: '未使用'},
        {value: '选项4', label: '全部'}
      ],
      options: [
        {value: '选项1', label: '问答详情'},
        {value: '选项2', label: '留学首页'},
        {value: '选项3', label: '全部'}
      ],
      advertoption: [
      {value: '选项1', label: '使用中'},
      {value: '选项2', label: '冻结'},
      {value: '选项3', label: '未使用'},
      {value: '选项4', label: '全部'}
      ],
      options2: [
        {value: '选项1', label: '全部'},
        {value: '选项2', label: '移民'},
        {value: '选项3', label: '语培'},
        {value: '选项4', label: '院校直通'},
        {value: '选项5', label: '留学'}
      ],
      options3: [
        {value: '选项1', label: '全部'},
        {value: '选项2', label: 'PC'},
        {value: '选项3', label: 'APP'},
        {value: '选项4', label: 'WAP'}
      ],
      options4: [
        {value: '选项1', label: '全部'},
        {value: '选项2', label: '用户'},
        {value: '选项3', label: '平台'}
      ],
      options5: [
        {label: "全部", value: '选项4'},
        {label: "PC", value: '选项1'},
        {label: "WAP", value: '选项2'},
        {label: "APP", value: '选项3'}
      ],
      totaleval: [
        {label: '全部', value:'选项1'},
        {label: '用户', value:'选项2'},
        {label: '平台', value:'选项3'}
      ],
      adverttypes: [
        {label: '轮播', value:'选项1'},
        {label: '单页', value:'选项2'},
        {label: '全部', value:'选项3'}
      ],
      areatype: [
        {label: '列表', value:'选项1'},
        {label: '固定', value:'选项2'},
        {label: '全部', value:'选项3'},
        {label: '类目', value:'选项4'}
      ],
      advertdefalutVal: '',
      tableData3: [
        {num: 10000001, name1: '留学首页轮播', name2: '留学首页', name3: '轮播', name4: '使用中', name5: '平台', name6: '固定', name7: '2018-08-12', name8: '00:00:00', name9: 'PC'}],
      value: '',
      values: '',
      values3: '',
      values4: '',
      values2: '',
      values1: '',
      value5: '',
      dialogVisible: false,
      isShow: false,
      defalutVal: '',
      advertval: '',
      ywvalue: '',
      syvalue: '',
      options6: [
        {label: '全部', value: '选项1'},
        {label: '留学首页', value: '选项2'},
        {label: '问答详情页', value: '选3'}
      ],
      form: {
          type:[]
      }
    }
  }
}
</script>
<style scoped>
.advert-container .btn-planes{
  margin-bottom: 20px;
  margin-left:20px;
}
.dialog-content .uploade-cust{
    position: absolute;
    right: 0;
    top: 0;
}
.dialog-main_2 h3{
    margin-bottom: 15px;
}
</style>
