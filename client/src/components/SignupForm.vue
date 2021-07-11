<template>
  <Modal title="Signup"
        :show="show" 
        @close="closeModal" 
        footer>
        <div class="row g-3">
            <div class="col-md-12">
                <label class="form-label">Username</label>
                <input type="text" v-model="form.username" class="form-control">
            </div>
            <div class="col-md-6">
                <label  class="form-label">Password</label>
                <input type="password" v-model="form.password" class="form-control">
            </div>
            <div class="col-md-6">
                <label  class="form-label">Confirm password</label>
                <input type="password" v-model="form.confirmPassword" class="form-control">
            </div>
        </div> 
        
        <template #footer>
             <button @click.prevent="handleSubmit" type="submit" class="btn btn-primary">Save</button>
        </template>
    </Modal>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import Modal from "./Modal.vue"
export default {
    name: "SignupForm",
    setup() {
        const router = useRouter();
        const show = ref(false);
        const form = reactive ({
            username: "",
            password: "",
            confirmPassword: ""
        });

        const handleSubmit = async () => {
            if (!form.username || !form.password || !form.confirmPassword) {
				alert("Please fill in the fields");
				return;
			}

            if(form.password === form.confirmPassword) {
                const response = await axios.post("http://localhost:5000/api/user/signup", form);

                if(response.data.success === true) {
                    router.push("/app");
                    closeModal();
                } 
            } else {
                alert("Password does not match");
                form.confirmPassword = "";
            }
        }

        const closeModal = () => show.value = false;

        const showModal = () => show.value = true;

        return {
            show,
            form,
            handleSubmit,
            closeModal,
            showModal,
        }

    },
    components: {
        Modal
    }

}
</script>

<style>

</style>