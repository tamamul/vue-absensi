<template>
	<!-- Page Wrapper -->
	<div class="flex h-screen overflow-hidden bg-[#F1F5F9]">
		<!-- Sidebar -->
		<Sidebar :visible="visible"></Sidebar>
		<!-- Content Area -->
		<div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
			<!-- Navbar -->
			<Navbar></Navbar>
			<!-- Main Content Area -->
			<RouteView></RouteView>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			visible: false,
		}
	}
}
</script>

<style>

</style>