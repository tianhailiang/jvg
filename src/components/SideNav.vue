<template>
  <el-menu class="nav_left" router :default-active="activeIndex">
    <el-menu-item index="/main">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">系统管理</template>
      <el-menu-item index="/sensitive">敏感词管理</el-menu-item>
      <el-menu-item index="/seo">SEO管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">用户管理</template>
        <el-submenu index="3-1">
          <template slot="title">人员列表</template>
          <el-menu-item index="/personnel">人员列表</el-menu-item>
          <el-menu-item index="/userEditors">用户添加编辑页</el-menu-item>
        </el-submenu>
        <el-submenu index="3-2">
          <template slot="title" index="">实名认证列表</template>
          <el-menu-item index="/realName">实名认证列表</el-menu-item>
          <el-menu-item index="/realNameDetails">实名认证信息详情页</el-menu-item>
        </el-submenu>
    </el-submenu>
    <el-menu-item index="4">商品管理</el-menu-item>
    <el-submenu index="5">
      <template slot="title">文章管理</template>
      <el-menu-item index="/article">文章列表</el-menu-item>
      <el-menu-item index="/examine">文章审核管理</el-menu-item>
      <el-menu-item index="/reward">文章打赏列表</el-menu-item>
      <el-menu-item index="/comment">文章评论列表</el-menu-item>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title">问答管理</template>
      <el-menu-item index="/interlocution">话题列表</el-menu-item>
      <el-menu-item index="/answer">问答列表</el-menu-item>
    </el-submenu>
    <el-submenu index="7">
      <template slot="title">标签管理</template>
      <el-menu-item index="/label">标签列表</el-menu-item>
      <el-menu-item index="/labelRelationship">标签关系列表</el-menu-item>
      <el-menu-item index="/labelDegree">标签热度列表</el-menu-item>
    </el-submenu>
    <el-menu-item index="8">类目管理</el-menu-item>
    <el-menu-item index="9">财务管理</el-menu-item>
    <el-submenu index="10">
      <template slot="title">运营管理</template>
        <el-submenu index="10-1">
          <template slot="title">广告管理</template>
          <el-submenu index="10-1-1">
            <template slot="title" index="">广告位列表</template>
            <el-menu-item index="">删除提示窗口</el-menu-item>
          </el-submenu>
          <el-menu-item index="">广告位详情</el-menu-item>
        </el-submenu>
        <el-submenu index="10-2">
          <template slot="title">通知管理</template>
          <el-menu-item index="/notice">通知列表</el-menu-item>
        </el-submenu>
    </el-submenu>
    <el-menu-item index="11">媒资管理</el-menu-item>
    <el-menu-item index="12">数据中心</el-menu-item>

    <el-submenu index="13">
      <template slot="title">机构院校管理</template>
        <el-submenu index="13-1">
          <template slot="title">机构院校列表</template>
          <el-menu-item index="/institutions">机构院校列表</el-menu-item>
          <el-menu-item index="/institutionsEditors">机构院校新增/编辑页</el-menu-item>
        </el-submenu>
        <el-submenu index="13-2">
          <template slot="title" index="">机构院校审核列表</template>
          <el-menu-item index="/institutionsExamine">机构院校审核列表</el-menu-item>
          <el-menu-item index="/institutionsDetails">机构院校审核详情页</el-menu-item>
        </el-submenu>
    </el-submenu>
    <el-submenu index="14">
      <template slot="title">关注管理</template>
      <el-menu-item index="/follow">关注管理列表</el-menu-item>
    </el-submenu>
    <el-submenu index="15">
      <template slot="title">私信管理</template>
      <el-menu-item index="/private_letter">私信列表</el-menu-item>
    </el-submenu>
    <el-submenu index="16">
      <template slot="title">课程管理</template>
      <el-menu-item index="/courseList">课程列表</el-menu-item>
      <el-menu-item index="/courseDetail">课程详情页</el-menu-item>
        <el-submenu index="16-1">
          <template slot="title" index="">课程评论列表</template>
          <el-menu-item index="/courseCommentDetail">课程评论详情页</el-menu-item>
        </el-submenu>
      <el-menu-item index="/courseReview">课程审批管理</el-menu-item>
      <el-menu-item index="">删除提示窗口</el-menu-item>
      <el-menu-item index="">冻结编辑窗口</el-menu-item>
    </el-submenu>
    <el-submenu index="17">
      <template slot="title">出版物管理</template>
      <el-menu-item index="/publishingList">出版物列表</el-menu-item>
      <el-menu-item index="/publishingDetail">出版物详情页</el-menu-item>
        <el-submenu index="17-1">
          <template slot="title" index="/publishingCommentList">出版物评论列表</template>
          <el-menu-item index="/publishingCommentDetail">出版物评论详情页</el-menu-item>
        </el-submenu>
      <el-menu-item index="">出版物审批管理</el-menu-item>
      <el-menu-item index="">删除提示窗口</el-menu-item>
      <el-menu-item index="">冻结编辑窗口</el-menu-item>
    </el-submenu>
    <el-submenu index="18">
      <template slot="title">订单管理</template>
      <el-menu-item index="/orderList">订单列表</el-menu-item>
      <el-menu-item index="/orderDetail">订单详情页</el-menu-item>
      <el-menu-item index="/orderRefund">订单退款列表</el-menu-item>
      <el-menu-item index="/orederRefundDetail">订单退款详情</el-menu-item>
    </el-submenu>
    <el-submenu index="19">
      <template slot="title">数据中心</template>
      <el-menu-item index="/dataTemplate">数据看板</el-menu-item>
      <el-menu-item index="/userAnalysis">用户分析</el-menu-item>
      <el-menu-item index="/businessAnalysis">业务分析</el-menu-item>
    </el-submenu>
    <el-submenu index="20">
        <template slot="title">帮助中心</template>
        <el-menu-item index="/helpSectionList">帮助中心栏目列表</el-menu-item>
        <el-menu-item index="/helpProblemList">帮助中心问题列表</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: 'sideNav',
  data () {
    return {
      activeIndex:'/main'
    }
  },
  mounted () {
    this.activeIndex = window.location.href.split('http://localhost:8080')[1]
    if(this.activeIndex.includes('article')){
      this.activeIndex = '/article' /* 文章列表和文章详情匹配一个路由 */
    }
    if(this.activeIndex.includes('reward')){
      this.activeIndex = '/reward' /* 打赏列表和打赏详情匹配一个路由 */
    }
    if(this.activeIndex.includes('comment')){
      this.activeIndex = '/comment' /* 打赏列表和打赏详情匹配一个路由 */
    }
    if(this.activeIndex.includes('interlocution')){
      this.activeIndex = '/interlocution' /* 话题列表和话题详情匹配一个路由 */
    }
    if(this.activeIndex.includes('answer')){
      this.activeIndex = '/answer' /* 话题列表和话题详情匹配一个路由 */
    }
    if(this.activeIndex.includes('notice')){
      this.activeIndex = '/notice' /* 通知列表和通知详情匹配一个路由 */
    }
  }
}
</script>
<style scoped>
.nav_left{
  width: 250px;
  border: 1px solid #eee;
  padding: 10px;
  float: left;
  margin-left: 20px;
}
</style>
