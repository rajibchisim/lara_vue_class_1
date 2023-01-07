<template>
    <!-- (formData, model = true, callback = false, checkValidation = true, url = false, object = {}) -->
    <form-modal-vue @submitMyForm="submitForm(formData,'formModal', ()=>{}, true, 'api/users')" modal-id="formModal" back-drop="static">

<!-- Title  -->
            <div class="form-group">
                <label>Name:</label><br>
                <input type="text" name="name" autocomplete="off" v-model="$store.state.modalFormData.name">
            </div>
            <div class="form-group">
                <label>Email:</label><br>
                <input type="text" name="email" autocomplete="off" v-model="$store.state.modalFormData.email">
            </div>
            <div class="form-group">
                <label>Password:</label><br>
                <input type="password" name="password" autocomplete="off" v-model="$store.state.modalFormData.password">
            </div>
<!-- Submit / close button -->
    </form-modal-vue>
</template>
<script>
import formModalVue from '../formModal';
export default{
    name:'userForm',
    components:{formModalVue},
    }
</script>
