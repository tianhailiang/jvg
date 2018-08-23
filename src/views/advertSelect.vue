<template>
  <section class="advert-select" style="overflow:hidden;max-width:1200px;">
      <el-row :gutter="20">
          <el-form class="demo-form-inline" label-width="80px" size="mini">
          <el-col :span="5">
            <div class="grid-content bg-purple">
                <el-form-item label="ID">
                    <el-input placeholder=""></el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="5">
              <div class="grid-content bg-purple">
                  <el-form-item label="名称">
                      <el-input placeholder=""></el-input>
                  </el-form-item>
              </div>
            </el-col>
          <el-col :span="5"><div class="grid-content bg-purple">
                    <el-form-item label="渠道">
                  <el-select placeholder="全部">
                      <el-option label="全部"  value="shanghai"></el-option>
                      <el-option label="APP" value="beijing"></el-option>
                      <el-option label="PC" value="beijing"></el-option>
                      <el-option label="WAP" value="beijing"></el-option>
                  </el-select>
              </el-form-item>
          </div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">
                    <el-form-item label="业务频道">
                  <el-select placeholder="全部">
                      <el-option label="全部"  value="shanghai"></el-option>
                      <el-option label="留学" value="beijing"></el-option>
                      <el-option label="语培" value="beijing"></el-option>
                      <el-option label="院校直通" value="beijing"></el-option>
                      <el-option label="移民" value="beijing"></el-option>
                  </el-select>
              </el-form-item>
          </div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">
              <el-form-item label="位置类型">
                  <el-select placeholder="全部">
                      <el-option label="全部"  value="shanghai"></el-option>
                      <el-option label="固定" value="beijing"></el-option>
                      <el-option label="列表" value="beijing"></el-option>
                      <el-option label="类目" value="beijing"></el-option>
                  </el-select>
              </el-form-item>
          </div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">
                <el-form-item label="广告类型">
                    <el-select placeholder="全部">
                        <el-option label="全部"  value="shanghai"></el-option>
                        <el-option label="轮播" value="beijing"></el-option>
                        <el-option label="单页" value="beijing"></el-option>
                    </el-select>
            </el-form-item>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">
            <el-form-item label="广告模板">
                <el-select placeholder="全部">
                    <el-option label="全部"  value="shanghai"></el-option>
                    <el-option label="留学首页" value="beijing"></el-option>
                    <el-option label="问答详情页" value="beijing"></el-option>
                </el-select>
        </el-form-item>
      </div>
    </el-col>
        <el-col :span="5"><div class="grid-content bg-purple">
            <el-form-item label="所有权">
                <el-select placeholder="全部">
                    <el-option label="全部"  value="shanghai"></el-option>
                    <el-option label="用户" value="beijing"></el-option>
                    <el-option label="平台" value="beijing"></el-option>
                </el-select>
        </el-form-item>
      </div></el-col>
      <div class="btn-planr">
          <el-button size="medium" type="primary">搜索</el-button>
      </div>
      </el-form>
    </el-row>
    <!--  -->
    <el-table :data="advertData" border>
        <el-table-column prop="id" width="120" label="NO"></el-table-column>
        <el-table-column prop="number" label="广告位ID" width="120"></el-table-column>
        <el-table-column prop="name1" label="广告位名称" width="120"></el-table-column>
        <el-table-column prop="name1" label="广告位类型" width="120"></el-table-column>
        <el-table-column prop="name1" label="广告位模板" width="120"></el-table-column>
        <el-table-column prop="name1" label="位置类型" width="120"></el-table-column>
        <el-table-column prop="name2" label="所有权" width="120"></el-table-column>
        <el-table-column prop="name4" label="创建时间" width="120"></el-table-column>
        <el-table-column prop="name5" label="渠道" width="120"></el-table-column>
        <el-table-column prop="name6" label="业务频道" width="120"></el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
                <el-button size="mini" type="danger">选择</el-button>
              </template>
            </el-table-column>
    </el-table>
    <div class="page-plane">
        <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
        <el-button size="small" type="primary">确定</el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'advertSelect',
  data () {
    return {
      advertData: [
        {id: '001', number: '1', name1: '测试'}
      ]
    }
  }
}
</script>
<style scoped>
.btn-planr{
  text-align: right;
  margin-right:50px;
  margin-top:20px;
}
.page-plane{
  margin-top:30px;
  display: flex;
  justify-content: center;
}
</style>
