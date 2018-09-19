<template>
  <div class="right-box">
    <div class="nav" >
      文章详情
    </div>
    <el-form>
      <el-form-item label="文章ID：" :label-width="formLabelWidth"
        style="display:inline-block">
        {{$route.params.id}}
      </el-form-item>
      <el-form-item label="文章标题：" :label-width="formLabelWidth"
        style="display:inline-block">
        {{title}}
      </el-form-item>
      <el-form-item label="用户分类：" :label-width="formLabelWidth"
        style="display:inline-block">
        {{userTypeVal}}
      </el-form-item>
      <el-form-item label="文章描述：" :label-width="formLabelWidth">
        {{memo}}
      </el-form-item>
      <div class="flex-box" >
        <el-form-item label="文章分类标签：" :label-width="formLabelWidth1">
          {{labelIdsVal}}
        </el-form-item>
        <el-form-item label="用户自定义标签：" :label-width="formLabelWidth1">
          {{labelUserName}}
        </el-form-item>
        <el-form-item label="用户ID：" :label-width="formLabelWidth1">
          {{userId}}
        </el-form-item>
        <el-form-item label="用户名称：" :label-width="formLabelWidth1">
          {{realName}}
        </el-form-item>
        <el-form-item label="用户昵称：" :label-width="formLabelWidth1">
          {{nikeName}}
        </el-form-item>
        <el-form-item label="用户角色：" :label-width="formLabelWidth1">
          {{userTypeVal}}
        </el-form-item>
        <el-form-item label="文章状态：" :label-width="formLabelWidth1">
          {{upDownVal}}
        </el-form-item>
      </div>
      <el-form-item label="文章内容：" :label-width="formLabelWidth">
        <div v-html="details">
        </div>
      </el-form-item>
      <el-form-item label="文章图片：" :label-width="formLabelWidth">
        <ul class="article-ul">
          <li v-for="(item, index) in imageList" :key="index">
            <img :src="item" />
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="文章统计：" :label-width="formLabelWidth">
        <el-table
          :data="tableData" border >
          <el-table-column
            prop="browseNum"
            label="浏览数" align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="transpondNum"
            label="转发数" align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="shareNum"
            label="分享数" align="center" width="80">
          </el-table-column>
          <el-table-column
            prop="collectNum"
            label="收藏数" align="center" width="80">
          </el-table-column>
          <el-table-column
            label="评论数"
            align="center" width="80">
            <template slot-scope="scope">
              <el-button
              size="mini"
              @click="goComment(scope.$index, scope.row)">
                {{scope.row.commentNum}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="thumpNum"
            label="点赞数" align="center" width="80">
          </el-table-column>
          <el-table-column
            label="打赏数"
            align="center" width="80">
            <template slot-scope="scope">
              <el-button
              size="mini"
              @click="goReward(scope.$index, scope.row)">
                {{scope.row.rewardCount}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="rewardPrice"
            label="打赏金额" align="center" width="80">
          </el-table-column>
        </el-table>
      </el-form-item>
      <div class="btn-box" >
        <el-button @click="forbidden" v-if="upDown == 1">禁用</el-button>
        <el-button @click="relieve" v-if="upDown == 2">解禁</el-button>
        <el-button @click="handleDelete">删除</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
    <!-- 禁用编辑窗口 -->
    <ForbiddenDialog :dialogFormVisible.sync="dialogFormVisible" :dialogForm="dialogForm" />
  </div>
</template>

<script>
import ForbiddenDialog from '@/components/ForbiddenDialog.vue'
export default {
  name: 'articleDetail',
  data () {
    return {
      formLabelWidth: '130px',
      formLabelWidth1: '',
      title: '',
      userType: null,
      userTypeVal: '',
      memo: '',
      labelIdsVal: '',
      labelUserName: '',
      userId: null,
      realName: '',
      nikeName: '',
      userTypeVal: '',
      upDown: null,
      upDownVal: '',
      details: '',
      imageList: [],
      tableData: [{
        browseNum: 0,
        transpondNum: 0,
        shareNum: 0,
        collectNum: 0,
        commentNum: 0,
        thumpNum: 0,
        rewardCount: 0,
        rewardPrice: 0
      }],
      dialogFormVisible: false,
      dialogForm: {}
    }
  },
  components: {
    ForbiddenDialog
  },
  methods: {
    goComment (index, row) {

    },
    goReward (index, row) {

    },
    forbidden () {
      this.dialogFormVisible = true
      this.dialogForm.id = Number(this.$route.params.id)
      this.dialogForm.title = this.title
      this.dialogForm.realName = this.realName
    },
    relieve () {
      /* 解禁 */
      axios.post('article/list/change-updown.json', {
        id: Number(this.$route.params.id),
        upDown: 1
      })
      .then( response => {
        if (response.data.code == 'OK') {
          this.$message({
            type: 'success',
            message: response.data.message
          })
          setTimeout(function () {
            window.location.reload()
          },500)
        }else {
          this.$message({
            type: 'error',
            message: response.data.message
          })
        }
      })
      .catch( error => {
        console.log(error);
      })
    },
    handleDelete () {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('article/list/delete.json', {
          id: [this.$route.params.id]
        })
        .then( response => {
          if (response.data.code == 'OK') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            setTimeout(function () {
              this.$router.push({name: 'article'})
            }.bind(this),500)
          } else {
            this.$message({
              type: 'error',
              message: response.data.message
            })
          }
        })
        .catch( error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })     
      })
    },
    cancel () {
      this.$router.push({name: 'article'})
    }
  },
  mounted () {
    axios.post('article/detail/detail.json', {
      id: this.$route.params.id
    })
    .then( response => {
      this.title = response.data.result.title
      this.userType = response.data.result.userType
      this.userTypeVal = response.data.result.userTypeVal
      this.memo = response.data.result.memo
      this.labelIdsVal = response.data.result.labelIdsVal
      this.labelUserName = response.data.result.labelUserName
      this.userId = response.data.result.userId
      this.realName = response.data.result.realName
      this.nikeName = response.data.result.nikeName
      this.upDown = response.data.result.upDown
      this.upDownVal = response.data.result.upDownVal
      this.details = response.data.result.details
      if (response.data.result.images) {
        this.imageList = response.data.result.images.split(',')
      }
      [this.tableData[0].browseNum = 0] = [response.data.result.browseNum]
      [this.tableData[0].transpondNum = 0] = [response.data.result.transpondNum]
      [this.tableData[0].shareNum = 0 ] = [response.data.result.shareNum]
      [this.tableData[0].collectNum = 0]= [response.data.result.collectNum]
      [this.tableData[0].commentNum = 0] = [response.data.result.commentNum]
      [this.tableData[0].thumpNum = 0] = [response.data.result.thumpNum]
      [this.tableData[0].rewardCount = 0] = [response.data.result.rewardCount]
      [this.tableData[0].rewardPrice = 0] = [response.data.result.rewardPrice]
    })
    .catch( error => {
      console.log(error);
    })
  }
}
</script>

<style scoped>
  .right-box {
    display: flex;
    flex-direction: column
  }
  .nav {
    height:40px;
    font-size: 18px;
    line-height: 40px;
  }
  .article-ul{
    border:1px solid #dcdcdc;
    display: flex;
    width:850px;
    flex-wrap: wrap
  }
  .article-ul li{
    width:150px;
    height:150px;
    margin:10px;
    margin-right:0
  }
  .btn-box{
    display: flex;
    justify-content: center
  }
  .flex-box {
    display: flex;
    padding-left:20px
  }
</style>
<style>
  .flex-box .el-form-item {
    display:flex;
    margin-right:10px
  }
</style>
