export default{
    data() {
        return {
            dataList : {},
            formData: {
            },
            formType: '',
            updateId: ''
        }
    },
    methods: {
        getDataUrl : function(){
            return this.$route.meta.dataUrl;
        },
        generateUrl : function(customUrl = false){
            if(customUrl){
                return `${baseUrl}/${customUrl}`
            }
            return `${baseUrl}/${this.getDataUrl()}`;
        },
        getDataList : function(){
            const _this = this;
            this.axios.get(this.generateUrl()).then(function(response){
                if(parseInt(response.data.status) === 5000){
                    _this.$toastr('error', response.data.message, 'Error');
                }
                if(parseInt(response.data.status) === 2000){
                    // _this.$set(_this.dataList, response.data.result)
                    // _this.dataList = Object.assign({}, _this.dataList, response.data.result)
                    _this.dataList = Object.assign({}, _this.dataList, {...response.data.result})
                    _this.$store.state.dataList = response.data.result
                    // _this.dataList = response.data.result;
                }
            })
        },
        openModal: function (modalName = 'formModal', title = false, callback = false, resetValidation = true) {
            if (title) {
                this.$store.commit('modalTitle', title);
            }
            $('#' + modalName).modal('show');
            if (resetValidation){
                this.$validator.reset();
            }
            if (typeof callback === 'function') {
                callback(true);
            }
        },
        closeModal: function (modalName = 'createModal', resetForm = true, resetFormType = true) {
            const _this = this;
            this.$validator.reset();
            $('#' + modalName).modal('hide');
            // this.$store.commit('formType', 1);
            $('.error_message').remove();
            $('.is-invalid').removeClass('is-invalid');
            if (resetForm) {
                // this.$store.commit('formObject', {});
            }
            if (resetFormType) {
                // _this.$store.state.formType = 1;
            }
        },
        deleteData(url, id) {
            this.axios.delete(baseUrl + url + id)
                .then(response => {
                    if(response.data.status == 2000) {
                        this.$toastr('success', response.data.message, 'Deleted')
                        this.getDataList()
                    }
                })
        },
        submitForm: function (formData, modalName = 'formModal', callback = false, checkValidation = true, url = false, object = {}) {
            const _this = this;
            var URL, method;
            var pageNumber = 1;
            if (_this.formType === 2) {
                pageNumber = _this.currentPagination;
                URL = `${_this.generateUrl(url)}/${_this.updateId}`;
                method = 'put';
            } else {
                URL = _this.generateUrl(url);
                method = 'post';
            }
            this.$validator.validate().then(valid => {
                if (valid || !checkValidation) {
                    this.$validator.errors.clear();
                    _this.$store.state.httpRequest = true;
                    _this.axios({method: method, url: URL, data: formData, params: object}).then(function (response) {
                        var retData = response.data;
                        _this.$store.state.httpRequest = false;

                        if (parseInt(retData.status) === 5001) {
                            _this.$toastr('error', retData.message, 'Error');
                            // _this.$router.push({path:'/admin/dashboard'});
                            return;
                        }

                        if (parseInt(retData.status) === 2000) {
                            $('#' + modalName).modal('hide');
                            _this.getDataList()
                            
                            /* if (model) {
                                _this.$store.state.currentFromModel = 1;
                                _this.getDataList(pageNumber);
                                _this.resetForm(formData);
                            } */
                            if (typeof callback == 'function') {
                                callback(retData.result);
                            }
                            _this.$toastr('success', retData.message, 'Success');
                        }
                        if (parseInt(retData.status) === 3000) {
                            _this.$toastr('warning', retData.message, 'Warning');
                            _this.assignValidationError(retData.result);
                        }
                        if (parseInt(retData.status) === 5000) {
                            _this.$toastr('error', retData.message, 'Error');
                        }
                    }).catch(function (error) {
                        _this.$toastr('error', 'Something Wrong', 'Error');
                    });
                }
            });
        },
    },
    computed:{

    },
    mounted() {
        // alert('asas');
    },
}
