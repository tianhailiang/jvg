<template>
  <section class="advert-detail-content" style="overflow:hidden;margin-left:260px;">
    <section class="advert-detail_head">
      <h3 style="margin:10px 0; text-indent:20px">广告位信息</h3>
      <div class="detail_head">
          <el-row :gutter="20">
              <el-form class="demo-form-inline" label-width="80px" size="small">
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-button size="small" type="primary" @click="dialogFormVisible = true">选择广告位</el-button>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="创建人ID">
                        <el-input placeholder=""></el-input>
                      </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg_purple">
                      <el-form-item label="创建人名称" class="bg_purple_name">
                          <el-input placeholder=""></el-input>
                        </el-form-item>
                    </div>
                  </el-col>
              </el-form>
          </el-row>
      </div>
      <el-row :gutter="20">
        <el-form class="demo-form-inline" label-width="80px" size="small">
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-form-item label="ID">
                    <el-input placeholder=""></el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="名称">
                  <el-input placeholder=""></el-input>
              </el-form-item>  
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
             <el-form-item label="广告类型">
                <el-input placeholder=""></el-input>
              </el-form-item>  
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="所有权">
                <el-input placeholder=""></el-input>
              </el-form-item>
          </div></el-col>
          <el-col :span="6">
              <div class="grid-content bg_purple">
                  <el-form-item label="图片尺寸">
                      <el-input placeholder=""></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg_purple">
                    <el-form-item label="广告模板">
                        <el-input placeholder=""></el-input>
                    </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <el-form-item label="轮播帧数">
                          <el-input placeholder=""></el-input>
                      </el-form-item>
                  </div>
              </el-col>
          <el-col :span="6">
              <div class="grid-content bg_purple">
                  <el-form-item label="渠道">
                      <el-input placeholder=""></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="业务频道">
                        <el-input placeholder=""></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="位置类型">
                        <el-input placeholder=""></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="创建时间">
                        <el-input placeholder=""></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="所有者ID">
                        <el-input placeholder=""></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="名称">
                        <el-input placeholder=""></el-input>
                    </el-form-item>
                </div>
            </el-col>
        </el-form>
        </el-row>
    </section>
    <el-row :gutter="20">
      <el-col :span="14">
          <section class="advert-detail_left">
            <h3 style="margin-bottom:20px;">广告设置</h3>
            <el-form label-width="80px" size="small">
                <el-form-item label="轮播顺序">
                  <el-input placeholder="1"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input placeholder="URL"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-col :span="12" style="padding-left:0;">
                        <el-input type="text" placeholder="人民币" style="width: 100%;"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input type="text" placeholder="美金" style="width: 100%;"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="">
                      <el-input placeholder="图片"></el-input>
                      <el-upload class="upload-demo" action="">
                        <el-button size="small" type="primary" style="position:absolute;right:0;top:0;">点击上传</el-button>
                      </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="开始时间" style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="结束时间" style="width: 100%;"></el-time-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="购买人名称">
                    <el-input placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input placeholder=""></el-input>
                </el-form-item>
              </el-form>
              <p style="text-align:center;">PS：每个广告购买一次生产一条订单记录</p>
          </section>
        </el-col>
        <el-col :span="6">
          <section class="advert-detail_right">
            <h3 style="margin-bottom:20px;">广告位模板</h3>
            <img src="https://imgsa.baidu.com/news/q%3D100/sign=1136fe85adec08fa200017a769ee3d4d/342ac65c103853431dc7dd1b9e13b07eca808884.jpg" alt="" height="350" width="400">
          </section>
        </el-col>
      </el-row>
      <div class="btn-group">
          <el-row>
              <el-button size="medium" type="primary">提交</el-button>
              <el-button size="medium" type="primary">删除</el-button>
              <el-button size="medium" type="primary">取消</el-button>
            </el-row>
      </div>
  <!-- 选择广告位弹窗 -->
  <el-dialog title="请选择以下广告位" :visible.sync="dialogFormVisible" class="modal">
        <el-form size="small">
        <el-row :gutter="20">
            <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
                    <el-form-item label="ID">
                        <el-input type="text"></el-input>
                    </el-form-item>
            </div></el-col>
            <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
                    <el-form-item label="名称">
                            <el-input type="text"></el-input>
                        </el-form-item>
            </div></el-col>
            <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
                <el-form-item label="位置类型">
                        <el-select size="small" >
                            <el-option label="全部"  value="shanghai"></el-option>
                            <el-option label="轮播"  value="shanghai"></el-option>
                            <el-option label="单页"  value="shanghai"></el-option>
                        </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
                <el-form-item label="所有权">
                    <el-select size="small" >
                        <el-option label="全部"  value="shanghai"></el-option>
                        <el-option label="平台"  value="shanghai"></el-option>
                        <el-option label="用户"  value="shanghai"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
                <el-form-item label="广告位类型">
                        <el-select size="small" >
                            <el-option label="全部"  value="shanghai"></el-option>
                            <el-option label="轮播"  value="shanghai"></el-option>
                            <el-option label="单页"  value="shanghai"></el-option>
                        </el-select>
                    </el-form-item>
            </div></el-col>
            <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
                    <el-form-item label="渠道">
                            <el-select size="small" >
                                <el-option label="全部"  value="shanghai"></el-option>
                                <el-option label="WAP"  value="shanghai"></el-option>
                                <el-option label="PC"  value="shanghai"></el-option>
                                <el-option label="APP"  value="shanghai"></el-option>
                            </el-select>
                        </el-form-item>
                </div></el-col>
                <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
                        <el-form-item label="业务频道">
                                <el-select size="small" >
                                    <el-option label="全部"  value="shanghai"></el-option>
                                    <el-option label="留学"  value="shanghai"></el-option>
                                    <el-option label="语培"  value="shanghai"></el-option>
                                    <el-option label="院校直通"  value="shanghai"></el-option>
                                    <el-option label="移民"  value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                    </div></el-col>
                    <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
                            <el-form-item label="广告位模板">
                                    <el-select size="small" >
                                        <el-option label="全部"  value="shanghai"></el-option>
                                        <el-option label="留学首页"  value="shanghai"></el-option>
                                        <el-option label="问答详情页"  value="shanghai"></el-option>
                                    </el-select>
                                </el-form-item>
                    </div></el-col>
            </el-row>
            <div class="model-seacher">
                <el-button type="primary" size="small">搜索</el-button>
            </div>
        </el-form>
        <el-table :data="data" style="width: 100%" border size="medium">
            <el-table-column prop="currentid" width="65" label="NO" align="center"></el-table-column>
            <el-table-column prop="currentid" width="65" label="广告ID" align="center"></el-table-column>
            <el-table-column prop="currentid" width="110" label="广告位名称" align="center"></el-table-column>
            <el-table-column prop="currentid" width="110" label="广告位模板" align="center"></el-table-column>
            <el-table-column prop="currentid" width="110" label="广告位类型" align="center"></el-table-column>
            <el-table-column prop="currentid" width="110" label="所有权" align="center"></el-table-column>
            <el-table-column prop="currentid" width="110" label="位置类型" align="center"></el-table-column>
            <el-table-column prop="currentid" label="创建时间" width="100" align="center"></el-table-column>
            <el-table-column prop="currentname" width="100" label="渠道" align="center"></el-table-column>
            <el-table-column prop="current" width="150" label="业务频道" align="center"></el-table-column>
            <el-table-column label="操作" width="110" align="center">
                <template slot-scope="scope">
                <el-button size="small" type="danger">选择</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="row-container">
            <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
            <el-button size="small" type="primary">确定</el-button>
        </div>
      </el-dialog>
    </section>
</template>
<script>
export default {
  name: 'advertDetail',
  data () {
    return {
        dialogFormVisible: false,
        data: [
            {currentid: '001'}
        ]
    }
  }
}
</script>
<style>
.detail_head{margin-bottom:20px;border-bottom:solid 1px #ccc;}
.advert-detail_head .bg_purple .el-input--mini{position:absolute;}
.advert-detail_head .bg_purple .el-form-item__label,.advert_purple .el-form-item__label{width:auto!important;}
.advert-detail-content .money-input{float:left;}
.advert-detail-content .btn-group{margin-right:50px;height:90px;text-align:right;}
.model-seacher,.row-container{display:flex;margin-bottom:20px;justify-content:flex-end;}
.bg_purple .bg_purple_name .el-input--small{position:absolute;}
</style>