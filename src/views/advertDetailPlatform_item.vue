<template>
    <section class="advert-detail-content" style="overflow:hidden;max-width:1200px;">
      <section class="advert-detail_head">
        <h3 style="margin:10px 0; text-indent:20px">广告位信息</h3>
        <div class="detail_head">
            <el-row :gutter="20">
                <el-form class="demo-form-inline" label-width="80px" size="mini">
                <el-col :span="6">
                    <div class="grid-content bg-purple" style="margin-left:50px;">
                      <el-button size="small" type="primary">选择广告位</el-button>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <el-form-item label="创建人ID">
                          <el-input placeholder="" :disabled="true"></el-input>
                        </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="6">
                      <div class="grid-content bg_purple">
                        <el-form-item label="创建人名称">
                            <el-input placeholder="" :disabled="true"></el-input>
                          </el-form-item>
                      </div>
                    </el-col>
                </el-form>
            </el-row>
        </div>
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
                    <el-input placeholder="" :disabled="true"></el-input>
                </el-form-item>  
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
               <el-form-item label="广告类型">
                  <el-input placeholder="" :disabled="true"></el-input>
                </el-form-item>  
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="所有权">
                  <el-input placeholder="" :disabled="true"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6">
                <div class="grid-content bg_purple">
                    <el-form-item label="图片尺寸">
                        <el-input placeholder="" :disabled="true"></el-input>
                    </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content bg_purple">
                      <el-form-item label="广告模板">
                          <el-input placeholder="" :disabled="true"></el-input>
                      </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="最多个数">
                            <el-input placeholder="3" :disabled="true"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="位置类型">
                            <el-input placeholder="" :disabled="true"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            <el-col :span="6">
                <div class="grid-content bg_purple">
                    <el-form-item label="渠道">
                        <el-input placeholder="" :disabled="true"></el-input>
                    </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <el-form-item label="业务频道">
                          <el-input placeholder="" :disabled="true"></el-input>
                      </el-form-item>
                  </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <el-form-item label="创建时间">
                          <el-input placeholder="" :disabled="true"></el-input>
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
              <el-form :model="form" label-width="80px" size="mini">
                  <el-form-item label="类目名称">
                      <el-col :span="12" style="padding-left:0;">
                          <el-select>
                              <el-option label="托福"  value="shanghai"></el-option>
                              <el-option label="GRE" value="beijing"></el-option>
                          </el-select>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="类目顺序">
                              <el-input type="text" style="width: 100%;" placeholder="1"></el-input>
                          </el-form-item>
                      </el-col>
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
                        <el-upload class="upload-demo">
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
    </section>
  </template>
  <script>
  export default {
    name: 'advertDetailPlatform_item'
  }
  </script>
  <style>
  .detail_head{
    border-bottom: solid 1px #ccc;
    margin-bottom: 20px;
  }
  .advert-detail_head .bg_purple .el-input--mini{
    position: absolute;
  }
  .advert-detail_head .bg_purple .el-form-item__label,.advert_purple .el-form-item__label{
    width:auto !important;
  }
  .advert-detail-content .money-input{
    float: left;
  }
  .advert-detail-content .btn-group{
    text-align: right;
    height: 90px;
    margin-right:50px;
  }
  </style>