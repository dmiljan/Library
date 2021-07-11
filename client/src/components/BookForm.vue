<template>
    <Modal :title="titleForm"
        :show="show" 
        @close="closeModal" 
        footer>
        <div class="row g-3">
            <div class="col-md-12">
                <label class="form-label">Name</label>
                <input type="text" v-model="form.name" class="form-control">
            </div>
            <div class="col-md-12">
                <label  class="form-label">Writer</label>
                <input type="text" v-model="form.writer" class="form-control">
            </div>
            <div class="col-md-4">
                <label  class="form-label">Year</label>
                <input type="text" v-model="form.year" class="form-control">
            </div>
            <div class="col-md-4">
                <label  class="form-label">Number of pages</label>
                <input type="text" v-model="form.pages_number" class="form-control">
            </div>
            <div class="col-md-4">
                <label  class="form-label">Available</label>
                <input type="text" v-model="form.available" class="form-control">
            </div>
        </div> 
        
        <template #footer>
             <button @click.prevent="handleSubmit" type="submit" class="btn btn-primary">Save</button>
        </template>
    </Modal>
</template>

<script>
import api from "../api/base";
import { ref, reactive } from "vue";
import Modal from "./Modal.vue"

export default {
    name:"BookForm",
    emits: ['change'],
    setup(props, {emit}) {
        const show = ref(false);
        const isSaving = ref(false);
        const isNewRecord = ref(false);
        const titleForm = ref("");
        const form = reactive({
            name: "",
            writer: "",
            year: "",
            pages_number: "",
            available: ""
        });

        const handleSubmit = async () => {
            try {
                if (!form.name || !form.writer || !form.year || !form.pages_number || !form.available) {
				        alert("Please fill in the fields");
				    return;
			    }
                isSaving.value = true;

                if(isNewRecord.value === true) {
                    await api.post(`api/book/create`, form);
                } else {
                    await api.patch('api/book/update', form);
                }

                emit('change');

                clearForm();
                closeModal();
            } catch(e) {
                console.error(e);
            } finally {
                isSaving.value = false;
            }
        }

        const closeModal = () => show.value = false;

        const showModal = () => show.value = true;

        const createForm = () => {
            titleForm.value = "Create Book";
            isNewRecord.value = true;

            showModal();
        };

        const updateForm = (book) => {
            titleForm.value = "Update Book";
            isNewRecord.value = false;

            form.id = book.id;
            form.name = book.name;
            form.writer = book.writer;
            form.year = book.year;
            form.pages_number = book.pages_number;
            form.available = book.available;

            showModal();
        };

        const clearForm = () => {
            form.name = "";
            form.writer = "";
            form.year = "";
            form.pages_number = "";
            form.available = "";
        }
        
        return {
            show,
            form,
            handleSubmit,
            closeModal,
            showModal,
            isNewRecord,
            createForm,
            updateForm,
            titleForm,
            clearForm
        }
    },
    components: {
        Modal
    }
}
</script>

<style>

</style>