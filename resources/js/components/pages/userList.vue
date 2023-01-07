<template>
    <base-layouts>
        <div class="mt-5">
            <div class="card">
                <page-top-vue defaultAddButtonLabel="Add User" pageModalTitle="Add new User" @clickAdd="addUser"></page-top-vue>
                <div class="card-body">
                    <table-head-vue  :table-heading="tableHeading">
                        <template v-slot:data>
                            <tr v-for="(data, index) in dataList.data">
                            <th scope="row">{{index+1}}</th>
                            <td>{{data.name}}</td>
                            <td>{{data.email}}</td>
                            <td>
                                <button class="btn btn-outline-success btn-sm" @click="editData(data)">
                                        <i class="fa fa-pen-to-square"></i>Edit</button>
                                <button class="btn btn-outline-danger btn-sm" @click="deleteData('/api/users/', data.id)">
                                        <i class="fa fa-trash"></i>Delete</button>

                                </td>
                            </tr>

                        </template>
                    </table-head-vue>
                </div>
            </div>
        </div>

        <!--        Modal-->
        <formModal @submitForm="submitForm(formData, 'formModal', ()=>{}, true, 'api/users')">
            <div class="form-group">
                <label>Name:</label><br>
                <input type="text" name="name" v-model="formData.name">
            </div>
            <div class="form-group">
                <label>Email:</label><br>
                <input type="text" name="email" v-model="formData.email">
            </div>
            <div class="form-group">
                <label>Password:</label><br>
                <input type="password" name="password" v-model="formData.password">
            </div>
        </formModal>

    </base-layouts>
</template>
<script>
    import pageTopVue from "../pageTop";
    import baseLayouts from "../layouts/baseLayouts";
    import formModal from "../formModal";
    import tableHeadVue from "../tableHead";
    import userFormVue from "./userForm";
    export default {
        name: "userList",
        components: {baseLayouts, formModal,pageTopVue,tableHeadVue,userFormVue},
        data() {
            return {
                tableHeading: ['Sl','Name','Email', 'Action'],
                formData: {
                    name: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods : {
            addUser(){
                this.formData.name = ''
                this.formData.email = ''
                this.formData.password = ''
                this.openModal('formModal', 'Add new User')
            },
            editData(data) {
                console.log(data, ' | ', this.formData)
                this.formData.name = data.name
                this.formData.email = data.email
                this.formData.password = data.password
                
                this.formType = 2
                this.updateId = data.id
                
                this.openModal()
            },
        },
        created() {
            console.log(this.$store.state.modalFormData)
            this.$store.state.modalFormData = {
                name: 'rajib',
                email: 'admin@mail.com',
                password: '12345'
            }
        },
        mounted(){
            this.getDataList();
        }


    }
</script>

<style scoped>

</style>
