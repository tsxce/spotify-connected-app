<script setup>
import { defineProps } from "vue";
// import Account from 'vue-material-design-icons/Account.vue'

defineProps({
  itemName: String,
  isClicked: Boolean,
});
</script>

<template>
  <div :class="`sidebar-menu-item ${isClicked ? 'active' : ''}`">
    <!-- <MenuIcon />
    <Account /> -->
    {{ itemName }}
  </div>
</template>

<style>
.sidebar-menu-item {
  color: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  height: 72px;
  line-height: 72px;
}

.sidebar-menu-item.active {
  background-color: #131313;
  border-left: 3px solid #24d34e;
}

.sidebar-menu-item:hover {
  color: greenyellow;
}

@media only screen and (max-width: 600px) {
  .sidebar-menu-item {
    font-size: 14px;
    padding: 0 3px;
  }
  .sidebar-menu-item.active {
    background-color: #131313;
    border-left: none;
    border-top: 3px solid #24d34e;
  }
}
</style>
