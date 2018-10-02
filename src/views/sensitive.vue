<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">敏感词管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
              <el-form-item label="业务类型：" label-width="100px">
                  <el-select v-model="region" @change="choose(region)" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_category" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
              </el-form-item>
              <!-- <el-button size="small" type="primary" @click="onDisableClik(1)">追加业务类型</el-button> -->
              <el-button size="small" type="primary" @click="onEditClick(1)">追加敏感词</el-button>
        </el-form>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
        <el-table :data="tableData" stripe width="100%" border>
            <el-table-column prop="businessName" label="业务类型" align="center"></el-table-column>
            <el-table-column prop="keywordsList" label="敏感词" align="center"></el-table-column>
            <el-table-column width="250" label="操作" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-button @click="onDisableClik(scope.$index)" type="danger" size="small">编辑</el-button>
                    <el-button @click="onDelClick(scope.$index)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        </el-col>
        <!-- <div style="height:30px"></div>

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
        </el-col> -->
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认是否继续删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="onTijiao2">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑敏感词 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p style="font-size: 30px;">编辑敏感词</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled v-model="bianid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="业务名称：" label-width="100px">
                        <el-input placeholder="请输入业务名称" disabled v-model="bianye"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="业务说明：" label-width="100px">
                        <el-input placeholder="请输入业务说明" v-model="bianmin"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="onTijiao1">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 追加敏感词 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">追加敏感词</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled v-model="affairsid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="业务名称：" label-width="100px">
                        <el-input placeholder="请输入业务名称" disabled v-model="affairsname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="业务说明：" label-width="100px">
                        <el-input placeholder="请输入业务说明" disabled v-model="affairsmemo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="敏感词：" label-width="100px">
                        <el-input v-model="affairscon" type="textarea" placeholder="请录入敏感词" :rows="5" style="width: 400px"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow2 = false">取 消</el-button>
                <el-button type="primary" @click="onTijiao">提 交</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
import { codeAffairs,sensitiveList,sensitiveCreate,sensitiveCreateSensitive,sensitiveUpdate,sensitiveDelete } from '@/api/url.js'
import http from '../api/http.js';
export default {
  data () {
    return {
      region: [],
      choosenItem: [],
      option_category: [],
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      tableData: [],
      affairsid: '',
      affairsname: '',
      affairsmemo: '没有业务说明',
      affairscon: '',
      bianid: '',
      bianye: '',
      bianmin: ''
    }
  },
  methods: {
    choose (value) {
      this.choosenItem = this.option_category.filter(item => item.id === value)[0];
      console.log('choose', this.choosenItem)
    },
    onTijiao () {
        //追加敏感词
      var data = {'business': this.affairsid, 'keywordsList': this.affairscon}
      console.log('aaaaa', data)
      sensitiveCreateSensitive(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow2 = false
          window.location.reload()
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onTijiao1 () {
        //编辑敏感词
      var data = {'id': this.bianid, 'keywordsList': this.bianmin}
      sensitiveUpdate(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow1 = false
          window.location.reload()
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onTijiao2 () {
        //删除敏感词
      var data = {'id': this.bianid}
      sensitiveDelete(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow = false
          window.location.reload()
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onEditClick (index) { 
      if (this.choosenItem.id === undefined) {
        this.$message('请选择业务类型')
        return false
      }
      this.isDialogShow2 = true
      this.affairsid = this.choosenItem.id
      this.affairsname = this.choosenItem.name
      this.affairsmemo = this.choosenItem.memo
    },
    onDisableClik (index) {
      console.log('index', index)
      this.isDialogShow1 = true
      this.bianid = this.tableData[index].id
      this.bianye = this.tableData[index].businessName
      this.bianmin = this.tableData[index].keywordsList
    },
    onDelClick (index) {
      this.isDialogShow = true
      this.bianid = this.tableData[index].id
    },
    postData () {
      sensitiveList().then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    postAffairs () {
      codeAffairs().then(res => {
        console.log('data', res)
        if (res.success) {
          this.option_category = res.result
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    }
  },
  mounted () {
    this.postAffairs()
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
