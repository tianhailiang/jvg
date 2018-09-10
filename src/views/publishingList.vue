<template>
    <section class="publishinglist-tabel" style="overflow:hidden;margin-left:260px;">
      <el-row :gutter="20">
        <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
            <el-col :span="6">
                <el-form-item label="ID">
                    <el-input type="text"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="名称">
                    <el-input type="text"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="课程分类">
                    <el-select v-model="course">
                        <el-option 
                        :label="item.label"  
                        :value="item.value"
                        v-for="(item, index) in coursedata"></el-option>
                      </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="类型">
                    <el-select v-model="typesval">
                        <el-option 
                        :label="items.label"
                        :value="items.value"
                        v-for="(items, index) in types"></el-option>
                      </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="讲师名称">
                    <el-input placeholder="讲师名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="销售状态">
                    <el-select v-model="xsvalue">
                        <el-option 
                        :label="items.label"
                        :value="items.value"
                        v-for="(items, index) in xsdata"></el-option>
                      </el-select>
                </el-form-item>
            </el-col>
            <el-button size="small" type="primary" style="margin-top:26px;">搜索</el-button>
        </el-form>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" border ref="tableCont" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="45"></el-table-column>
          <el-table-column prop="id" label="出版物ID" width="100" align="center"></el-table-column>
          <el-table-column prop="name" label="出版物名称" width="100" align="center"></el-table-column>
          <el-table-column prop="name" label="出版物介绍" width="100" align="center"></el-table-column>
          <el-table-column prop="name" label="讲师名称" width="100" align="center"></el-table-column>
          <el-table-column prop="name" label="频道" width="100" align="center"></el-table-column>
          <el-table-column prop="type" label="分类" width="80" align="center"></el-table-column>
          <el-table-column prop="name" label="类型" width="90" align="center"></el-table-column>
          <el-table-column prop="name" label="价格" width="90" align="center"></el-table-column>
          <el-table-column prop="name" label="创建时间" width="95" align="center"></el-table-column>
          <el-table-column prop="active" label="销售状态" width="95" align="center"></el-table-column>
          <el-table-column prop="address" label="操作" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="openMadel">冻结</el-button>
                </template>
          </el-table-column>
      </el-table>
      <div style="height:30px"></div>
      <!-- 分页 -->
      <el-row :gutter="20">
          <el-col :span="11">
              <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
          </el-col>
          <el-col :span="7">
              <el-button size="small" type="primary">确定</el-button>
          </el-col>
          <el-col :span="5">
              <el-button size="small" type="primary" @click="clearAll">批量删除</el-button>
              <el-button size="small" type="primary" @click="dialogVisible = true">批量冻结</el-button>
          </el-col>
      </el-row>
      <!-- 删除提示窗口 -->
      <el-dialog title="删除提示窗口" :visible.sync="dialogVisible" width="30%">
          <span>请确认是否继续删除？</span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
      </el-dialog>
        <!-- 冻结编辑窗口 -->
        <el-dialog title="冻结编辑提示窗口" :visible.sync="dialogVisible" width="30%">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="ID">
                  <el-input type="text" size="mini" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="出版物名称">
                    <el-input type="text" size="mini" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="发布用户名">
                    <el-input type="text" size="mini" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="冻结原因">
                  <el-input type="textarea" size="mini"></el-input>
                </el-form-item>
            </el-form>
            <span>提示：冻结后该出版物在前端无法显示</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </section>
  </template>
<script>
export default {
  name: 'publishingList',
  data () {
    return {
      tableData: [
        {id: '01', name: '张三', type: '托福', address: '冻结', active: '冻结'},
        {id: '02', name: '王小虎', type: '托福', address: '冻结', active: '冻结'},
        {id: '03', name: '李四', type: '托福', address: '冻结', active: '冻结'},
        {id: '04', name: '王小虎', type: '托福', address: '冻结', active: '冻结'},
        {id: '05', name: '赵六', type: '托福', address: '冻结', active: '冻结'}
      ],
      dialogVisible: false,
      xsvalue: '',
      typesval: '',
      course: '',
      xsdata: [
          {label: '全部', value: '选项1'},
          {label: '已上架', value: '选项2'},
          {label: '已下架', value: '选项3'},
          {label: '冻结', value: '选项4'}
      ],
      types: [
          {label: '全部', value: '选项1'},
          {label: '实体', value: '选项2'},
          {label: '数字', value: '选项3'}
      ],
      coursedata: [
          {label: '全部', value: '选项1'},
          {label: '托福', value: '选项2'},
          {label: 'GRE', value: '选项3'}
      ],
      multipleSelection: []
    }
  },
  methods: {
    openMadel () {
      this.$confirm('请确认是否继续删除', '删除提示窗口', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSelectionChange (val) {
        this.multipleSelection = val
    },
    clearAll () {
      this.multipleSelection.forEach((el) => {
        
      })
    }
  }
}
</script>
