<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
	</div>

	<div class="grid grid-cols-12 m-5 mb-24 lg:mb-5" v-else>
		<Card class="col-span-12 shadow-md">
			<template #title>
				<h2 class="mb-5">
					Admin Profile
				</h2>
			</template>
			<template #content>
				<div class="flex flex-col gap-5">
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-12 md:col-span-6 flex items-center gap-5">
							<Image :src="avatar" :alt="user.nama_lengkap" class="w-32 border border-white shadow-md items-center justify-center rounded-full" />
							<div>
								<p class="text-xl font-bold">{{ user.nama_lengkap ?? 'Muh. Mahatma Arrayyan' }}</p>
								<p class="text-xl">{{ user.jabatan ?? 'Frontend Dev' }}</p>
								<p class="text-base font-light">{{ user.alamat ?? 'Jl. Pendidikan Blok B5 No.08' }}</p>
							</div>
						</div>
						<div class="col-span-12 md:col-span-6 flex items-center gap-3 justify-center">
							<!-- <FileUpload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" /> -->
							<FileUpload mode="basic" class="py-3 px-4" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :auto="true" chooseLabel="Foto Profil" />
							<Button label="Hapus Foto" class="py-3 px-4" outlined severity="danger"></Button>
						</div>
					</div>

					<!-- <Divider /> -->

					<Tabs value="0" scrollable>
						<TabList>
							<Tab value="0">Ganti Password</Tab>
							<Tab value="1">Jadwal Kerja Umum</Tab>
						</TabList>
						<TabPanels>
							<TabPanel value="0">
								<form class="w-full grid grid-cols-12 gap-2">
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="email">Email <span class="text-red-500">*</span></label>
										<InputTextid v-model="email" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.email.$invalid" />
									</div>
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="password">Password <span class="text-red-500">*</span></label>
										<InputTextid v-model="password" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.password.$invalid" />
									</div>
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="password_confirm">Konfirmasi Password <span class="text-red-500">*</span></label>
										<InputTextid v-model="password_confirm" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.password_confirm.$invalid" />
									</div>

									<!-- CP itu Change Password  -->
									<div class="col-span-12">
										<Button label="Kirim" class="px-14 py-3" :loading="btnCPIsLoading" @click="kirim" />
									</div>
								</form>
							</TabPanel>

							TabJadwalKerjaUmum
						</TabPanels>
					</Tabs>

				</div>
			</template>
		</Card>
	</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
	name:'Profile',
	inject:['default'],
	data() {
		return {
			isAdmin: 0,
			authStore: useAuthStore(),
			isLoading: true,
			user: [],
			editPegawaiData: [],
			avatar: '',
            // Validation
            v$: useVuelidate(),
            hasValidated: false,
            // Form
            no: 1,
            formPost:false,
		}
	},
	methods: {
	},
	mounted() {
		this.isAdmin ? this.getUser() : this.isLoading = false
	},
}
</script>

<style>
.p-tabpanels{
	padding: 0;
}
</style>