<template>
  <section class="advert-container">
    <el-row :gutter="20">
      <el-form class="demo-form-inline" label-width="80px" size="mini">
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
              <el-select placeholder="全部">
                  <el-option label="全部"  value="shanghai"></el-option>
                  <el-option label="固定" value="beijing"></el-option>
                  <el-option label="列表" value="beijing"></el-option>
                  <el-option label="栏目" value="beijing"></el-option>
              </el-select>
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
                <el-form-item label="广告状态">
              <el-select placeholder="全部">
                  <el-option label="全部"  value="shanghai"></el-option>
                  <el-option label="使用中" value="beijing"></el-option>
                  <el-option label="未使用" value="beijing"></el-option>
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
    </el-form>
    </el-row>
    <!--  -->
    <el-row :gutter="20"  class="row-bg">
        <el-form class="demo-form-inline" label-width="80px" size="mini">
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
        <el-col :span="6"><div class="grid-content bg-purple">
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
      <div class="btn-planes">
        <el-row>
            <el-button type="primary" size="medium">搜索</el-button>
            <el-button type="primary" size="medium">创建广告位</el-button>
            <el-button type="primary" size="medium">一键替换</el-button>
          </el-row>
      </div>
      <el-table :data="tableData3">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="num" label="广告位ID" width="120"></el-table-column>
          <el-table-column prop="name" label="广告位名称" width="120"></el-table-column>
          <el-table-column prop="name" label="广告位模板" width="120"></el-table-column>
          <el-table-column prop="name" label="广告位类型" width="120"></el-table-column>
          <el-table-column prop="name" label="广告位状态" width="120"></el-table-column>
          <el-table-column prop="name" label="所有权" width="120"></el-table-column>
          <el-table-column prop="name" label="位置类型" width="120"></el-table-column>
          <el-table-column prop="name" label="创建时间" width="120"></el-table-column>
          <el-table-column prop="name" label="渠道" width="120"></el-table-column>
          <el-table-column prop="name" label="业务频道" width="120"></el-table-column>
          <el-table-column prop="address" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="openMadel">冻结</el-button>
                </template>
              </el-table-column>
          </el-table-column>
      </el-table>
      <div style="height:30px;"></div>
      <!-- 分页 -->
      <el-row :gutter="20">
          <el-col :span="9">
              <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
          </el-col>
          <el-col :span="9">
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
    name: 'advertList',
    data() {
      return {
        options:[
          {value: '选项1',label: '使用中'},
          {value: '选项2',label: '冻结'},
          {value: '选项3',label: '未使用'}
        ],
        options2:[
          {values: '选项1',label: '移民'},
          {values: '选项2',label: '语培'},
          {values: '选项3',label: '院校直通'},
          {values: '选项4',label: '留学'}
        ],
        tableData3:[
        {num:10000001,name:"留学首页轮播",name:"留学首页",
        name:"轮播",name:"使用中",name:"平台",
        name:"固定",name:"2018-08-12",name:"00:00:00",name:"PC"},
        {num:10000001,name:"留学首页轮播",name:"留学首页",
        name:"轮播",name:"使用中",name:"平台",
        name:"固定",name:"2018-08-12",name:"00:00:00",name:"PC"},
        {num:10000001,name:"留学首页轮播",name:"留学首页",
        name:"轮播",name:"使用中",name:"平台",
        name:"固定",name:"2018-08-12",name:"00:00:00",name:"PC"}
        ],
        value:"",
        values: ""
      }
    }
  }
</script>
<style>
  .advert-container .el-form-item__label{
    width:auto !important;
  }
</style>