<template>
    <section class="advert-replace" style="overflow:hidden;max-width:1200px;">
        <el-row :gutter="20">
          <el-form class="demo-form-inline" label-width="80px" size="mini">
            <el-col :span="6">
              <div class="grid-content bg-purple advert-bg-purple">
                  <el-form-item label="替换开始时间">
                      <el-input placeholder="" :disabled="true" style="position:absolute;"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="6"><div class="grid-content advert-bg-purple">
                <el-form-item label="替换结束时间">
                    <el-input placeholder="" style="position:absolute;"></el-input>
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
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <el-form-item label="位置类型">
                          <el-select placeholder="全部">
                              <el-option label="全部"  value="shanghai"></el-option>
                              <el-option label="固定" value="beijing"></el-option>
                              <el-option label="列表" value="beijing"></el-option>
                          </el-select>
                    </el-form-item>
                  </div>
              </el-col>
              <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="渠道">
                            <el-select placeholder="全部">
                                <el-option label="全部"  value="shanghai"></el-option>
                                <el-option label="PC" value="beijing"></el-option>
                                <el-option label="WAP" value="beijing"></el-option>
                                <el-option label="APP" value="beijing"></el-option>
                            </el-select>
                      </el-form-item>
                    </div>
                </el-col>
              <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="广告模板">
                            <el-select placeholder="全部">
                                <el-option label="全部"  value="shanghai"></el-option>
                                <el-option label="留学首页" value="beijing"></el-option>
                                <el-option label="问答详情页" value="beijing"></el-option>
                            </el-select>
                      </el-form-item>
                    </div>
                </el-col>
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <el-form-item label="业务频道">
                        <el-select placeholder="全部">
                          <el-option label="全部"  value="shanghai"></el-option>
                          <el-option label="留学" value="beijing"></el-option>
                          <el-option label="语培" value="beijing"></el-option>
                          <el-option label="院校直通" value="beijing"></el-option>
                          <el-option label="移民" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                  </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="">
                        <el-radio v-model="radio" label="2">自动定时替换</el-radio>
                    </el-form-item>
                </div>
                </el-col>
          </el-form>
          </el-row>
          <!--  -->
      <el-row :gutter="20">
        <el-col :span="14">
            <section class="advert-detail_left">
              <h3 style="margin-bottom:20px; text-indent:12px;">替换内容</h3>
              <el-form label-width="80px" size="mini">
                <div class="commpont-group">
                    <div class="add-commpontent">
                        <el-row :gutter="20">
                            <el-col :span="13" style="padding-right:10px;">
                                <el-form-item label="">
                                    <el-input type="text" placeholder="URL"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="13" style="padding-right:10px;">
                                <el-form-item label="图片尺寸">
                                    <el-input type="text" placeholder="宽*高（px）" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="add-commpontent">
                        <el-row>
                            <el-col :span="13" style="padding-right:10px;">
                                <el-form-item label="">
                                    <el-input type="text" placeholder="图片"></el-input>
                                    <el-upload class="upload-demo upload-btn">
                                        <el-button size="small" type="primary">上传</el-button>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="commpont-group">
                        <div class="add-commpontent">
                            <el-row>
                            <el-col :span="13" style="padding-right:10px;">
                                <el-form-item label="图片尺寸">
                                    <el-input type="text" placeholder="宽*高（px）" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            </el-row>
                        </div>
                        <div class="add-commpontent">
                            <el-row>
                                <el-col :span="13" style="padding-right:10px;">
                                    <el-form-item label="">
                                        <el-input type="text" placeholder="图片"></el-input>
                                        <el-upload class="upload-demo upload-btn">
                                            <el-button size="small" type="primary">上传</el-button>
                                        </el-upload>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
              </el-form>
            </section>
          </el-col>
          <el-col :span="6">
            <section class="advert-detail_right">
              <h3 style="margin-bottom:20px;">广告位模板</h3>
              <el-button size="medium" type="primary" class="add-upload">上传广告位模板</el-button>
              <img src="https://imgsa.baidu.com/news/q%3D100/sign=1136fe85adec08fa200017a769ee3d4d/342ac65c103853431dc7dd1b9e13b07eca808884.jpg" alt="" height="350" width="400">
            </section>
          </el-col>
        </el-row>
        <div class="btn-group">
            <el-button size="medium" type="primary" @click="open2()">确认替换</el-button>
            <el-button size="medium" type="primary">取消</el-button>
        </div>
    </section>
</template>
<script>
export default {
  name: 'advertReplace',
  data () {
    return {
      radio: '1',
      options: [
        {value: '', label: ''},
        {value: '', label: ''}
      ]
    }
  },
  methods: {
    open2 () {
      this.$confirm('请确认是否替换广告', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '替换成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '替换失败'
        })
      })
    }
  }
}
</script>
<style>
.advert-replace .btn-group{
  display: flex;
  justify-content: center;
  margin-top:40px;
}
.advert-replace .add-commpontent_elinput{
  display: flex;
}
.advert-replace .upload-btn{
  position: absolute;
  right:0;
  top:0;
}
.advert-replace .add-upload{
  display: block;
  margin:20px auto;
}
.advert-replace .advert-bg-purple .el-form-item--mini .el-form-item__label{
    width:auto !important;
}
</style>
