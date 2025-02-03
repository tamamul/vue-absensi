<template>
  <div class="px-8 md:px-24 py-16 text-white mt-[108px] bg-blue-500">
    <div class="md:w-[70%]">
      <!-- Main Heading -->
      <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold cursor-default transition-all duration-500">
        Administrasi Pegawai Mudah dan Aman
      </h1>

      <div class="md:flex mt-7 cursor-auto">
        <!-- Left Section -->
        <div class="bg-white md:w-[50%] p-7 rounded-md transition-all duration-500 flex flex-col">
          <div class="my-auto">
            <h5 class="text-blue-500 text-xl md:text-3xl font-bold cursor-default">
              Kenapa harus Absenki'?
            </h5>
            <p class="text-black mt-1 md:mt-3 cursor-default text-xs md:text-sm">
              Absenki' adalah solusi modern yang meminimalkan kecurangan absensi dengan QR Code, mempermudah pengaturan jadwal kerja, dan otomatisasi penghitungan gaji. Hemat waktu, transparan, dan terpercaya!
            </p>
          </div>
        </div>

        <!-- Right Section -->
        <div class="relative md:w-[37%] flex flex-col justify-end align-bottom md:mx-3 mt-2 md:mt-0 max-w-3xl overflow-hidden">
          <!-- Carousel Wrapper -->
          <div class="flex transition-transform duration-700 ease-in-out rounded-md" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div v-for="(slide, index) in slides" :key="index" class="flex-shrink-0 w-full bg-white rounded-md p-7 my-auto">
              <div class="text-center">
                <!-- SVG Icon -->
                <div class="md:mb-4 mb-2 flex justify-center bg-blue-500 w-fit mx-auto p-2  rounded-full">
                  <svg class="md:w-12 w-10 h-10 md:h-12 text-white mx-auto my-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="slide.icon" />
                  </svg>
                </div>
                <!-- Title -->
                <h6 class="md:text-base text-sm font-bold cursor-default text-blue-500">
                  {{ slide.title }}
                </h6>
                <!-- Description -->
                <p class="mt-1 text-black cursor-default md:text-sm text-xs">
                  {{ slide.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Indicators -->
          <div class="mt-1 flex justify-center space-x-2">
            <button v-for="(slide, index) in slides" :key="index" class="w-full h-1 rounded-full focus:outline-none" :class="{
                'bg-blue-700': index === currentSlide,
                'bg-gray-300': index !== currentSlide,
              }" @click="goToSlide(index)"></button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <a>
    <div class="md:justify-end flex px-24 mx-auto justify-center cursor-pointer">
      <div @click="scrollTo('about')" class="border-[10px] w-fit p-3 md:p-5 rounded-full border-white bg-blue-500 mt-[-30px] md:mt-[-60px]">
        <svg class="slidedown-icon md:w-16 w-10 h-10 md:h-16 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      slides: [
        {
          title: "Kustomisasi Jadwal Kerja",
          description: "Sesuaikan jadwal kerja dengan kebutuhan perusahaan.",
          icon: "M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01",
        },
        {
          title: "Kelola Gaji",
          description: "Kelola penggajian karyawan dengan mudah dan cepat.",
          icon: "M3 10V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H7M3 10C4.333 10 7 9.2 7 6M3 10V14M7 6H17M3 14V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H7M3 14C4.333 14 7 14.8 7 18M21 10V8C21 7.46957 20.7893 6.96086 20.4142 6.58579C20.0391 6.21071 19.5304 6 19 6H17M21 10C19.667 10 17 9.2 17 6M21 10V14M21 14V16C21 16.5304 20.7893 17.0391 20.4142 17.4142C20.0391 17.7893 19.5304 18 19 18H17M21 14C19.667 14 17 14.8 17 18M17 18H7 M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z",
        },
        {
            title: "Tambah Karyawan",
            description: "Tambahkan karyawan baru secara efisien.",
            icon: "M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z",
          },
          {
            title: "Konfirmasi Absensi QR Code",
            description: "Gunakan QR Code untuk absensi yang praktis.",
            icon: "M4 4h6v6H4V4Zm10 10h6v6h-6v-6Zm0-10h6v6h-6V4Zm-4 10h.01v.01H10V14Zm0 4h.01v.01H10V18Zm-3 2h.01v.01H7V20Zm0-4h.01v.01H7V16Zm-3 2h.01v.01H4V18Zm0-4h.01v.01H4V14Z",
          },
          {
            title: "Pengelolaan Tugas Kerja",
            description: "Atur tugas kerja karyawan dengan efektif.",
            icon: "M9.2502 22L8.8502 18.8C8.63353 18.7167 8.42953 18.6167 8.2382 18.5C8.04686 18.3833 7.8592 18.2583 7.6752 18.125L4.7002 19.375L1.9502 14.625L4.5252 12.675C4.50853 12.5583 4.5002 12.446 4.5002 12.338V11.663C4.5002 11.5543 4.50853 11.4417 4.5252 11.325L1.9502 9.375L4.7002 4.625L7.6752 5.875C7.85853 5.74167 8.0502 5.61667 8.2502 5.5C8.4502 5.38333 8.6502 5.28333 8.8502 5.2L9.2502 2H14.7502L15.1502 5.2C15.3669 5.28333 15.5712 5.38333 15.7632 5.5C15.9552 5.61667 16.1425 5.74167 16.3252 5.875L19.3002 4.625L22.0502 9.375L19.4752 11.325C19.4919 11.4417 19.5002 11.5543 19.5002 11.663V12.337C19.5002 12.4457 19.4835 12.5583 19.4502 12.675L22.0252 14.625L19.2752 19.375L16.3252 18.125C16.1419 18.2583 15.9502 18.3833 15.7502 18.5C15.5502 18.6167 15.3502 18.7167 15.1502 18.8L14.7502 22H9.2502ZM12.0502 15.5C13.0169 15.5 13.8419 15.1583 14.5252 14.475C15.2085 13.7917 15.5502 12.9667 15.5502 12C15.5502 11.0333 15.2085 10.2083 14.5252 9.525C13.8419 8.84167 13.0169 8.5 12.0502 8.5C11.0669 8.5 10.2375 8.84167 9.5622 9.525C8.88686 10.2083 8.54953 11.0333 8.5502 12C8.55086 12.9667 8.88853 13.7917 9.5632 14.475C10.2379 15.1583 11.0669 15.5 12.0502 15.5Z",
          },
      ],
      interval: null,
    };
  },
  mounted() {
      this.startAutoSwitch();
    },
    beforeUnmount() {
      this.stopAutoSwitch();
    },
  methods: {
    scrollTo(targetId) {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    startAutoSwitch() {
        this.interval = setInterval(() => {
          this.nextSlide();
        }, 3000);
      },
      stopAutoSwitch() {
        clearInterval(this.interval);
      },
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      },
      goToSlide(index) {
        this.currentSlide = index;
      },
  },
};
</script>