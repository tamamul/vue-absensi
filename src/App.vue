<template>
	<!-- Page Wrapper -->
	<div class="flex h-screen overflow-hidden bg-[#F1F5F9]">

		<!-- Sidebar -->
		<SidebarElite :visible="visible"></SidebarElite>

		<!-- Content Area -->
		<div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

			<!-- Navbar -->
			<Navbar></Navbar>

			<!-- Main Content Area -->
			<div class="grid grid-cols-12 gap-5 m-5">
				<RouterView></RouterView>
			</div>

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