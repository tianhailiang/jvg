<template>
<div>
    <div>
        <topnav></topnav>
    </div>
    <div>
        <div class="nav_left">
            <side-nav></side-nav>
        </div>
    </div>
    
</div>
</template>
<script>
import topnav from '../components/nav.vue'
import SideNav from '../components/SideNav.vue'

export default {
  components: {
    topnav,
    SideNav
  }
}
</script>
<style>
.nav_left{
    width: 300px;
    border: 1px solid #eee;
    padding: 10px;
    float: left;
}
</style>
