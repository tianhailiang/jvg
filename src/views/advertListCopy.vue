<template>
    <section class="advert-container" style="overflow:hidden;max-width:1200px;">
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
                    <el-select placeholder="全部">
                        <el-option label="全部"  value="shanghai"></el-option>
                        <el-option label="单页" value="beijing"></el-option>
                        <el-option label="轮播" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="状态">
                    <el-select placeholder="全部">
                        <el-option label="全部"  value="shanghai"></el-option>
                        <el-option label="使用中" value="beijing"></el-option>
                        <el-option label="已过期" value="beijing"></el-option>
                        <el-option label="冻结" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="所有权">
                    <el-select placeholder="全部">
                        <el-option label="全部"  value="shanghai"></el-option>
                        <el-option label="平台" value="beijing"></el-option>
                        <el-option label="用户" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6">
                <div class="grid-content bg_purple">
                    <el-form-item label="购买人名称">
                        <el-input placeholder=""></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="联系方式">
                        <el-input placeholder=""></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="渠道">
                        <el-select placeholder="全部">
                            <el-option label="全部"  value="shanghai"></el-option>
                            <el-option label="APP" value="beijing"></el-option>
                            <el-option label="PC" value="beijing"></el-option>
                            <el-option label="WAP" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">
                        <el-form-item label="业务频道">
                            <el-select placeholder="全部" v-model="values">
                                <el-option
                                v-for="items in options2"
                                :key="items.values"
                                :label="items.label"
                                :value="items.values">
                              </el-option>
                            </el-select>
                        </el-form-item>
                    </div></el-col>
                    <el-col :span="7"><div class="grid-content bg-purple advert_purple">
                            <el-form-item label="广告位模板">
                                <el-select placeholder="全部" v-model="value">
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
      <!--  -->
       <el-row :gutter="20" class="row-bg">
          <el-form class="demo-form-inline" label-width="80px" size="mini">
          <div class="btn-planes">
              <el-row>
                  <el-button type="primary" size="medium">搜索</el-button>
                  <el-button type="primary" size="medium">添加广告</el-button>
              </el-row>
            </div>
        </el-form>
        </el-row>
        <el-table :data="tableData3" border>
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column prop="num" label="广告位ID" width="90"></el-table-column>
            <el-table-column prop="name1" label="广告名称" width="90"></el-table-column>
            <el-table-column prop="name1" label="广告位模板" width="110"></el-table-column>
            <el-table-column prop="name1" label="广告位类型" width="110"></el-table-column>
            <el-table-column prop="name2" label="所有权" width="90"></el-table-column>
            <el-table-column prop="name3" label="开始时间" width="100"></el-table-column>
            <el-table-column prop="name4" label="结束时间" width="100"></el-table-column>
            <el-table-column prop="name5" label="渠道" width="90"></el-table-column>
            <el-table-column prop="name6" label="业务频道" width="90"></el-table-column>
            <el-table-column prop="name7" label="状态" width="100"></el-table-column>
            <el-table-column prop="name8" label="购买人名称" width="100"></el-table-column>
            <el-table-column prop="name9" label="购买人" width="80"></el-table-column>
            <el-table-column prop="address" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button size="mini" type="danger">冻结</el-button>
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
            <el-col :span="5">
                <el-button size="small" type="primary">批量删除</el-button>
                <el-button size="small" type="primary" @click="dialogVisible = true">批量冻结</el-button>
            </el-col>
        </el-row>
    </section>
  </template>
<script>
export default {
  name: 'advertListCopy',
  data () {
    return {
      options: [
        {value: '选项1', label: '使用中'},
        {value: '选项2', label: '冻结'},
        {value: '选项3', label: '未使用'}
      ],
      options2: [
        {values: '选项1', label: '移民'},
        {values: '选项2', label: '语培'},
        {values: '选项3', label: '院校直通'},
        {values: '选项4', label: '留学'}
      ],
      tableData3: [
        {num: 10001, name1: '留学首页', name2: '留学首页', name3: '轮播', name4: '使用中', name5: '平台', name6: '固定', name7: '2018-08-12', name8: '00:00:00', name9: 'PC'}],
      value: '',
      values: ''
    }
  }
}
</script>
<style scoped>
  .advert-container .bg_purple .el-input--mini{position: absolute;}
  .advert-container .bg_purple .el-form-item__label{
    width:auto !important;
  }
  .btn-planes{
    margin-bottom: 20px;
    text-align: right;
    padding-right:100px;
  }
</style>
