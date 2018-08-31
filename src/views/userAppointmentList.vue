<template>
  <section class="reservation-content">
    <h3 class="reservation-title">用户预约列表</h3>
    <el-row :gutter="20">
        <el-form label-width="80px">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                  <el-form-item label="活动名称">
                    <el-input type="text" size="small"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="预约人">
                      <el-input type="text" size="small"></el-input>
                    </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <el-form-item label="意向国家">
                        <el-input type="text" size="small"></el-input>
                      </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="是否回复">
                            <el-select placeholder="" v-model="value2" size="small">
                                <el-option 
                                :label="item.label" 
                                :value="item.value"
                                :key="index"
                                v-for="(item, index) in value2Data"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="活动时间">
                            <el-col :span="11">
                              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" size="small"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;" size="small"></el-time-picker>
                            </el-col>
                        </el-form-item>
                    </div>
                </el-col>
                <el-button size="small" type="primary" class="btn-search">搜索</el-button>
        </el-form>
      </el-row>
      <!--  -->
      <el-table :data="tabeldata" style="width: 100%" border size="medium">
          <el-table-column prop="country" type="selection" width="60" label="" align="center"></el-table-column>
          <el-table-column prop="country" width="120" label="活动名称" align="center"></el-table-column>
          <el-table-column prop="country" label="预约人" width="165" align="center"></el-table-column>
          <el-table-column prop="country" label="预约人联系方式" width="140" align="center"></el-table-column>
          <el-table-column prop="country" label="意向国家" width="140" align="center"></el-table-column>
          <el-table-column prop="country" label="预约人邮箱" width="140" align="center"></el-table-column>
          <el-table-column prop="country" label="回复状态" width="120" align="center"></el-table-column>
          <el-table-column label="操作" width="170" align="center">
              <template slot-scope="scope">
                  <el-button size="small" type="danger">删除</el-button>
                  <el-button size="small" type="danger">回复</el-button>
              </template>
          </el-table-column>
      </el-table>
      <div class="page-container">
          <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
          <el-button size="small" type="primary">确定</el-button>
          <el-button size="small" type="primary" class="remove">批量删除</el-button>
      </div>
  </section>
</template>
<script>
export default {
  name: 'userAppointmentList',
  data () {
    return {
      value2: '',
      name: '',
      form: {
        date1: '',
        date2: ''
      },
      value2Data: [
        {value: '选项1',label: '全部'},
        {value: '选项2',label: '已回复'},
        {value: '选项3',label: '未回复'}
      ],
      tabeldata: [
        {country: '中国'}
      ]
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_reserva.css';
.btn-search{
  margin-top:5px;
  margin-left: 20px;
}
</style>