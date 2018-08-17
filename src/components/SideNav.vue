<template>
  <el-menu class="" router>
    <el-menu-item index="">首页</el-menu-item>
    <el-menu-item index="">系统管理</el-menu-item>
    <el-submenu index="1">
      <template slot="title">用户管理</template>
      <el-menu-item-group>
        <template slot="title">人员管理</template>
        <el-menu-item index="">用户添加编辑页</el-menu-item>
        <el-menu-item index="">删除提示窗口</el-menu-item>
        <el-menu-item index="">禁用编辑窗口</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template slot="title">实名认证列表</template>
        <el-menu-item index="">实名认证信息详情页</el-menu-item>
        <el-menu-item index="">撤销提示窗口</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="">商品管理</el-menu-item>
    <el-menu-item index="">文章管理</el-menu-item>
    <el-menu-item index="">问答管理</el-menu-item>
    <el-menu-item index="">标签管理</el-menu-item>
    <el-menu-item index="">类目管理</el-menu-item>
    <el-menu-item index="">财务管理</el-menu-item>
    <el-menu-item index="">运营管理</el-menu-item>
    <el-menu-item index="">媒资管理</el-menu-item>
    <el-menu-item index="">数据中心</el-menu-item>

    <el-submenu index="2">
      <template slot="title">机构院校管理</template>
      <el-menu-item-group>
        <template slot="title">机构院校列表</template>
        <el-menu-item index="">机构院校新增/编辑页</el-menu-item>
        <el-menu-item index="">禁用编辑窗口</el-menu-item>
        <el-menu-item index="">删除编辑窗口</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template slot="title">机构院校审核列表</template>
        <el-menu-item index="">机构院校审核详情页</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">关注管理</template>
      <el-menu-item-group>
        <el-menu-item index="">关注管理列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="">私信管理</el-menu-item>
    <el-menu-item index="courseList">课程管理</el-menu-item>
    <el-menu-item index="">出版物管理</el-menu-item>
    <el-menu-item index="">订单管理</el-menu-item>
  </el-menu>
  
</template>
