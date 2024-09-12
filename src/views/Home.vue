<template>
    <Layout>
        <Card class="shadow-md col-span-12 lg:col-span-6 xl:col-span-3">
            <template #title>Testing</template>
            <template #content>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde aliquid fugit temporibus harum voluptatibus
                    placeat officia expedita sint impedit! Architecto eius consectetur reiciendis veniam officia incidunt
                    optio ut rerum laborum.</p>
            </template>
        </Card>

        <Card class="shadow-md col-span-12 lg:col-span-6 xl:col-span-3">
            <template #title>Testing</template>
            <template #content>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde aliquid fugit temporibus harum voluptatibus
                    placeat officia expedita sint impedit! Architecto eius consectetur reiciendis veniam officia incidunt
                    optio ut rerum laborum.</p>
            </template>
        </Card>

        <Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-6">
            <template #title>Testing</template>
            <template #content>
                <DataTable :value="products" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem">
                    <Column field="id" header="Code"></Column>
                    <Column field="photo" header="photo">
                        <template #body>
                            <!-- <img :src="data.photo" alt=""> -->
                        </template>
                    </Column>
                    <Column field="nama" header="Category">
                    </Column>
                    <Column field="total_hadir" header="Quantity"></Column>
                    <Column field="representative.name" header="Representative" style="width: 25%"></Column>
                </DataTable>
            </template>
        </Card>

        <Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-7">
            <template #title>Testing</template>
            <template #content>
                <DataTable :value="products" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem">
                    <Column field="id" header="Code"></Column>
                    <Column field="photo" header="photo">
                        <template #body>
                            <!-- <img :src="data.photo" alt=""> -->
                        </template>
                    </Column>
                    <Column field="nama" header="Category">
                    </Column>
                    <Column field="total_hadir" header="Quantity"></Column>
                    <Column field="representative.name" header="Representative" style="width: 25%"></Column>
                </DataTable>
            </template>
        </Card>

        <Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-5">
            <template #title>Testing</template>
            <template #content>
                <DataTable :value="products" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem">
                    <Column field="id" header="Code"></Column>
                    <Column field="photo" header="photo">
                        <template #body>
                            <!-- <img :src="data.photo" alt=""> -->
                        </template>
                    </Column>
                    <Column field="nama" header="Category">
                    </Column>
                    <Column field="total_hadir" header="Quantity"></Column>
                    <Column field="representative.name" header="Representative" style="width: 25%"></Column>
                </DataTable>
            </template>
        </Card>

        <Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-12">
            <template #title>Pegawai</template>
            <template #content>
                <DataTable :value="employees" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem">
                    <Column field="id" header="Code"></Column>
                    <Column field="nama" header="Nama"></Column>
                    <Column field="alamat" header="Alamat"></Column>
                    <Column field="tanggal_lahir" header="Tanggal Lahir"></Column>
                </DataTable>
            </template>
        </Card>
    </Layout>
</template>

<script>

export default {
    data() {
        return {
            products: [
                {
                    id: 1,
                    photo: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
                    nama: "Siti",
                    total_hadir: 7,
                },
                {
                    id: 2,
                    photo: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
                    nama: "Rangga",
                    total_hadir: 2,
                },
            ],
            employees: [],
            chartData: null,
            chartOptions: null
        };
    },
    methods: {
        getEmployees() {
            const fetchEmployees = async () => {
                const endpoint = await fetch("http://localhost:3000/kanban");
                const data = await endpoint.json()
                console.log(data)
                this.employees = (data)
            }

            fetchEmployees()
        }
    },
    mounted() {
        this.getEmployees()
    },
};
</script>
