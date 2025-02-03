<template>
  <div class="flex items-center justify-center scroll-mt-24 md:scroll-mt-20" id="fitur">
    <div class="container text-center py-20 md:px-14 px-8 bg-white rounded-lg">
      <h1 class="md:text-3xl text-xl font-semibold text-blue-500 cursor-default">
        Fitur Unggulan Absenki'
      </h1>
      <p class="md:text-base text-sm mt-2 cursor-default">
        Solusi Absensi yang Aman, Fleksibel, dan Akurat untuk Perusahaan Anda
      </p>

      <div class="card flex flex-col md:flex-row text-left mt-5 md:mt-10 ">
        <!-- Tab List -->
        <div class="md:flex text-sm md:text-base flex-col md:border-r-2 border-black pr-2 md:border-b-0 border-b-2">
          <button
            class="md:py-2 px-4 text-left my-[3%] rounded transition-all"
            :class="{
              'bg-white text-blue-500 font-bold': selectedTab === 0,
              'bg-white text-black font-bold': selectedTab !== 0
            }"
            @click="selectedTab = 0"
          >
            Custom Jadwal Kerja
          </button>
          <button
            class="md:py-2 px-4 text-left my-[3%] rounded transition-all"
            :class="{
              'bg-white text-blue-500 font-bold': selectedTab === 1,
              'bg-white text-black font-bold': selectedTab !== 1
            }"
            @click="selectedTab = 1"
          >
            Kelola Gaji
          </button>
          <button
            class="md:py-2 px-4 text-left my-[3%] rounded transition-all"
            :class="{
              'bg-white text-blue-500 font-bold': selectedTab === 2,
              'bg-white text-black font-bold': selectedTab !== 2
            }"
            @click="selectedTab = 2"
          >
            Tambah Karyawan
          </button>
          <button
            class="md:py-2 px-4 text-left my-[3%] rounded transition-all"
            :class="{
              'bg-white text-blue-500 font-bold': selectedTab === 3,
              'bg-white text-black font-bold': selectedTab !== 3
            }"
            @click="selectedTab = 3"
          >
            Konfirmasi Absen QR Code
          </button>
          <button
            class="md:py-2 px-4 text-left my-[3%] rounded transition-all"
            :class="{
              'bg-white text-blue-500 font-bold': selectedTab === 4,
              'bg-white text-black font-bold': selectedTab !== 4
            }"
            @click="selectedTab = 4"
          >
            Pengelolaan Tugas Kerja
          </button>
        </div>


        <!-- Tab Panels -->
        <div class="md:pl-3 flex-1 ">
          <div v-if="selectedTab === 0" class="pl-3 py-auto align-middle">
            <h4 class="text-xl text-blue-500 font-semibold mt-3 cursor-default">Custom Jadwal Kerja</h4>
            <div class="md:flex mt-3">
              <img
                src="/src/assets/f5b9299d0858bb986311810fd1196be9.png"
                alt=""
                class="sm:w-[30%] object-cover mx-auto"
              />
              <p class="md:ml-4 md:text-base text-sm cursor-default md:mt-0 mt-2">
                Absenki' memungkinkan perusahaan mengatur jadwal kerja pegawai dengan <b class="font-semibold">fleksibel</b>, menyesuaikan jam kerja sesuai kebutuhan operasional dan kebijakan perusahaan. Fitur ini sangat cocok untuk sistem shift atau jam kerja bervariasi, memberikan <b class="font-semibold">kebebasan penuh dalam penjadwalan</b>.
              </p>
            </div>
          </div>
          <div v-if="selectedTab === 1" class="pl-3 py-auto align-middle">
            <h4 class="text-xl text-blue-500 font-semibold  mt-3 cursor-default">Kelola Gaji</h4>
            <div class="md:flex mt-3">
              <img
                src="/src/assets/f5b9299d0858bb986311810fd1196be9.png"
                alt=""
                class="sm:w-[30%] object-cover mx-auto"
              />
              <p class="md:ml-4 md:text-base text-sm cursor-default md:mt-0 mt-2">
                Sistem penghitungan gaji Absenki' secara <b class="font-semibold">otomatis</b> menghitung gaji pegawai berdasarkan kehadiran, keterlambatan, dan jam kerja yang tercatat. Fitur ini mencegah kesalahan manual, memastikan gaji sesuai, serta membuat proses penggajian lebih <b class="font-semibold">cepat</b>, <b class="font-semibold">akurat</b>, dan <b class="font-semibold">efisien</b>.
              </p>
            </div>
          </div>
          <div v-if="selectedTab === 2" class="pl-3 py-auto align-middle">
            <h4 class="text-xl text-blue-500 font-semibold mt-3 cursor-default">Tambah Karyawan</h4>
            <div class="md:flex mt-3">
              <img
                src="/src/assets/f5b9299d0858bb986311810fd1196be9.png"
                alt=""
                class="sm:w-[30%] object-cover mx-auto"
              />
              <p class="md:ml-4 md:text-base text-sm cursor-default md:mt-0 mt-2">
                Menambahkan karyawan ke Absenki' <b class="font-semibold">mudah</b> dan <b class="font-semibold">cepat</b>. Cukup masukkan data pegawai, dan mereka langsung <b class="font-semibold">terintegrasi</b> ke sistem absensi. Fitur ini membantu tim HR mengelola data karyawan, terutama saat perusahaan berkembang.
              </p>
            </div>
          </div>
          <div v-if="selectedTab === 3" class="pl-3 py-auto align-middle">
            <h4 class="text-xl text-blue-500 font-semibold mt-3 cursor-default">
              Konfirmasi Absen QR Code
            </h4>
            <div class="md:flex mt-3">
              <img
                src="/src/assets/f5b9299d0858bb986311810fd1196be9.png"
                alt=""
                class="sm:w-[30%] object-cover mx-auto"
              />
              <p class="md:ml-4 md:text-base text-sm cursor-default md:mt-0  mt-2">
                Absenki' memastikan kehadiran <b class="font-semibold">akurat</b> dengan sistem <b class="font-semibold">QR Code</b>, di mana pegawai hanya bisa absen di lokasi kerja yang ditentukan. Fitur ini <b class="font-semibold">mencegah manipulasi</b> lokasi, seperti penggunaan fake GPS.
              </p>
            </div>
          </div>
          <div v-if="selectedTab === 4" class="pl-3 py-auto align-middle">
            <h4 class="text-xl text-blue-500 font-semibold mt-3 cursor-default">
              Pengelolaan Tugas Kerja
            </h4>
            <div class="md:flex mt-3">
              <img
                src="/src/assets/f5b9299d0858bb986311810fd1196be9.png"
                alt=""
                class="sm:w-[30%] object-cover mx-auto"
              />
              <p class="md:ml-4 md:text-base text-sm cursor-default md:mt-0 mt-2">
                Absenki' memungkinkan pengelolaan dan pemantauan tugas pegawai dengan menetapkan tugas sesuai jadwal dan tanggung jawab mereka. Fitur ini memastikan tugas <b class="font-semibold">terkoordinasi</b> dengan jelas, <b class="font-semibold">meningkatkan produtivitas</b> dan <b class="font-semibold">efesiensi tim</b>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const selectedTab = ref(0);
  </script>

  <style scoped>
  .card {
    display: flex;
    border-radius: 4px;
    overflow: hidden;
  }
</style>
