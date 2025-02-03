<template>
  <div class="bg-white text-blue-500 md:px-24 px-8 py-20 scroll-mt-24 md:scroll-mt-[135px]" id="FAQ">
    <h1 class="md:text-3xl text-xl font-bold cursor-default">FAQ.</h1>

    <div class="mt-5 bg-blue-500">
      <Accordion
        value="0"
        expandIcon="pi pi-plus"
        collapseIcon="pi pi-minus"
        class="custom-accordion bg-white"
      >
        <AccordionPanel value="0" class="border-blue-500 border-t-2">
          <AccordionHeader class="bg-white text-black rounded-none border-none">
            <span class="flex items-center gap-2 w-full">
              <span
                class="font-bold whitespace-nowrap text-blue-500 text-xs sm:text-sm md:text-base"
                >Apakah Absenki' cocok untuk semua jenis perusahaan?</span
              >
            </span>
          </AccordionHeader>
          <AccordionContent
            class="border-gray-500 border-t-[1px] bg-gray-50 border-x-0 border-b-0"
          >
            <p class="m-0 text-gray-600 text-xs sm:text-sm md:text-base cursor-default">
              Ya, Absenki' dirancang dengan <b class="font-semibold">fleksibilitas tinggi</b> dan dapat digunakan oleh berbagai jenis perusahaan, baik kecil, menengah, maupun besar, yang memiliki <b class="font-semibold">jadwal kerja dinamis</b>.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1" class="border-blue-500 border-b-2 border-t-2">
          <AccordionHeader
            class="bg-white text-blue-500 rounded-none border-none"
          >
            <span class="flex items-center gap-2 w-full">
              <span
                class="font-bold whitespace-nowrap text-xs sm:text-sm md:text-base"
                >Bagaimana jika pegawai terlambat datang?</span
              >
            </span>
          </AccordionHeader>
          <AccordionContent class="border-gray-500 border-t-[1px] bg-gray-50">
            <p class="m-0 text-gray-600 text-xs sm:text-sm md:text-base cursor-default">
              Absenki' secara <b class="font-semibold">otomatis mencatat</b> keterlambatan dan dapat menghitung potongan gaji berdasarkan kebijakan perusahaan.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="2" class="border-blue-500 border-b-2">
          <AccordionHeader
            class="bg-white text-blue-500 rounded-none border-none"
          >
            <span class="flex items-center gap-2 w-full">
              <span
                class="font-bold whitespace-nowrap text-xs sm:text-sm md:text-base"
                >Apakah saya perlu perangkat khusus untuk menggunakan Absenki'?</span
              >
            </span>
          </AccordionHeader>
          <AccordionContent class="border-gray-500 border-t-[1px] bg-gray-50">
            <p class="m-0 text-gray-600 text-xs sm:text-sm md:text-base cursor-default">
              Tidak, Anda hanya membutuhkan <b class="font-semibold">perangkat smartphone</b> dengan aplikasi Absenki' dan akses ke <b class="font-semibold">QR Code</b> di lokasi kerja.
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </div>
</template>

<style scoped></style>
