<template>
    <section class="advert-space-detail" style="overflow:hidden;max-width:1200px;">
        <el-row :gutter="20">
          <el-form class="demo-form-inline" label-width="80px" size="mini">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                  <el-form-item label="ID">
                      <el-input placeholder="" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="名称">
                    <el-input placeholder=""></el-input>
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
                      <el-form-item label="广告状态">
                          <el-select placeholder="全部">
                              <el-option label="全部"  value="shanghai"></el-option>
                              <el-option label="使用中" value="beijing"></el-option>
                              <el-option label="未使用" value="beijing"></el-option>
                              <el-option label="冻结" value="beijing"></el-option>
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
                      <el-form-item label="创建人名称">
                          <el-input placeholder="" :disabled="true"></el-input>
                      </el-form-item>
                  </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <el-form-item label="创建人ID">
                          <el-input placeholder="" :disabled="true"></el-input>
                      </el-form-item>
                  </div>
              </el-col>
          </el-form>
          </el-row>
      <el-row :gutter="20">
        <el-col :span="14">
            <section class="advert-detail_left">
              <h3 style="margin-bottom:20px;">默认广告设置</h3>
              <el-form :model="form" label-width="80px" size="mini">
                  <el-form-item label="创建时间">
                    <el-input type="text" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="图片尺寸">
                      <el-input type="text"></el-input>
                    </el-form-item>
                  <el-form-item label="广告位类型">
                      <el-select placeholder="全部">
                        <el-option label="全部"  value="shanghai"></el-option>
                        <el-option label="留学" value="beijing"></el-option>
                        <el-option label="语培" value="beijing"></el-option>
                        <el-option label="院校直通" value="beijing"></el-option>
                        <el-option label="移民" value="beijing"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="位置类型">
                      <el-select placeholder="位置类型">
                          <el-option label="全部"  value="shanghai"></el-option>
                          <el-option label="固定" value="beijing"></el-option>
                          <el-option label="类目" value="beijing"></el-option>
                          <el-option label="列表" value="beijing"></el-option>
                        </el-select>
                  </el-form-item>
                  <el-form-item label="轮播帧数">
                      <el-input placeholder="5"></el-input>
                  </el-form-item>
                <div class="add-commpontent">
                    <el-row>
                    <el-col :span="13" style="padding-right:10px;">
                        <el-form-item label="轮播帧数1">
                            <el-input type="text" placeholder="URL"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-input type="text" placeholder="人民币" size="small"></el-input>
                    </el-col>
                    </el-row>
                </div>
                <div class="add-commpontent">
                    <el-row>
                        <el-col :span="13" style="padding-right:10px;">
                            <el-form-item label="">
                                <el-button type="primary" icon="el-icon-plus" style="position:absolute;left:-76px;">添加</el-button>
                                <el-input type="text" placeholder="URL"></el-input>
                                <el-upload class="upload-demo upload-btn">
                                    <el-button size="small" type="primary">上传</el-button>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-input type="text" placeholder="美金" size="small"></el-input>
                        </el-col>
                    </el-row>
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
            <el-button size="medium" type="primary">确认</el-button>
            <el-button size="medium" type="primary">删除</el-button>
            <el-button size="medium" type="primary">取消</el-button>
        </div>
    </section>
</template>
<script>

</script>
<style scoped>
.advert-space-detail .btn-group{
  display: flex;
  justify-content: center;
  margin-top:40px;
}
.advert-space-detail .add-commpontent_elinput{
  display: flex;
}
.advert-space-detail .upload-btn{
  position: absolute;
  right:0;
  top:0;
}
.advert-space-detail .add-upload{
  display: block;
  margin:20px auto;
}
</style>