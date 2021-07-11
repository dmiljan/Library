<template>
    <Modal title="Rent Book" 
            :show="show" 
            @close="closeModal" 
            footer>
            <div class="row g-3">
                <div class="col-md-12">
                    <select v-model="form.book_id" class="form-select">
                        <option value="">Choose book</option>
                        <option v-for="book in books" :key="book.id" :value="book.id">{{ book.name }}</option>
                    </select>
                </div>

                <div class="col-md-12">
                    <select v-model="form.member_id"  class="form-select">
                        <option value="">Choose member</option>
                        <option v-for="member in members" :key="member.id" :value="member.id"> {{ member.id}} - {{ member.first_name }} {{ member.last_name }}</option>
                    </select>
                </div>

                <div class="col-md-12">
                    <label class="form-label">Date renting</label>
                    <input v-model="form.renting_date" type="date" class="form-control" />
                </div>
            </div>

            <template #footer>
                <button  @click.prevent="handleSubmit" type="submit" class="btn btn-primary">Save</button>
            </template>
    </Modal>
</template>

<script>
import api from "../api/base";
import { onBeforeMount } from 'vue';
import { reactive, ref } from "vue";
import Modal from "./Modal.vue"

export default {
    name: "RentBookForm",
    props: {
        books: Array, 
    },
    emits: ['change'],
    setup(props, {emit}) {
        const form = reactive({
            book_id: '',
            member_id: '',
            renting_date: null
        });
        const isSaving = ref(false);
        const show = ref(false);
        const members = ref([]);

        const handleSubmit = async () => {
            try {
                if (!form.book_id || !form.member_id || !form.renting_date) {
				    alert("Please fill in the fields");
				    return;
			    }
                isSaving.value = true;

                await api.post(`api/book/rent`, form);

                emit('change');

                closeModal();
            } catch(e) {
                console.log(e);
            } finally {
                isSaving.value = false;
            }
        };

        const loadMember = async () => { 
            const response = await api.get("api/member/index");

            members.value = response.data;
        };

        onBeforeMount(() => loadMember());

        const closeModal = () => show.value = false;

        const showModal = () => show.value = true;

        return {
            handleSubmit,
            loadMember,
            form,
            members,
            closeModal,
            showModal,
            show,
            isSaving
        }
    },
    components: {
        Modal
    }
};
</script>

<style scoped>

</style>