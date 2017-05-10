<template>
  <div>
    <!--组件借还过渡效果-->
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {

}
</script>

<style lange='scss'>
@import './style/common';
/*swipe样式写在msite不起作用*/
.mint-swipe-indicator.is-active {
	background-color: #007aff;
}
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity .3s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>
