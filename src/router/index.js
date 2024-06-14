import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: "history",
  routes: [
		{
			path: '/',
			name: 'HomePage',
			component: () => import('@/views/HomePage'),
			meta: {
				auth: true
			},
			children: [
				{
					path: 'counselorlist',
					name: 'CounselorList',
					component: () => import('@/views/counselor/CounselorList'),
					meta: {
						auth: true,
						title: '咨询师列表'
					}
				},
				{
					path: 'customerlist',
					name: 'CustomerList',
					component: () => import('@/views/customer/CustomerList'),
					meta: {
						auth: true,
						title: '客户列表'
					}
				},
        {
					path: 'customerAnalysisEdit',
					name: 'CustomerAnalysisEdit',
					component: () => import('@/views/customer/CustomerAnalysisEdit'),
					meta: {
						auth: true,
						title: '客户信息编辑'
					}
				},
        {
					path: 'customerAnalysisView',
					name: 'CustomerAnalysisView',
					component: () => import('@/views/customer/CustomerAnalysisView'),
					meta: {
						auth: true,
						title: '客户信息查看'
					}
				},
				{
					path: 'interviewlist',
					name: 'InterviewList',
					component: () => import('@/views/interview/InterviewList'),
					meta: {
						auth: true,
						title: '访谈记录列表'
					}
				},
				{
					path: '/information',
					name: 'PersonInformation',
					component: () => import('@/views/PersonInformation'),
					meta: {
						auth: false,
						title: '个人信息管理'
					}
				}
			]
		},
    {
      path: '/loginpage',
      name: 'LoginPage',
      component: () => import('@/views/LoginPage'),
			meta: {
				auth: false
			}
    },
		{
			path: '/signup',
			name: 'SignUp',
			component: () => import('@/views/SignUp'),
			meta: {
				auth: false
			}
		},
		{
			path: '/video',
			name: 'WebSocketVideo',
			component: () => import('@/views/WebSocketVideo'),
			meta: {
				auth: true
			}
		}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
		var result = router.app.$options.store.getters.status
		localStorage.getItem('account')
    if (result === 'login') {
			next()
    } else {
			next({
				path: '/loginpage',
				query: {
					url: to.fullpath
				}
			})
    }
  } else {
		next()
  }
})

export default router