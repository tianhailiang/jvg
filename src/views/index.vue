<template>
<div>
    <div>
        <top-nav></top-nav>
    </div>
    <el-row>
        <div>
            <side-nav></side-nav>
        </div>
        <router-view></router-view>
    </el-row>
</div>
</template>
<script>
import TopNav from '@/components/Nav.vue'
import SideNav from '@/components/SideNav.vue'

export default {
  components: {
    TopNav,
    SideNav
  }
}
</script>
<style>

</style>
