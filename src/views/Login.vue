<template>
    <div class="w-full h-dvh flex justify-center items-center">
        <Card class="shadow-md">
            <template #title>
                <div class="flex flex-col gap-2">
                    <h1 class="text-3xl">Login</h1>
                    <p class="font-normal text-sm">Masuk kedalam aplikasi absensi</p>
                </div>
            </template>
            <template #content>
                <div class="flex flex-col gap-2">
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-user"></i>
                        </InputGroupAddon>
                        <InputText v-model="login.username" placeholder="Username" />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-lock"></i>
                        </InputGroupAddon>
                        <Password v-model="login.password" toggleMask placeholder="Password" :feedback="false" />
                    </InputGroup>
                    <Button label="Login" />
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            login : {
                username: '',
                password: '',
            }
        }
    },
}
</script>

<style>

</style>