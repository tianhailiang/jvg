<template>
  <el-menu class="nav_left" router 
  :default-active="activeIndex" background-color="rgb(48, 65, 86)">
    <el-menu-item index="/main"><i class="el-icon-menu"></i>首页</el-menu-item>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-menu"></i>权限角色管理</template>
      <el-menu-item index="/jurisdiction">权限管理</el-menu-item>
      <el-menu-item index="/role">角色管理</el-menu-item>
      <el-menu-item index="/member">成员管理</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
      <el-menu-item index="/sensitive">敏感词管理</el-menu-item>
      <el-menu-item index="/seoList">SEO管理</el-menu-item>
      <el-menu-item index="/journal">日志管理</el-menu-item>
      <el-menu-item index="/whiteList">白名单管理</el-menu-item>
      <!-- <el-menu-item index="/pageList">页面管理</el-menu-item> -->
      <el-menu-item index="/apiList">API管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
        <el-menu-item index="/personnel">人员列表</el-menu-item>
        <el-menu-item index="/realName">实名认证列表</el-menu-item>
    </el-submenu>
    <!-- <el-menu-item index="4">商品管理</el-menu-item> -->
    <el-submenu index="5">
      <template slot="title"><i class="el-icon-menu"></i>文章管理</template>
      <el-menu-item index="/article">文章列表</el-menu-item>
      <el-menu-item index="/examine">文章审核管理</el-menu-item>
      <el-menu-item index="/reward">文章打赏列表</el-menu-item>
      <el-menu-item index="/comment">文章评论列表</el-menu-item>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title"><i class="el-icon-menu"></i>问答管理</template>
      <el-menu-item index="/topicList">话题列表</el-menu-item>
      <el-menu-item index="/topicDetail">话题详情</el-menu-item>
      <el-menu-item index="/answer">问答列表</el-menu-item>
    </el-submenu>
    <el-submenu index="7">
      <template slot="title"><i class="el-icon-menu"></i>标签管理</template>
      <el-menu-item index="/label">标签列表</el-menu-item>
      <el-menu-item index="/labelRelationship">标签关系列表</el-menu-item>
      <el-menu-item index="/labelDegree">标签热度列表</el-menu-item>
    </el-submenu>
    <!-- <el-menu-item index="8">类目管理</el-menu-item>
    <el-menu-item index="9">财务管理</el-menu-item> -->
    <!-- <el-submenu index="10"> -->
      <!-- <template slot="title">运营管理</template> -->
      <el-submenu index="10-1">
        <template slot="title"><i class="el-icon-menu"></i>广告管理</template>
        <el-menu-item index="/advertList">广告位列表</el-menu-item>
        <!-- <el-menu-item index="/advertSpaceDetail">广告位详情（平台+固定+单页/轮播）</el-menu-item>
        <el-menu-item index="/advertSpaceDetail_list">广告位详情（平台+列表+单页）</el-menu-item>
        <el-menu-item index="/advertSpaceDetail_item">广告位详情（平台+类目+单页）</el-menu-item> -->
        <el-menu-item index="/advertListCopy">广告列表</el-menu-item>
        <!-- <el-menu-item index="/advertDetail">广告详情（平台+固定）</el-menu-item>
        <el-menu-item index="/advertDetailPlatform_list">广告详情 (平台+列表)</el-menu-item>
        <el-menu-item index="/advertDetailPlatform_item">广告详情 (平台+类目）</el-menu-item> -->
        <el-menu-item index="/advertReview">广告审核管理</el-menu-item>
      </el-submenu>
      <el-submenu index="10-2">
        <template slot="title"><i class="el-icon-menu"></i>底部导航管理</template>
        <el-menu-item index="/bottomNavigation">底部导航编辑</el-menu-item>
      </el-submenu>
      <el-submenu index="10-3">
        <template slot="title"><i class="el-icon-menu"></i>通知管理</template>
        <el-menu-item index="/notice">通知列表</el-menu-item>
        <el-menu-item index="/noticeDetail">通知详情</el-menu-item>
      </el-submenu>
      <el-submenu index="10-4">
        <template slot="title"><i class="el-icon-menu"></i>留言管理</template>
        <el-menu-item index="/leave">留言答疑列表</el-menu-item>
        <el-menu-item index="/report">举报列表</el-menu-item>
      </el-submenu>
      <el-submenu index="10-5">
        <template slot="title"><i class="el-icon-menu"></i>推荐位管理</template>
        <el-menu-item index="/recommendedBit">推荐位列表</el-menu-item>
        <el-menu-item index="/recommendedBitDetail">推荐位详情</el-menu-item>
      </el-submenu>
      <el-submenu index="10-6">
        <template slot="title"><i class="el-icon-menu"></i>分成返利管理</template>
        <el-menu-item index="/divideIntoRules">分成规则</el-menu-item>
        <el-menu-item index="/rebateRule">返利规则列表</el-menu-item>
      </el-submenu>
      <el-submenu index="10-7">
        <template slot="title"><i class="el-icon-menu"></i>运营活动管理</template>
        <el-menu-item index="/operational">运营活动列表</el-menu-item>
        <el-menu-item index="/operationalActivityDetail">运营活动详情</el-menu-item>
        <el-menu-item index="/operationalExamine">运营活动审核管理</el-menu-item>
      </el-submenu>
      <el-submenu index="10-8">
        <template slot="title"><i class="el-icon-menu"></i>优惠券管理</template>
        <el-menu-item index="/couponList">优惠券列表</el-menu-item>
        <el-menu-item index="/couponDetails">优惠券详情</el-menu-item>
        <el-menu-item index="/couponReview">优惠券审核管理</el-menu-item>
      </el-submenu> 
      <el-submenu index="10-9">
        <template slot="title"><i class="el-icon-menu"></i>预约管理</template>
        <el-menu-item index="/scheduledEventList">预约活动列表</el-menu-item>
        <el-menu-item index="/userAppointmentList">用户预约列表</el-menu-item>
      </el-submenu>
      <el-submenu index="10-10">
        <template slot="title"><i class="el-icon-menu"></i>会员管理</template>
        <el-menu-item index="/ruleManagement">VIP会员规则管理</el-menu-item>
        <el-menu-item index="/integralRule">会员积分规则管理</el-menu-item>
        <el-menu-item index="/membershipLevel">会员等级规则管理</el-menu-item>
        <el-menu-item index="/lecturerPrestige">讲师声望值规则</el-menu-item>
        <el-menu-item index="/lecturerStatistics">讲师声望值统计</el-menu-item>
        <el-menu-item index="/memberList">会员列表</el-menu-item>
        <!-- <el-menu-item index="/memberDetails">会员详情</el-menu-item> -->
      </el-submenu>
    <!-- </el-submenu> -->
    <el-submenu index="13">
      <template slot="title"><i class="el-icon-menu"></i>机构院校管理</template>
        <el-menu-item index="/institutions">机构院校列表</el-menu-item>
        <el-menu-item index="/institutionsExamine">机构院校审核列表</el-menu-item>
    </el-submenu>
    <el-submenu index="14">
      <template slot="title"><i class="el-icon-menu"></i>关注管理</template>
      <el-menu-item index="/follow">关注管理列表</el-menu-item>
    </el-submenu>
    <el-submenu index="15">
      <template slot="title"><i class="el-icon-menu"></i>私信管理</template>
      <el-menu-item index="/privateLetter">私信列表</el-menu-item>
    </el-submenu>
    <el-submenu index="16">
      <template slot="title"><i class="el-icon-menu"></i>课程管理</template>
      <el-menu-item index="/courseList">课程列表</el-menu-item>
      <el-menu-item index="/courseComment">课程评论列表</el-menu-item>
      <!-- <el-menu-item index="/courseCommentDetail">课程评论详情页</el-menu-item> -->
      <el-menu-item index="/courseReview">课程审批管理</el-menu-item>
      <!-- <el-menu-item index="">删除提示窗口</el-menu-item>
      <el-menu-item index="">冻结编辑窗口</el-menu-item> -->
    </el-submenu>
    <el-submenu index="17">
      <template slot="title"><i class="el-icon-menu"></i>出版物管理</template>
      <el-menu-item index="/publishingList">出版物列表</el-menu-item>
      <!-- <el-menu-item index="/publishingDetail">出版物详情页</el-menu-item> -->
      <el-menu-item index="/publishingCommentList">出版物评论列表</el-menu-item>
      <el-menu-item index="/publishingReview">出版物审批管理</el-menu-item>
      <!-- <el-menu-item index="">删除提示窗口</el-menu-item>
      <el-menu-item index="">冻结编辑窗口</el-menu-item> -->
    </el-submenu>
    <el-submenu index="18">
      <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
      <el-menu-item index="/orderList">订单列表</el-menu-item>
      <!-- <el-menu-item index="/orderDetail">订单详情页</el-menu-item> -->
      <el-menu-item index="/orderRefund">订单退款列表</el-menu-item>
      <!-- <el-menu-item index="/orederRefundDetail">订单退款详情</el-menu-item> -->
    </el-submenu>
    <el-submenu index="19">
      <template slot="title"><i class="el-icon-menu"></i>数据中心</template>
      <el-menu-item index="/dataTemplate">数据看板</el-menu-item>
      <el-menu-item index="/userAnalysis">用户分析</el-menu-item>
      <el-menu-item index="/businessAnalysis">业务分析</el-menu-item>
    </el-submenu>
    <el-submenu index="20">
        <template slot="title"><i class="el-icon-menu"></i>帮助中心</template>
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
    this.activeIndex = window.location.href.split(window.location.host)[1]
    if(this.activeIndex.includes('article')){
      this.activeIndex = '/article' /* 文章列表和文章详情匹配一个路由 */
    }
    if(this.activeIndex.includes('reward')){
      this.activeIndex = '/reward' /* 打赏列表和打赏详情匹配一个路由 */
    }
    if(this.activeIndex.includes('comment')){
      this.activeIndex = '/comment' /* 打赏列表和打赏详情匹配一个路由 */
    }
    if(this.activeIndex.includes('topicDetail')){
      this.activeIndex = '/topicDetail' /* 话题详情匹配一个路由 */
    }
    if(this.activeIndex.includes('answer')){
      this.activeIndex = '/answer' /* 话题列表和话题详情匹配一个路由 */
    }
    if(this.activeIndex.includes('noticeDetail')){
      this.activeIndex = '/noticeDetail' /* 通知详情新建和通知详情编辑匹配一个路由 */
    }
    if(this.activeIndex.includes('recommendedBitDetail')){
      this.activeIndex = '/recommendedBitDetail' /* 通知推荐位详情新建和推荐位详情编辑匹配一个路由 */
    }
    if(this.activeIndex.includes('operationalActivityDetail')){
      this.activeIndex = '/operationalActivityDetail' /* 运营活动详情新建和运营活动详情编辑匹配一个路由 */
    }
    if(this.activeIndex.includes('/rebateRegister')){
      this.activeIndex = '/rebateRule' /* 返利规则列表和返利新建注册匹配一个路由 */
    }
  }
}
</script>
<style >
.nav_left{width: 240px;float: left;}
.nav_left.el-menu{border-right:transparent; position:fixed; top:0;bottom:0;overflow: auto;}
.nav_left.el-menu .el-menu-item{ color: rgb(191, 203, 217)!important;}
.nav_left.el-menu .el-menu-item:hover{ background-color: #1f2d3d!important; }
.el-menu-item.el-aside{color: rgb(191, 203, 217)!important;}
.nav_left.el-menu .el-submenu .el-submenu__title{color: rgb(191, 203, 217)!important;}
.nav_left.el-menu .el-submenu .el-submenu__title:hover{background-color: #1f2d3d!important;}
.nav_left.el-menu .el-menu-item.is-active {background-color: #1f2d3d!important; color: rgb(64, 158, 255)!important;}
.nav_left.el-menu::-webkit-scrollbar{width: 10px;}
.nav_left.el-menu::-webkit-scrollbar-thumb{border-radius:5px;box-shadow: inset 0 0 5px rgba(0,0,0,0.4);background: rgba(0,0,0,0.2);}
</style>
