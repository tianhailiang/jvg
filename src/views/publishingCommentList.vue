<template>
    <section class="publishinglist-tabel">
      <el-row :gutter="20">
        <el-form :inline="true" class="demo-form-inline" label-width="80px" size="mini">
            <el-col :span="5">
                <el-form-item label="ID">
                    <el-input type="text"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="名称">
                    <el-input type="text"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="好评度">
                    <el-col :span="6">
                        <el-input type="text" style="width: 100%;"></el-input>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="6">
                        <el-input type="text" style="width: 100%;"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="讲师名称">
                    <el-input placeholder="讲师名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="2">
                <el-button size="small" type="primary">搜索</el-button>
            </el-col>
        </el-form>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData3" border>
          <el-table-column prop="date" label="出版物ID"></el-table-column>
          <el-table-column prop="name" label="出版物名称"></el-table-column>
          <el-table-column prop="name" label="讲师名称"></el-table-column>
          <el-table-column prop="name" label="好评度"></el-table-column>
          <el-table-column prop="name" label="好评数"></el-table-column>
          <el-table-column prop="name" label="中评数"></el-table-column>
          <el-table-column prop="active" label="差评"></el-table-column>    
      </el-table>
      <div style="height:30px"></div>
      <!-- 分页 -->
      <div class="row-container">
          <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
          <el-button size="small" type="primary">确定</el-button>
      </div>
    </section>
  </template>
  <script>
    export default {
      name:'courseList',
      data () {
          return {
              tableData3:[{
                  date: '2016-05-02',
                  name: '王小虎',
                  type: '托福',
                  address: '冻结',
                  active: '冻结'
              },{
                  date: '2016-05-02',
                  name: '王小虎',
                  type: '托福',
                  address: '冻结',
                  active:'已下架'
              }]
          }
      }
    }
  </script>
  <style>
    .row-container{
      display: flex;
      justify-content:center;
    }
    .publishinglist-tabel .el-form--inline .el-form-item__content{
      position:absolute !important;
    }
  </style>