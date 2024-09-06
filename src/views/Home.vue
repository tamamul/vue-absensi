<template>
      <Card class="shadow-md col-span-12 lg:col-span-6 xl:col-span-3">
        <template #title>Testing</template>
        <template #content>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde aliquid fugit temporibus harum voluptatibus placeat officia expedita sint impedit! Architecto eius consectetur reiciendis veniam officia incidunt optio ut rerum laborum.</p>
        </template>
    </Card>
    <Card class="shadow-md col-span-12 lg:col-span-6 xl:col-span-3">
        <template #title>Testing</template>
        <template #content>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde aliquid fugit temporibus harum voluptatibus placeat officia expedita sint impedit! Architecto eius consectetur reiciendis veniam officia incidunt optio ut rerum laborum.</p>
        </template>
    </Card>
    <Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-6">
        <template #title>Testing</template>
        <template #content>
            <DataTable :value="products" tableStyle="min-width: 50rem">
                <Column field="id" header="Code"></Column>
                <Column field="photo" header="photo">
                    <template #body>
                        <img :src="photo" alt="">
                    </template>
                </Column>
                <Column field="nama" header="Category">
                </Column>
                <Column field="totalHadir" header="Quantity"></Column>
            </DataTable>
        </template>
    </Card>
</template>

<script>

export default {
    data() {
        return {
            products: [
                {
                    id: 1,
                    photo: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
                    nama: "siti",
                    totalHadir: 2,
                }
            ]
        };
    },
};
</script>
