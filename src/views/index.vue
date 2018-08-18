<template>
<div>
    <div>
        <top-nav></top-nav>
    </div>
    <div>
        <div>
            <side-nav></side-nav>
        </div>
        <router-view></router-view>
    </div>
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
