<template>
    <section class="publishinglist-tabel" style="overflow:hidden; padding-left:10px;">
      <el-row :gutter="20">
        <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
            <el-col :span="6">
                <el-form-item label="ID">
                    <el-input type="text" v-model="id"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="名称">
                    <el-input type="text" v-model="title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="好评度">
                    <el-col :span="10">
                        <el-input type="text" style="width: 100%;" v-model="raveFrom"></el-input>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="10">
                        <el-input type="text" style="width: 100%;" v-model="raveTo"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="讲师名称">
                    <el-input v-model="realName"></el-input>
                </el-form-item>
                <el-button size="small" type="primary" class="teacher">搜索</el-button>
            </el-col>
        </el-form>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData3" border v-loading="loading" element-loading-text="努力奔跑中...">
          <el-table-column type="selection"width="55" align="center">
            <template slot-scope="scope">
                <el-button size="mini" @click="openDeatail()">{{scope.$index + 1}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="出版物ID" align="center" width="80"></el-table-column>
          <el-table-column prop="title" label="出版物名称" align="center"></el-table-column>
          <el-table-column prop="realName" label="讲师名称" align="center"></el-table-column>
          <el-table-column prop="raveDegree" label="好评度" align="center"></el-table-column>
          <el-table-column prop="raveNumber" label="好评数" align="center"></el-table-column>
          <el-table-column prop="intermediateNumber" label="中评数" align="center"></el-table-column>
          <el-table-column prop="badNumber" label="差评" align="center"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="row-container">
          <el-pagination 
          background 
          layout="prev, pager, next, jumper" 
          :total="total"
          :page-size="20"></el-pagination>
          <el-button size="small" type="primary">确定</el-button>
      </div>
        <!-- 弹窗 -->
        <el-dialog title="出版物评论详情" :visible.sync="formVisible">
                    <el-row :gutter="20">
                        <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
                            <el-col :span="6">
                                <el-form-item label="出版物ID">
                                    <el-input type="text" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="讲师名称">
                                    <el-input type="text" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6" class="publish-name">
                                <el-form-item label="出版物名称">
                                    <el-input type="text" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="好评度">
                                    <el-input type="text" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </el-row>
                    <el-row :gutter="20">
                            <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
                                <el-col :span="6">
                                    <el-form-item label="评论内容">
                                        <el-input type="text"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="评论人">
                                        <el-input type="text"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="评论ID">
                                        <el-input type="text"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="评论时间">
                                        <el-input type="text"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="回复内容">
                                        <el-input type="text"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="回复时间">
                                        <el-input type="text"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="评论类型">
                                      <el-select v-model="value" placeholder="全部">
                                        <el-option 
                                        v-for="(item, index) in comment" 
                                        :label="item.label" 
                                        :value="item.value" 
                                        :key="index"></el-option>
                                      </el-select>
                                    </el-form-item>
                                </el-col>
                                  <el-button size="small" type="primary" style="margin-top:25px;">搜索</el-button>
                                  <div class="comment-total">
                                      <span>评论总数：<span class="comment-num">1000个</span></span>
                                  </div>
                            </el-form>
                          </el-row>
                    <!--  -->
                    <el-table :data="tableData4" border>
                        <el-table-column type="selection" width="45"></el-table-column>
                        <el-table-column prop="date" label="评论ID" width="105" align="center"></el-table-column>
                        <el-table-column prop="name" label="评论内容" width="105" align="center"></el-table-column>
                        <el-table-column prop="name" label="评论人" width="100" align="center"></el-table-column>
                        <el-table-column prop="name" label="评论时间" width="100" align="center"></el-table-column>
                        <el-table-column prop="name" label="评论渠道" width="100" align="center"></el-table-column>
                        <el-table-column prop="name" label="回复内容" width="105" align="center"></el-table-column>
                        <el-table-column prop="name" label="回复时间" width="105" align="center"></el-table-column>
                        <el-table-column prop="name" label="回复渠道" width="105" align="center"></el-table-column>
                        <el-table-column prop="name" label="评论类型" width="105" align="center"></el-table-column>
                        <el-table-column prop="address" label="操作" show-overflow-tooltip>
                            <template slot-scope="scope">
                            <el-button size="small" type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--  -->
                    <el-row :gutter="20" style="margin-top:20px;">
                            <el-col :span="11">
                                <el-pagination 
                                background 
                                layout="prev, pager, next, jumper" 
                                :total="100"></el-pagination>
                            </el-col>
                            <el-col :span="7">
                                <el-button size="small" type="primary">确定</el-button>
                            </el-col>
                            <el-col :span="5">
                                <el-button size="small" type="primary">批量删除</el-button>
                            </el-col>
                    </el-row>
        </el-dialog>
    </section>
  </template>
<script>
export default {
  name: 'publishingCommentList',
  data () {
    return {
      tableData3: [],
      options: [
        {label: '选项一',value: 'APP'},
        {label: '选项二',value: 'WAP'},
        {label: '选项三',value: 'PC'}
      ],
      comment: [
        {value: '选项一',label: '好评'},
        {value: '选项二',label: '中评'},
        {value: '选项三',label: '差评'}
      ],
      tableData4: [
        {date: '502', name: '张三', address: '删除'},
        {date: '502', name: '李四', address: '删除'},
        {date: '502', name: '王五', address: '删除'},
        {date: '502', name: '赵六', address: '删除'},
        {date: '502', name: '张三', address: '删除'}
      ],
      formVisible: false,
      id: '',
      title: '',
      raveFrom: 50,
      raveTo: 100,
      realName: '',
      pageNo: 2,
      pageSize: 20,
      value: '',
      loading: false,
      total: null
    }
  },
  created() {
    this.searchCommentList()
  },
  methods: {
      openDatilog (row) {
        this.formVisible = true
        this.row = row
      },
      searchCommentList() {
        this.loading = true
        axios.post(this.$store.state.api.searchCommentList, {
            //id:21,
            // "title": "测试",
            // "raveFrom": 50,
            // "raveTo": 100,
            // "userId": 1,
            // "pageNo": 2,
            // "pageSize": 20
        }).then(res => {
            this.total = res.data.result.total
            this.tableData3 = res.data.result.modelData
            this.loading = false
            console.log(res.data.result)
        }).catch(error => {

        })
    },
    openDeatail() {
        this.formVisible = true
    }
  }
}
</script>
<style>
.row-container{display: flex;justify-content:center; margin:30px 0;}
.comment-total{display: block;margin-left:18px;margin-top:15px;}
.teacher{ position: absolute; right:20px; top:32px;}
.link-span{cursor: pointer;display:block;color:#409EFF}
.publishinglist-tabel .publish-name .el-form-item .el-form-item__label{padding: 0;}
</style>
