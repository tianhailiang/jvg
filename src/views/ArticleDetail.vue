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
    </el-form>
  </div>
</template>

<script>
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
      artcileContent: '<p>一直以来，金融学都是中国学生赴美留学的热门专业，一方面是因为商科专业大都有着良好的就业前景和薪资水平</p>'
    }
  }
}
</script>

<style>
  .nav{
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px;
  }
</style>
