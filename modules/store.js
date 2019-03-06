export default {
	site: {
		title: 'xChat',
		logo: '',
		description: "A Firebase + Nuxt.js Chat App"
	},
	user: {
		displayName: '',
		email: '',
		photoURL: '',
		uid: null
	},
	chat: {
		input: '',
		messages: []
	},
	menu: {
		show: false,
		links: [			
		{
			name: 'Chat',
			icon: 'fa fa-comments',
			action: {
				type: 'route',
				value: '/'
			}
		},
		{
			name: 'Settings',
			icon: 'fa fa-cog',
			action: {
				type: 'route',
				value: '/settings'
			}
		},																	
		{
			name: 'Sign In',
			icon: 'fa fa-sign-in-alt',
			action: {
				type: 'login',
				value: 'login'
			}
		},
		{
			name: 'Sign Off',
			icon: 'fa fa-sign-out-alt',
			action: {
				type: 'logout',
				value: 'logout'
			}
		},														
	]
	},
	route: {
		path: ''
	}	
};