<template>
    <div class="card-header py-3 col-md-12">
        <h3 class=" col-md-6 float-left">{{pageTitle}}</h3>
        <button v-if="defaultAddButton" @click="$emit('clickAdd')" class="btn btn-outline-info float-right btn-sm"><i class="fa fa-plus"></i>{{ defaultAddButtonLabel }}</button>
    </div>
</template>

<script>
export default{
    name:'pageTop',
    props: {
            pageTitle: {
                type: [String],
                default: 'Data List'
            },
            defaultAddButton: {
                type: [Boolean],
                default: true
            },
            defaultAddButtonLabel: {
                default: 'Add'
            },
            pageModalTitle: {
                type: [String],
                default: 'Add/edit modal'
            },
        }


}
</script>
