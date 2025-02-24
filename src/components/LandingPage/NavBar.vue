<template>
	<div class="super-z fixed top-0 left-0 right-0">
		<div
			class="sm:flex font-semibold text-center sm:text-left bg-blue-500 text-white px-8 md:px-24 justify-between text-sm py-3">
			<a href="#" class="cursor-pointer underline md:text-base sm:text-sm text-xs">celebesdigital@gmail.com</a>
			<br />

			<a href="https://api.whatsapp.com/send/?phone=6282292877750&text&type=phone_number&app_absent=0"
				class="cursor-pointer md:text-base sm:text-sm text-xs">Hubungi kami +62 822-9287-7750</a>
		</div>

		<nav class="bg-white border-gray-200 border-b border-b-slate-300">
			<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-10 md:px-14">
				<a href="" class="flex items-center rtl:space-x-reverse">
					<img src="/public/asset/LOGO-ABSENKI.png" class="sm:h-6 h-4" alt="Absensi Logo" />
					<p class="font-bold text-lg sm:text-2xl text-blue-500 mx-1">ABSENKI'</p>
				</a>

				<div class="flex">

					<RouterLink to="/login" class="md:hidden block">
						<Button label="Log In"
							class="sm:px-8 px-6 sm:text-base text-xs hover:bg-white border-2 hover:text-blue-500 bg-blue-500"></Button>
					</RouterLink>

					<Button label="Right" @click="openPosition('right')" severity="secondary"
						class="bg-white block w-fit md:hidden border-none justify-end sm:ml-2">
						<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
							viewBox="0 0 17 14">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M1 1h15M1 7h15M1 13h15" />
						</svg>
					</Button>

				</div>

				<div class="hidden w-full md:block md:w-auto" id="navbar-default">
					<ul
						class="font-semibold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
						<li class="my-auto">
							<a @click="scrollTo('about')"
								class="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 transition-all">Tentang
								Kami</a>
						</li>
						<li class="my-auto">
							<a @click="scrollTo('fitur')"
								class="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 transition-all">Fitur</a>
						</li>
						<li class="my-auto">
							<a @click="scrollTo('price')"
								class="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 transition-all">Harga</a>
						</li>
						<li class="my-auto">
							<a @click="scrollTo('FAQ')"
								class="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 transition-all">FAQ</a>
						</li>
						<li class="my-auto">
							<a @click="scrollTo('kontak')"
								class="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 transition-all">Kontak</a>
						</li>
						<li>
							<Button 
								label="Log In"
								:loading="loadingCheck"
								@click="checkToken()"
								class="px-8 hover:bg-white border-2 hover:text-blue-500 bg-blue-500">
							</Button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</div>

	<div class="card top-0">
		<Dialog v-model:visible="visible" class="top-0 bottom-0" header=" " :style="{ width: '25rem' }"
			:position="position" :modal="true" :draggable="false">
			<a @click="scrollTo('about')"
				class="text-surface-500 dark:text-surface-400 block mb-8 cursor-pointer font-semibold hover:text-blue-500 transition-all">Tentang
				Kami</a>
			<a @click="scrollTo('fitur')"
				class="text-surface-500 dark:text-surface-400 block mb-8 cursor-pointer font-semibold hover:text-blue-500 transition-all">Fitur</a>
			<a @click="scrollTo('price')"
				class="text-surface-500 dark:text-surface-400 block mb-8 cursor-pointer font-semibold hover:text-blue-500 transition-all">Harga</a>
			<a @click="scrollTo('FAQ')"
				class="text-surface-500 dark:text-surface-400 block mb-8 cursor-pointer font-semibold hover:text-blue-500 transition-all">FAQ</a>
			<a @click="scrollTo('kontak')"
				class="text-surface-500 dark:text-surface-400 block mb-8 cursor-pointer font-semibold hover:text-blue-500 transition-all">Kontak</a>
		</Dialog>
	</div>
</template>

<script setup>
import { ref } from "vue";

const position = ref("center");
const visible = ref(false);

const openPosition = (pos) => {
	position.value = pos;
	visible.value = true;
};
</script>

<script>
import router from '@/router'
import { useAuthStore } from '@/stores/auth';

export default {
	name: 'Home',
	inject: ['default'],
	data() {
		return {
			authStore: useAuthStore(),
			token: localStorage.getItem('token'),
			loadingCheck: false,
		}
	},
	methods: {
		scrollTo(targetId) {
			const target = document.getElementById(targetId);
			if (target) {
				target.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		},
		async goToDashboard() {
            if (this.token) {
                if (this.authStore.userRole === 1) { 
                    router.push({ name: 'admin-dashboard' });
                } else { 
                    router.push({ name: 'user-dashboard' });
                }
            }
        },
		checkToken() {
			this.loadingCheck = true
			if (this.token) {
				this.goToDashboard();
			} else {
				router.push({ name: 'login' });
			}
			this.loadingCheck = false
		},
		async created() {
			if (!this.authStore.authStore) {
				await this.authStore.getUser();
			}
		},
		async goToDashboard() {
			if (this.token) {
				if (this.authStore.userRole === 1) {
					router.push({ name: 'admin-dashboard' });
				} else {
					router.push({ name: 'user-dashboard' });
				}
			}
		}
	},
	async mounted() {
		await this.created();
	},
}
</script>

<style scoped>
.super-z {
	z-index: 100;
}
</style>
