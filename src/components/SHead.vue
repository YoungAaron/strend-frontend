<template>
    <div>
        <el-row>
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="1">11111111</el-menu-item>
              <el-menu-item index="2">22222222</el-menu-item>
              <el-menu-item index="3">33333333</el-menu-item>
              <el-menu-item index="4">44444444</el-menu-item>
            </el-menu>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'SHead',
    data: function() {
        return {
            activeIndex: '1',
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
}
</script>