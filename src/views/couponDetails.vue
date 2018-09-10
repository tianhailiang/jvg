<template>
  <section class="coupon-content">
    <h3 class="coupon-title">优惠券详情</h3>
    <el-row :gutter="20">
      <el-form label-width="80px">
          <el-col :span="6" class="coupon-name"><div class="grid-content bg-purple">
              <el-form-item label="优惠券名称">
                  <el-input type="text" size="small"></el-input>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="ID">
                  <el-input type="text" size="small" :disabled="true"></el-input>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="发行量">
                <el-input type="text" size="small" placeholder="多少张"></el-input>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="渠道">
                  <el-select placeholder="" v-model="defaultselectVal2" size="small">
                      <el-option 
                      :label="item.label" 
                      :value="item.value"
                      :key="index"
                      v-for="(item, index) in defaultdata2"></el-option>
                  </el-select>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="所属频道">
                  <el-select placeholder="" v-model="defaultselectVal" size="small">
                      <el-option
                      :label="item.label"
                      :value="item.value"
                      :key="index"
                      v-for="(item, index) in defaultdata"></el-option>
                  </el-select>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="类型">
                  <el-select placeholder="" v-model="defaultselectVal4" size="small">
                      <el-option 
                      :label="item.label"
                      :value="item.value"
                      :key="index"
                      v-for="(item, index) in defaultdata4"></el-option>
                  </el-select>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="使用状态">
                <el-input type="text" size="small" :disabled="true"></el-input>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="参与商品">
                  <el-select placeholder="" v-model="defaultselectVal5" size="small">
                      <el-option 
                      :label="item.label" 
                      :value="item.value"
                      :key="index"
                      v-for="(item, index) in defaultdata5"></el-option>
                  </el-select>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="发行方">
                <el-input type="text" size="small" :disabled="true"></el-input>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="已使用">
              <el-input type="text" size="small"></el-input>
            </el-form-item>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <el-form-item label="发行人">
            <el-input type="text" size="small" :disabled="true"></el-input>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-form-item label="使用条件">
          <el-input type="text" size="small" placeholder="满多少金额可以使用"></el-input>
        </el-form-item>
    </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-form-item label="优惠券金额">
          <el-input type="text" size="small" placeholder="人民币 元/张"></el-input>
          <el-input type="text" size="small" placeholder="美元 元/张"></el-input>
        </el-form-item>
    </div></el-col>
    <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
        <el-radio-group v-model="form.resource">
          <el-radio label="全部商品"></el-radio>
          <el-radio label="部分商品"></el-radio>
        </el-radio-group>
    </div>
    </el-col>
      <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
        <el-button type="primary" size="medium" @click="dialogFormVisible = true">选择参与商品</el-button>
      </div>
      </el-col>
    </el-form>
  </el-row>
  <div style="height:1px; background:#dcdfe6;"></div>
  <!--  -->
  <el-table :data="data" style="width: 100%" border size="medium">
    <el-table-column prop="currentid" type="selection" width="55" label="" align="center"></el-table-column>
    <el-table-column prop="currentid" label="课程ID" width="250" align="center"></el-table-column>
    <el-table-column prop="currentname" width="250" label="课程名称" align="center"></el-table-column>
    <el-table-column prop="current" width="250" label="课程价格" align="center"></el-table-column>
    <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
            <el-button size="small" type="danger">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  <div class="remove-btn">
    <el-button size="small" type="primary">批量删除</el-button>
  </div>
  <!-- 按钮组 -->
  <div class="btn-content">
    <div class="foot-btn-group">
      <el-button size="medium" type="primary">保存</el-button>
      <el-button size="medium" type="primary">提交</el-button>
      <el-button size="medium" type="primary">取消</el-button>
    </div>
    <div class="foot-btn-group">
      <el-button size="medium" type="primary">通过</el-button>
      <el-button size="medium" type="primary">不通过</el-button>
      <el-button size="medium" type="primary">取消</el-button>
    </div>
  </div>
  <div style="height:1px; background:#dcdfe6;margin-bottom:20px;"></div>
  <!--  -->
  <el-row :gutter="20">
    <el-form label-width="80px">
      <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
        <el-form-item label="使用条件">
          <el-input type="text" size="small" placeholder="满多少金额可以使用"></el-input>
        </el-form-item>
        </div>
      </el-col>
      <el-col :span="6" class="coupon-name">
        <el-form-item label="优惠券折扣" class="money">
          <el-input type="text" size="small" placeholder="5%"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="类型">
              <el-select placeholder="" v-model="typeVal" size="small">
                  <el-option 
                  :label="item.label" 
                  :value="item.value"
                  :key="index"
                  v-for="(item, index) in defaultdata"></el-option>
              </el-select>
          </el-form-item>
        </el-col>
    </el-form>
  </el-row>
  <el-row :gutter="20">
      <el-form label-width="80px">
        <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
          <el-form-item label="使用范围">
            <el-input type="text" size="small" placeholder=""></el-input>
          </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
            <el-form-item label="抵扣金额">
                <el-col :span="11">
                    <el-input type="text" size="small" placeholder="人民币"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input type="text" size="small" placeholder="美元"></el-input>
                </el-col>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="类型">
                <el-select v-model="typesVal" size="small">
                    <el-option 
                    :label="item.label" 
                    :value="item.value"
                    :key="index"
                    v-for="(item, index) in liuxuedata"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
      </el-form>
    </el-row>
    <!-- 商品选择弹窗 -->
    <el-dialog title="请选择以下商品" :visible.sync="dialogFormVisible" class="modal">
        <el-form :model="form" size="small" :inline="true">
            <el-form-item label="商品姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="data" style="width: 100%" border size="medium">
          <el-table-column prop="currentid" type="selection" width="45" label="" align="center"></el-table-column>
          <el-table-column prop="currentid" label="课程ID" width="150" align="center"></el-table-column>
          <el-table-column prop="currentname" width="150" label="课程名称" align="center"></el-table-column>
          <el-table-column prop="current" width="150" label="课程价格" align="center"></el-table-column>
          <el-table-column label="操作" width="147" align="center">
            <template slot-scope="scope">
              <el-button size="small" type="danger">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="row-container">
            <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
            <el-button size="small" type="primary">确定</el-button>
            <el-button size="small" type="primary" class="remove">批量选择</el-button>
        </div>
        <div class="row-container">
            <el-button size="small" type="primary">提交</el-button>
            <el-button size="small" type="primary">取消</el-button>
        </div>
      </el-dialog>
  </section>
</template>
<script>
  export default {
    name: 'couponDetails',
    data () {
      return{
        form: {
          resource: ''
        },
        defaultselectVal: '',
        defaultselectVal2: '',
        defaultselectVal3: '',
        defaultselectVal4: '',
        defaultselectVal5: '',
        typeVal: '',
        typesVal: '',
        dialogFormVisible: false,
        formLabelWidth: '120px;',
        data: [
          {currentid: '001', currentname: 'dom编程', current: '$40'},
          {currentid: '002', currentname: 'css世界', current: '$50'},
          {currentid: '003', currentname: 'js设计模式', current: '$90'}
        ],
        defaultdata: [
          {value: '选项1', label: '语培'},
          {value: '选项2', label: '留学'},
          {value: '选项3', label: '全部'}
        ],
        defaultdata2: [
          {value: '选项1', label: '全部'},
          {value: '选项2', label: 'WAP'},
          {value: '选项3', label: 'APP'},
          {value: '选项4', label: 'PC'}
        ],
        defaultdata5: [
          {value: '选项1', label: '课程'},
          {value: '选项2', label: '出版物'},
          {value: '选项3', label: '留学'}
        ],
        defaultdata4: [
          {value: '选项1', label: '满减'},
          {value: '选项2', label: '折扣'},
          {value: '选项3', label: '留学抵扣'}
        ],
        liuxuedata: [
          {value: '选项1', label: '折扣'},
          {value: '选项2', label: '满减'},
          {value: '选项3', label: '留学抵扣'},
        ]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      }
    }
  }
</script>
<style>
.coupon-content{overflow:hidden;margin-left:260px;}
.coupon-title{margin-bottom:15px;height:30px;border-bottom:solid 1px #ccc;text-indent:20px;font-weight:600;line-height:30px;}
.radio-goods{margin-left:30px;}
.remove-btn{display:flex;margin-top:20px;margin-right:30px;margin-bottom:20px;justify-content:flex-end;}
.btn-content{display:flex;margin-bottom:20px;justify-content:space-around;}
.coupon-content .money .el-input{position:absolute;}
.row-container{display:flex;margin-top:20px;justify-content:center;}
.coupon-name .el-form-item .el-form-item__label{padding-right:8px;}
</style>