<template>
	NotFound
	<RouterLink to="dashboard" v-show="token">Kembali ke Dashboard</RouterLink>
	<RouterLink to="login" v-show="!token">Login</RouterLink>
</template>

<script>
export default {
	name:'NotFound',
	inject:['default'],
	data() {
		return {
			token: localStorage.getItem('token')
		}
	},
	methods: {
	},
	mounted() {
	},
}
</script>