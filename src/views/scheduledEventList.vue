<template>
  <section class="reservation-content">
    <h3 class="reservation-title">预约活动列表</h3>
    <el-row :gutter="20">
      <el-form label-width="80px">
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-form-item label="活动名称">
                  <el-input v-model="form.name" size="small"></el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-form-item label="所属频道">
                    <el-select placeholder="" v-model="value1" size="small">
                        <el-option 
                        :label="item.label" 
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in value1Data"></el-option>
                    </el-select>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-form-item label="渠道">
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
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-form-item label="状态">
                    <el-select placeholder="" v-model="value3" size="small">
                        <el-option 
                        :label="item.label"
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in value3Data"></el-option>
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
          <div class="search">
            <el-button type="primary" size="small">搜索</el-button>
            <el-button type="primary" size="small">创建活动</el-button>
          </div>
      </el-form>
    </el-row>
    <!--  -->
    <el-table :data="tabeldata" style="width: 100%" border size="medium">
        <el-table-column prop="typenum" type="selection" width="60" label="" align="center"></el-table-column>
        <el-table-column prop="typenum" width="120" label="活动名称" align="center"></el-table-column>
        <el-table-column prop="typenum" label="活动开始时间" width="165" align="center"></el-table-column>
        <el-table-column prop="typenum" label="状态" width="140" align="center"></el-table-column>
        <el-table-column prop="typenum" label="渠道" width="140" align="center"></el-table-column>
        <el-table-column prop="typenum" label="频道" width="140" align="center"></el-table-column>
        <el-table-column prop="typenum" label="活动城市" width="120" align="center"></el-table-column>
        <el-table-column label="操作" width="170" align="center">
            <template slot-scope="scope">
                <el-button size="small" type="danger">删除</el-button>
                <el-button size="small" type="danger">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="page-container">
        <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
        <el-button size="small" type="primary">确定</el-button>
        <el-button size="small" type="primary" class="remove">批量删除</el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      form: {
        name: ''
      },
      value1: '',
      value2: '',
      value3: '',
      value1Data: [
        {value: '选项一',label: '全部'},
        {value: '选项二',label: '留学'},
        {value: '选项三',label: '语培'}
      ],
      value2Data: [
        {value: '选项一',label: 'APP'},
        {value: '选项二',label: 'PC'},
        {value: '选项三',label: 'WAP'}
      ],
      value3Data: [
        {value: '选项一',label: '全部'},
        {value: '选项二',label: '进行中'},
        {value: '选项三',label: '已结束'}
      ],
      tabeldata: [
        {typenum: '2018-9-6'}
      ]
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_reserva.css';
.search{display: inline-block;margin-top:5px;}
</style>