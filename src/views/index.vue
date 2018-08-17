<template>
<el-row>
    <div class="nav_top">
        <top-nav></top-nav>
    </div>
    <div>
        <div class="nav_left">
            <side-nav></side-nav>
        </div>
    </div>
    
</el-row>
</template>
<script>
import TopNav from '@/components/nav.vue'
import SideNav from '@/components/SideNav.vue'

export default {
  components: {
    TopNav,
    SideNav
  }
}
</script>
<style>
.nav_top{
    margin: 20px;
}
.nav_left{
    width: 300px;
    border: 1px solid #eee;
    padding: 10px;
    float: left;
}
</style>
