<template>
  <section class="reservation-content">
    <h3 class="reservation-title">预约活动详情</h3>
    <el-row :gutter="20">
        <el-form label-width="80px">
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="活动名称">
                    <el-input type="text" size="small"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="活动ID">
                    <el-input type="text" size="small" :disabled="true" placeholder="自动获取"></el-input>
                </el-form-item>  
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="活动地点">
                    <el-input type="text" size="small"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="渠道">
                    <el-select v-model="region" size="small">
                      <el-option 
                      :label="items.label" 
                      :value="items.value"
                      v-for="(items, index) in value2Data"
                      ></el-option>
                    </el-select>
                  </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="所属频道">
                    <el-select v-model="suoshu" size="small">
                      <el-option 
                      :label="items.label" 
                      :value="items.value"
                      v-for="(items, index) in value1Data"></el-option>
                    </el-select>
                  </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="开始时间">
                    <el-input type="text" size="small"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="结束时间">
                    <el-input type="text" size="small"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="针对人群">
                    <el-input type="text" size="small"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="预约专线">
                    <el-input type="text" size="small"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="活动亮点">
                    <el-input type="text" size="small"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="举办城市">
                    <el-select v-model="defaultCity" size="small">
                      <el-option 
                        :label="items.label" 
                        :value="items.value"
                        v-for="(items, index) in city"></el-option>
                    </el-select>
                  </el-form-item>
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple">
                  <el-form-item label="活动内容">
                      <el-input type="textarea" ></el-input>
                  </el-form-item>
            </div></el-col>
        </el-form>
    </el-row>
    <div class="submit-group">
        <el-button type="primary" size="small">提交</el-button>
        <el-button type="primary" size="small">取消</el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      region: '',
      defaultCity: '',
      suoshu: '',
      city: [
        {value: '选项一',label: '北京'},
        {value: '选项二',label: '济南'},
        {value: '选项三',label: '郑州'}
      ],
      value2Data: [
        {value: '选项一',label: 'APP'},
        {value: '选项二',label: 'PC'},
        {value: '选项三',label: 'WAP'}
      ],
      value1Data: [
        {value: '选项一',label: '全部'},
        {value: '选项二',label: '留学'},
        {value: '选项三',label: '语培'}
      ]
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_reserva.css';
.submit-group{
  display: flex;
  justify-content: center;
  margin-top:20px;
}
</style>