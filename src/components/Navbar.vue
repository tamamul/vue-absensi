// TODO DARKMODE LOCAL STORAGE
<template>
	<!-- <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8"> -->
	<div class="w-full bg-white flex justify-between h-[80px] p-2 shadow-md rounded-none">
			<img class="" src="../assets/app-logo.png" alt="">
		<div class="h-full">
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// ? Aktifkan kalau mau dark mode
			// darkIcon: ['pi pi-sun', 'pi pi-moon'],
			// darkIcon: 'pi pi-sun',
			// getTheme: 'light',
			// getLocalStorage: JSON.parse(localStorage.getItem('dark')),
		};
	},
	methods: {
		// ? store dark mode to local storage
		// darkToggle() {
		// 	const element = document.querySelector('html');
		// 	let isDark

		// 	element.classList.toggle('dark');

		// 	if (element.classList.contains('dark')) {
		// 		isDark = "dark"
		// 		this.getTheme = isDark;
		// 	} else {
		// 		isDark = "light"
		// 		this.getTheme = isDark;
		// 	}

		// 	localStorage.setItem('dark', JSON.stringify(this.getTheme));
		// },
	},
	computed: {
		// checkDark () {
			// this.getLocalStorage === 'light' ? this.darkIcon[0] : this.darkIcon[1]
			// if (this.getLocalStorage == 'light'){
			// 	return this.darkIcon
			// } else {
			// 	this.darkIcon = 'pi pi-moon'
			// 	return this.darkIcon
			// }
		// }
	}
};

</script>

<style>

</style>