const store = {
    state: {
        modalTitle: '',
        modalFormData: {},
        dataList: {}
    },
    mutations: {
        modalTitle(state, value){
            state.modalTitle = value
        }
    },
    actions: {},
};

export default store;
