<template>
  <div>
    <el-container>
      <el-header class="home-header">
        <span id="home-title">AI客户访谈助手</span>
        <el-input v-model="customerName" placeholder="请输入客户姓名" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-dropdown class="home-user" placement="bottom-end" @command="handleCommand">
          <span>欢迎，{{ user.account }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside class="contain-aside" width="200px">
          <el-menu router>
            <el-submenu index="/">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>访谈对象管理</span>
              </template>
              <el-menu-item index="/counselorlist">咨询师列表</el-menu-item>
              <el-menu-item index="/customerlist">客户列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="/interviewlist">
              <i class="el-icon-menu"></i>
              <span slot="title">访谈历史记录</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  data() {
    return {
      user: {},
      customerName: ''
    }
  },
  created() {
    this.user = this.$store.state.user
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$store.dispatch("logout").then(() => {
          this.$router.push({
            name: 'LoginPage'
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.home-header {
  width: 100%;
  height: 50px;
  background: rgb(198, 221, 252);
  display: flex;
  align-items: center;
}

.home-user {
  width: 110px;
  line-height: 50px;
  position: fixed;
  right: 10px;
}

.input-with-select {
  width: 200px;
  position: fixed;
  right: 140px;
}

#home-title {
  line-height: 50px;
  font-size: 2em;
}

.contain-aside >>> .el-menu {
  overflow: hidden;
  border-right: 0;
}
</style>
