<template>
	<div class="grid grid-cols-12 m-5 gap-5" v-if="isLoading">
		<ProgressSpinner />
		<!-- <Skeleton height="50vh" width="100%" class="col-span-12"></Skeleton> -->
	</div>
	<div class="grid grid-cols-12 m-5 gap-5" v-else>
		<Card class="col-span-12 shadow-md">
			<template #title>
				<div class="flex justify-between">
                    <h3>
						Shift Kerja
					</h3>
                    <div class="flex gap-2">
						<Button icon="pi pi-plus-circle" label="Tambah Shift Kerja" @click="openPost()"></Button>
                        <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                    </div>
                </div>
			</template>
			<template #content>
				<DataTable 
					:value="shift"
					paginator  
                    :rows="10" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"
                    scrollable 
                    tableStyle="min-width: 50rem"
				>
					<Column field="id_pegawai" header="No" />
                    <Column field="nama_shift" header="Nama Shift" style="min-width: 300px" class="capitalize" />
					<Column field="" header="Action" frozen alignFrozen="right">
                        <template #body="slotProps">
                            <div class="flex gap-2 bg-white">
                                <Button icon="pi pi-trash" severity="danger" aria-label="Notification" @click="delete($event, slotProps.data.id_pegawai)" />
                                <Button icon="pi pi-pencil" severity="info" aria-label="Notification" @click="edit(slotProps.data.id_pegawai)" />
                            </div>
                        </template>
                    </Column>
				</DataTable>
			</template>
		</Card>
	</div>

	<Dialog v-model:visible="visible" modal :header="dialogTitle" :style="{ width: '30rem' }">

		<!-- <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ dialogDeskripsi }}</span> -->
		<div :style="{ backgroundColor: warna }" class="rounded-md text-white py-3 mb-4 px-3 flex justify-between">
			<div>
				{{ nama_shift }}
			</div>
			<div class="flex items-center gap-2">
				<i class="pi pi-clock"></i>
				<p>{{ formattedTime(jam_masuk) }}-{{ formattedTime(jam_keluar) }}</p>
			</div>
		</div>
		
		<div class="grid grid-cols-12 gap-5 h-96 m-5" v-if="formIsLoading">
			<div class="col-span-12 w-full flex justify-center items-center">
				<ProgressSpinner />
			</div>
		</div>

        <form class="w-full grid grid-cols-12 gap-2" v-else>

			<div class="col-span-12 gap-1">
                <label class="max-h-6 col-span-12" for="nama_shift">Nama Shift <span class="text-red-500">*</span></label>
                <InputText id="nama_shift" v-model="nama_shift" class="w-full max-h-[46px]" :invalid="hasValidated && v$.nama_shift.$invalid" />
                <small v-if="hasValidated && v$.nama_shift.$error" class="text-red-500 w-full">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>

			<div class="col-span-12 grid grid-cols-12 gap-2">
				<div class="col-span-6 gap-1">
					<label class="max-h-6 col-span-12" for="jam_masuk">Jam Masuk <span class="text-red-500">*</span></label>
					<DatePicker inputId="jam_masuk" v-model="jam_masuk" timeOnly showIcon fluid iconDisplay="input">
						<template #inputicon="slotProps">
							<i class="pi pi-clock" @click="slotProps.clickCallback" />
						</template>
					</DatePicker>
					<small v-if="hasValidated && v$.jam_masuk.$error" class="text-red-500 w-full">Wajib Diisi</small>
					<small v-else class="invisible">...</small>
				</div>
	
				<div class="col-span-6 gap-1">
					<label class="max-h-6 col-span-12" for="jam_keluar">Jam Keluar <span class="text-red-500">*</span></label>
					<DatePicker inputId="jam_keluar" v-model="jam_keluar" timeOnly  showIcon fluid iconDisplay="input">
						<template #inputicon="slotProps">
							<i class="pi pi-clock" @click="slotProps.clickCallback" />
						</template>
					</DatePicker>
					<small v-if="hasValidated && v$.jam_keluar.$error" class="text-red-500 w-full">Wajib Diisi</small>
					<small v-else class="invisible">...</small>
				</div>
			</div>

			<div class="col-span-12 gap-1">
				<label class="max-h-6 col-span-12" for="toleransi_keterlambatan">Toleransi Keterlambatan <span class="text-red-500">*</span></label>
				<InputGroup>
					<InputNumber inputId="toleransi_keterlambatan" v-model="toleransi_keterlambatan" />
					<InputGroupAddon>Menit</InputGroupAddon>
				</InputGroup>
				<small v-if="hasValidated && v$.toleransi_keterlambatan.$error" class="text-red-500 w-full">Wajib Diisi</small>
				<small v-else class="invisible">...</small>
			</div>

			<div class="col-span-12 grid grid-cols-12 gap-2">
				<div class="col-span-6 gap-1">
					<label class="max-h-6 col-span-12" for="jam_istirahat_mulai">Jam Istirahat Mulai <span class="text-red-500">*</span></label>
					<DatePicker inputId="jam_istirahat_mulai" v-model="jam_istirahat_mulai" timeOnly showIcon fluid iconDisplay="input">
						<template #inputicon="slotProps">
							<i class="pi pi-clock" @click="slotProps.clickCallback" />
						</template>
					</DatePicker>
					<small v-if="hasValidated && v$.jam_istirahat_mulai.$error" class="text-red-500 w-full">Wajib Diisi</small>
					<small v-else class="invisible">...</small>
				</div>
	
				<div class="col-span-6 gap-1">
					<label class="max-h-6 col-span-12" for="jam_istirahat_selesai">Jam Istirahat Selesai <span class="text-red-500">*</span></label>
					<DatePicker inputId="jam_istirahat_selesai" v-model="jam_istirahat_selesai" timeOnly  showIcon fluid iconDisplay="input">
						<template #inputicon="slotProps">
							<i class="pi pi-clock" @click="slotProps.clickCallback" />
						</template>
					</DatePicker>
					<small v-if="hasValidated && v$.jam_istirahat_selesai.$error" class="text-red-500 w-full">Wajib Diisi</small>
					<small v-else class="invisible">...</small>
				</div>
			</div>

			<div class="col-span-12 flex flex-col gap-2">
				<label class="max-h-6 col-span-12" for="warna">Warna Background <span class="text-red-500">*</span></label>
				<ColorPicker v-model="warna" inputId="warna" format="hex" class="col-span-12" inline="" @change="ensureHashtag" />
				<small v-if="hasValidated && v$.warna.$error" class="text-red-500 w-full">Wajib Diisi</small>
				<small v-else class="invisible">...</small>
			</div>

            <div class="col-span-12 flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="close"></Button>
                <!-- <Button type="button" label="Edit" :loading="btnIsLoading" @click="editPegawai(id_pegawai)" v-if="!formPost"></Button> -->
                <Button type="button" label="Tambahkan" :loading="btnIsLoading" @click="post"></Button>
            </div>

        </form>

    </Dialog>
</template>

<script>
export default {
	name:'ShiftKerja',
	inject:['default'],
	data() {
		return {
			// Table
			shift: [],
			// Loading State
			isLoading: false,
			btnIsLoading: false,
			formIsLoading: true,
			// Dialog
			visible: false,
			dialogTitle: '',
            dialogDeskripsi: '',
            // Validation
            v$: useVuelidate(),
            hasValidated: false,
			// Form
			no: 1,
			editShift: [],
			formPost: false,
			// theForm
			nama_shift	: "",
			jam_masuk	: "08:00",
			jam_keluar	: "17:00",
			warna		: "#07134f",
			jam_istirahat_mulai		: "12:00",
			jam_istirahat_selesai	: "13:00",
			toleransi_keterlambatan	: "",
			// Opsional: default=#07134f
		}
	},
	validations() {
		return {
			// Form
			nama_shift	: { required },
			jam_masuk	: { required },
			jam_keluar	: { required },
			warna		: { required },
			jam_istirahat_mulai		: { required },
			jam_istirahat_selesai	: { required },
			toleransi_keterlambatan	: { required },
		}
	},
	methods: {
		ensureHashtag() {
			if (this.warna && !this.warna.startsWith('#')) {
				this.warna = `#${this.warna}`;
			}
		},
		// FORMAT JAM DAN MENIT
		formattedTime(date) {
			const timePattern = /^\d{2}:\d{2}$/;
			if (typeof date === 'string' && timePattern.test(date)) {
				return date; 
			}

			if (date instanceof Date) {
				const hours = String(date.getHours()).padStart(2, '0');
				const minutes = String(date.getMinutes()).padStart(2, '0');
				return `${hours}:${minutes}`;
			}  
		},
		async getShift() {
			await axios.get('shift', {
				headers: { 'Authorization': `Bearer ${this.default.token}` }
			}).then((res) => {
				console.log(res)
			}).catch((err) => {
				console.log(err)
			})
		},
		openPost() {
			this.formIsLoading = false
			this.visible = true
			this.dialogTitle = 'Tambahkan Shift Kerja'
		},
		async post() {
            this.btnIsLoading = true
            this.hasValidated = true
            this.v$.$validate()
			const data = {
				nama_shift	: this.nama_shift,
				jam_masuk	: this.formattedTime(this.jam_masuk),
				jam_keluar	: this.formattedTime(this.jam_keluar),
				warna		: this.warna,
				jam_istirahat_mulai		: this.formattedTime(this.jam_istirahat_mulai),
				jam_istirahat_selesai	: this.formattedTime(this.jam_istirahat_selesai),
				toleransi_keterlambatan	: this.toleransi_keterlambatan,
			}
			await axios.post('shift', data, {
				headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
			}).then((res) => {
				console.log(res)
				this.btnIsLoading = false
			}).cathc((err) => {
				console.log(err)
				this.btnIsLoading = false
			})
		},
		close() {
			this.visible = false
		},
	},
	mounted() {
		this.getShift()
	},
}
</script>
<style>
.p-datatable-header{
    background: white;
}
.p-dialog-close-button {
    display: none;
}
</style>