<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">SEO管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
              <el-form-item label="频道：" label-width="80px">
                  <el-select v-model="region_pin" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_pin" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="网站描述：" >
                  <el-input placeholder="请输入网站描述" style="width: 700px"></el-input>
              </el-form-item>
              <el-button size="small" type="primary" @click="queryClik">搜索</el-button>
              <el-button size="small" type="primary" @click="onshowadd">追加关键词</el-button>
        </el-form>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
        <el-table :data="tableData" stripe width="100%" border>
            <el-table-column prop="channelName" label="频道" align="center"></el-table-column>
            <el-table-column prop="memo" label="说明" align="center"></el-table-column>
            <el-table-column prop="keyword" label="关键字" align="center"></el-table-column>
            <el-table-column width="250" label="操作" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-button @click="onEditClick(scope.$index)" type="danger" size="small">编辑</el-button>
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
                <el-button type="primary" @click="onDel">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加SEO关键词 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">添加SEO关键词</p>
            <el-form :inline="true" class="demo-form-inline" label-width="100px" size="small">
                <el-col :span="15">
                    <el-form-item label="关键字：" label-width="100px">
                        <el-input placeholder="请输入关键字" v-model="bianguan"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="关键字说明：" label-width="100px">
                        <el-input type="textarea" v-model="bianshuo" placeholder="请录入关键字说明" :rows="5" style="width: 400px"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow2 = false">取 消</el-button>
                <el-button type="primary" @click="onadd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑SEO关键字 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p style="font-size: 30px;">编辑SEO关键字</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled v-model="bianid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="频道名称：" label-width="100px">
                        <el-input placeholder="请输入频道名称" disabled v-model="bianming"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="关键字说明：" label-width="100px">
                        <el-input placeholder="请输入关键字说明" disabled v-model="bianshuo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="关键字：" label-width="100px">
                        <el-input type="textarea" v-model="bianguan" placeholder="请录入关键字" :rows="5" style="width: 400px"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="onEdit">提 交</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
import { seosList,seosUpdate,seosDelete,seosCreate,codeChannel } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      tableData: [],
      bianid: '',
      bianming: '',
      bianshuo: '',
      bianguan: '',
      region_pin: '',
      option_pin: []
    }
  },
  methods: {
    onshowadd () {
      // 显示追加SEO
      if (this.region_pin === '') {
        this.$message('请选择频道')
        return false
      }
      this.isDialogShow2 = true
    },
    onadd () {
      // 追加SEO
      var data = {'keyword': this.bianguan, 'memo': this.bianshuo, 'channel': this.region_pin}
      seosCreate(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow2 = false
          window.location.reload()
        } else {
          if (/system.seo.createSeo.already/.test(res.message)) {
            this.$message('一个频道只能有一个SEO')
          } else {
            this.$message(res.message)
          }
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onEditClick (index) {
      //显示SEO编辑框
      this.isDialogShow1 = true
      this.bianid = this.tableData[index].id
      this.bianming = this.tableData[index].channelName
      this.bianshuo = this.tableData[index].memo
      this.bianguan = this.tableData[index].keyword
    },
    onEdit () {
      //编辑SEO
      var data = {'id': this.bianid, 'keyword': this.bianguan}
      seosUpdate(data).then(res => {
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
    onDelClick (index) {
      // 显示删除框
      this.isDialogShow = true
      this.bianid = this.tableData[index].id
    },
    onDel () {
      //删除seo
      var data = {'id': this.bianid}
      seosDelete(data).then(res => {
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
    queryClik () {
      // 搜索按钮
      var data = {}
      seosList().then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    postData () {
      seosList().then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
      // 频道
      codeChannel().then(res => {
        console.log('data', res)
        if (res.success) {
          this.option_pin = res.result
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
