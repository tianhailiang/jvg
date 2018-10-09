<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">标签热度列表</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
              <el-form-item label="标签ID：" label-width="80px">
                  <el-input placeholder="请输入标签ID" v-model="qu_id"></el-input>
              </el-form-item>
              <el-form-item label="语种：" label-width="80px">
                  <el-select v-model="region_yu_qu" @change="choose(region_yu_qu)" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_yu" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="频道：" label-width="80px">
                  <el-select v-model="region_pin_qu" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_pin" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="类别：" label-width="80px">
                  <el-select v-model="region_bie_qu" @change="choose1(region_bie_qu)" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_bie" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="类型：" label-width="80px">
                  <el-select v-model="region_xing_qu" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_xing" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
                <el-form-item>
                    <span style="width: 83px;font-size: 14px;color: #606266;float: left;line-height: 30px;text-align: right;padding-right: 12px;">创建时间：</span>
                    <el-date-picker v-model="dataTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" style="float: left;"></el-date-picker>
                </el-form-item>
              <el-button size="small" type="primary" @click="queryClik">搜索</el-button>
        </el-form>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="index" label="NO" align="center" width="55"></el-table-column>
                <el-table-column prop="id" label="标签ID" align="center"></el-table-column>
                <el-table-column prop="signs" label="标签语种" align="center"></el-table-column>
                <el-table-column prop="professionName" label="标签频道" align="center"></el-table-column>
                <el-table-column prop="category" label="标签类别" align="center"></el-table-column>
                <el-table-column prop="name" label="标签名称" align="center"></el-table-column>
                <el-table-column prop="userName" label="创建人" align="center"></el-table-column>
                <el-table-column prop="type" label="类型" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.type == 1">课程</div>
                        <div v-if="scope.row.type == 2">照片</div>
                        <div v-if="scope.row.type == 3">文章</div>
                        <div v-if="scope.row.type == 4">出版物</div>
                        <div v-if="scope.row.type == 5">圈子</div>
                        <div v-if="scope.row.type == 6">问答</div>
                        <div v-if="scope.row.type == 7">讲师标签</div>
                        <div v-if="scope.row.type == 8">院校</div>
                        <div v-if="scope.row.type == 9">话题</div>
                    </template>
                </el-table-column>
                <el-table-column prop="userId" label="创建人ID" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="hiaoqiaot" label="热度" align="center"></el-table-column>
            </el-table>
            <!-- </div> -->
        </el-col>
        <!-- 分页 -->
        <el-col :span='24' style="float: right;">
        <el-row :gutter="20" v-if="tableData.length" class="pagina-tion">
        <el-col :span="11">
            <el-pagination background layout="prev, pager, next, jumper" 
            :total="total"
            :page-size="20"
            @current-change="handleCurrentChange"></el-pagination>
        </el-col>
        <el-col :span="8">
            <el-button size="small" type="primary" @click="onfen">确定</el-button>
        </el-col>
        <el-col :span="5">
            <!-- <el-button size="small" type="primary" @click="">批量删除</el-button> -->
            <!-- <el-button size="small" type="primary" @click="dialogVisible = true">批量冻结</el-button> -->
        </el-col>
        </el-row>
        </el-col>
        <!-- 分页end -->
    </section>
</template>
<script>
import { labelHotlList,codeChannel } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      total: '',
      isDialogShow: false,
      tableData: [],
      region_yu_qu: '',
      option_yu: [{
        value: '1',
        label: '全部'
      }, {
        value: '2',
        label: '中文'
      }, {
        value: '3',
        label: '英语'
      }],
      region_xing_qu: '',
      option_xing: [{
        value: '0',
        label: '一级标签'
      }, {
        value: '1',
        label: '课程'
      }, {
        value: '2',
        label: '照片'
      }, {
        value: '3',
        label: '文章'
      }, {
        value: '4',
        label: '出版物'
      }, {
        value: '5',
        label: '圈子'
      }, {
        value: '6',
        label: '问答'
      }, {
        value: '7',
        label: '讲师标签'
      }, {
        value: '8',
        label: '院校'
      }, {
        value: '9',
        label: '话题'
      }],
      region_bie_qu: '',
      option_bie: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '分类'
      }, {
        value: '2',
        label: '热搜'
      }, {
        value: '3',
        label: '能力标签'
      }, {
        value: '4',
        label: '授课语言-地方语言'
      }, {
        value: '5',
        label: '授课语言-民族语言'
      }, {
        value: '6',
        label: '授课语言-国家语言'
      }],
      region_pin_qu: '',
      option_pin: [],
      choosenItem: [],
      choosenItem1: [],
      qu_id: '',
      dataTime: '',
      pageNo: '',
      multipleSelection: '',
      allpi: []
    }
  },
  methods: {
    choose (value) {
      this.choosenItem = this.option_yu.filter(item => item.value === value)[0];
      console.log('choose', this.choosenItem)
    },
    choose1 (value) {
      this.choosenItem1 = this.option_bie.filter(item => item.value === value)[0];
      console.log('choose', this.choosenItem1)
    },
    handleCurrentChange(val) {
      // 分页监听
      this.pageNo = val
      this.onfen()
    },
    onfen () {
      // 分页按钮
      if (this.dataTime !== '') {
        var data = {'id': this.qu_id, 'signs': this.choosenItem.label, 'profession': this.region_pin_qu, 'classes': this.choosenItem1.label, 'type': this.region_xing_qu, 'regFrom': this.dataTime[0] + ' 00:00:00', 'regTo': this.dataTime[1] + ' 00:00:00', 'pageNo': this.pageNo, 'pageSize': 20}
      } else {
        var data = {'id': this.qu_id, 'signs': this.choosenItem.label, 'profession': this.region_pin_qu, 'classes': this.choosenItem1.label, 'type': this.region_xing_qu, 'pageNo': this.pageNo, 'pageSize': 20}
      }
      labelHotlList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result.modelData
          this.total = res.result.total
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    queryClik () {
      // 查询按钮
      if (this.dataTime !== '') {
        var data = {'id': this.qu_id, 'signs': this.choosenItem.label, 'profession': this.region_pin_qu, 'classes': this.choosenItem1.label, 'type': this.region_xing_qu, 'regFrom': this.dataTime[0] + ' 00:00:00', 'regTo': this.dataTime[1] + ' 00:00:00'}
      } else {
        var data = {'id': this.qu_id, 'signs': this.choosenItem.label, 'profession': this.region_pin_qu, 'classes': this.choosenItem1.label, 'type': this.region_xing_qu}
      }
      labelHotlList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result.modelData
          this.total = res.result.total
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onEditClick (index) {
      this.$router.replace({ path: '/institutionsEditors' })
    },
    onDisableClik (index) {
      this.isDialogShow1 = true
    },
    onDelClick () {
      this.isDialogShow = true
    },
    postData () {
      labelHotlList().then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result.modelData
          this.total = res.result.total
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
