<template>
  <div>
    <el-container>
      <el-header class="home-header">
        <span id="home-title">客情智探</span>
        <el-input v-model="customerName" placeholder="请输入客户姓名" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleQuery"></el-button>
        </el-input>
        <el-dropdown class="home-user" placement="bottom-end" @command="handleCommand">
          <span>欢迎，{{ user.account }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="information">个人信息管理</el-dropdown-item>
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container class="home-contain">
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
            <el-menu-item index="/interviewmanager">
              <i class="el-icon-menu"></i>
              <span slot="title">访谈管理</span>
            </el-menu-item>
            <el-menu-item index="/interviewRecordsList">
              <i class="el-icon-menu"></i>
              <span slot="title">访谈记录列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="contain-main">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="showBread">{{ $route.meta.title }}</el-breadcrumb-item>
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
    data () {
      return {
        user: {},
        customerName: '',
      }
    },
    computed: {
      showBread () {
        return this.$route.path !== '/'
      }
    },
    created () {
      this.user = this.$store.state.user
    },
    methods: {
      handleCommand (command) {
        if (command === 'logout') {
          this.$store.dispatch("logout").then(() => {
            this.$router.push({
              name: 'LoginPage'
            })
          })
        } else if (command === 'information') {
          this.$router.push({
            name: 'PersonInformation'
          })
        }
      },
      handleQuery () {
        this.$router.push({
          name: 'CounselorList',
          query: {
            name: this.customerName
          }
        })
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
  position: fixed;
  z-index: 2;
  box-shadow: 0px 4px 8px -4px #000;
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

.home-contain {
  margin-top: 60px;
  height: 100vh;
}

.contain-aside {
  display: flex;
  position: fixed;
  height: 100vh;
  box-shadow: 3px 0 8px -4px #000;
  z-index: 2;
}

.contain-aside>>>.el-menu {
  width: 100%;
  overflow: hidden;
  border-right: 0;
}

.contain-main {
  margin-left: 200px;
}
</style>