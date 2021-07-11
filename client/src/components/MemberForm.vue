<template>
    <Modal :title="titleForm" 
        :show="show" 
        @close="closeModal" 
        footer>
        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label">First name</label>
                <input type="text" v-model="form.first_name" class="form-control">
            </div>
            <div class="col-md-6">
                <label  class="form-label">Last name</label>
                <input type="text" v-model="form.last_name" class="form-control">
            </div>
            <div class="col-md-12">
                <label  class="form-label">E-mail</label>
                <input type="text" v-model="form.email" class="form-control">
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
    name: "MemberForm",
    emits: ['change'],
    setup(props, {emit}) {
        const show = ref(false);
        const isSaving = ref(false);
        const isNewRecord = ref(false);
        const titleForm = ref("");
        const form = reactive({
            first_name: "",
            last_name: "",
            email: ""
        });

         const handleSubmit = async () => {
            try {
                if (!form.first_name || !form.last_name || !form.email) {
				    alert("Please fill in the fields");
				    return;
			    }
                isSaving.value = true;

                if(isNewRecord.value === true) {
                    await api.post(`api/member/create`, form);
                } else {
                     await api.patch('api/member/update', form);
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
            titleForm.value = "Create Member";
            isNewRecord.value = true;

            showModal();
        };

        const updateForm = (member) => {
            titleForm.value = "Update Member";
            isNewRecord.value = false;

            form.id = member.id;
            form.first_name = member.first_name;
            form.last_name = member.last_name;
            form.email = member.email;

            showModal();
        };

        const clearForm = () => {
            form.first_name = "";
            form.last_name = "";
            form.email = "";
        }

        return {
            handleSubmit,
            show,
            isSaving,
            form,
            closeModal,
            showModal,
            isNewRecord,
            titleForm,
            createForm,
            updateForm,
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