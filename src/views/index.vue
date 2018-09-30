<template>
  <div>
    <el-row>
        <div>
            <side-nav></side-nav>
        </div>
        <top-nav></top-nav>
        <router-view></router-view>
    </el-row>
  </div>
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

</style>
