<template>
<div>
    <div>
        <topnav></topnav>
    </div>
    <div>
        <div>
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
