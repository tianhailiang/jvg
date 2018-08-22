<template>
  <div>
    <div class="nav" >
      文章详情
    </div>
    <el-form :inline="true">
      <el-form-item label="文章ID：">
        <div style="min-width:120px">
          {{articleId}}
        </div>
      </el-form-item>
      <el-form-item label="文章标题：">
        <div style="min-width:120px">
          {{title}}
        </div>
      </el-form-item>
      <el-form-item label="用户分类：">
        <div style="min-width:120px">
          {{userClassify}}
        </div>
      </el-form-item>
      <el-form-item label="文章描述：" >
        <div style="min-width:120px">
          {{describe}}
        </div>
      </el-form-item>
      <el-form-item label="文章分类标签：" >
        <div style="min-width:120px">
          {{articleTag}}
        </div>
      </el-form-item>
      <el-form-item label="用户自定义标签：" >
        <div style="min-width:120px">
          {{customTag}}
        </div>
      </el-form-item>
      <el-form-item label="用户ID：" >
        <div style="min-width:120px">
          {{userId}}
        </div>
      </el-form-item>
      <el-form-item label="用户名称：" >
        <div style="min-width:120px">
          {{userName}}
        </div>
      </el-form-item>
      <el-form-item label="用户昵称：" >
        <div style="min-width:120px">
          {{userNickname}}
        </div>
      </el-form-item>
      <el-form-item label="用户角色：" >
        <div style="min-width:120px">
          {{userRole}}
        </div>
      </el-form-item>
      <el-form-item label="文章状态：" >
        <div style="min-width:120px">
          {{state}}
        </div>
      </el-form-item>
      <el-form-item label="文章内容：" >
        <div style="min-width:120px" v-html="artcileContent">
        </div>
      </el-form-item>
      <el-form-item label="文章图片：">
        <ul class="article-ul">
          <li v-for="item in imageList" >
            <img :src="item" />
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="文章统计：" >
        <el-table
          :data="tableData" border >
          <el-table-column
            prop="viewNumber"
            label="浏览数" align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="forwardNumber"
            label="转发数" align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="shareNumber"
            label="分享数" align="center" width="80">
          </el-table-column>
          <el-table-column
            prop="collectionNumber"
            label="收藏数" align="center" width="80">
          </el-table-column>
          <el-table-column
            label="评论数"
            align="center" width="80">
            <template slot-scope="scope">
              <el-button
              size="mini"
              @click="goComment(scope.$index, scope.row)">
                {{scope.row.commentNumber}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="fabulousNumber"
            label="点赞数" align="center" width="80">
          </el-table-column>
          <el-table-column
            label="打赏数"
            align="center" width="80">
            <template slot-scope="scope">
              <el-button
              size="mini"
              @click="goReward(scope.$index, scope.row)">
                {{scope.row.rewardNumber}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="rewardMoney"
            label="打赏金额" align="center" width="80">
          </el-table-column>
        </el-table>
      </el-form-item>
      <div class="btn-box" >
        <el-button @click="forbidden()">禁用</el-button>
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
  name: 'ArticleDetail',
  data () {
    return {
      articleId: '10001',
      title: '123',
      userClassify: '123',
      describe: '123',
      articleTag: '123',
      customTag: '123',
      userId: '123',
      userName: '123',
      userNickname: '123',
      userRole: '123',
      state: '123',
      artcileContent: '<p>一直以来，金融学都是中国学生赴美留学的热门专业，一方面是因为商科专业大都有着良好的就业前景和薪资水平</p>',
      imageList: ['http://images.jjl.cn/ugc/2018/0810/20180810201516824.png!150x150','http://images.jjl.cn/ugc/2018/0810/20180810201516824.png!150x150','http://images.jjl.cn/ugc/2018/0810/20180810201516824.png!150x150','http://images.jjl.cn/ugc/2018/0810/20180810201516824.png!150x150','http://images.jjl.cn/ugc/2018/0810/20180810201516824.png!150x150','http://images.jjl.cn/ugc/2018/0810/20180810201516824.png!150x150','http://images.jjl.cn/ugc/2018/0810/20180810201516824.png!150x150'],
      tableData: [{
        viewNumber: 100,
        forwardNumber: 100,
        shareNumber: 1001,
        collectionNumber: 100,
        commentNumber: 1001,
        fabulousNumber: 100,
        rewardNumber: 100,
        rewardMoney: 200
      }],
      dialogFormVisible: false,
      dialogForm: {
        articleId: '',
        title: ''
      }
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
    },
    handleDelete () {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    cancel () {
      this.$router.push({name: 'article'})
    }
  }
}
</script>

<style scoped>
  .nav{
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px;
  }
  .article-ul{
    border:1px solid #dcdcdc;
    display: flex;
    width:850px;
    flex-wrap: wrap;
  }
  .article-ul li{
    width:150px;
    height:150px;
    margin:10px;
    margin-right:0;
  }
  .btn-box{
    display: flex;
    justify-content: center;
  }
</style>
