<template>
	<!-- Page Wrapper -->
	<div class="flex h-screen overflow-hidden bg-[#F1F5F9]">

		<!-- Sidebar -->
		<Sidebar :sidebarToggle="sidebarToggle" @toggleSidebar="callback"></Sidebar>

		<!-- Content Area -->
		<div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

			<!-- Navbar --> 
			<Navbar @toggleSidebar="callback"></Navbar>

			<!-- Main Content Area -->
			<div class="grid grid-cols-12 gap-5 m-5">
				<slot></slot>
			</div>

		</div>

	</div>
</template>

<script>
export default {
	data() {
		return {
			// visible: false,
			sidebarToggle: false,
		}
	},
	methods: {
		callback () {
			this.sidebarToggle = !this.sidebarToggle;
			// console.log('halo')
		}
	}
}
</script>

<style>

</style>