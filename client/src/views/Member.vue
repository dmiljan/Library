<template>
<div>
    <div>
        <button @click="$refs.memberModal?.createForm()" class="btn-group"><i class="fas fa-plus"></i> Add member</button>
         <input class="form-control" type="text" v-model="searchQuery" placeholder="Search..."/>
    </div>

    <MemberForm ref="memberModal" @change="loadMember()"/>

    <table class="table table-hover">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Card number</th>
            <th scope="col">E-mail</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(member, index) in searchedMembers" :key="member.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ member.first_name }}</td>
            <td>{{ member.last_name }}</td>
            <td>{{ member.id }}</td>
            <td>{{ member.email }}</td>
            <td><i @click="$refs.memberModal?.updateForm(member)" class="fas fa-edit" style="color: rgb(44, 109, 184)"></i></td>
            <td><i @click="deleteMember(member.id)" class="fas fa-trash-alt" style="color: rgba(129, 19, 19, 0.966)"></i></td>
            
        </tr>
    </tbody>
    </table>
</div>

</template>


<script>
import { onBeforeMount, ref, computed } from "vue";
import api from "../api/base";
import MemberForm from "../components/MemberForm.vue"

export default {
    name:"Member",
    setup() {
        const members = ref([]);
          const searchQuery = ref("");

        const loadMember = async () => {
            const response = await api.get("api/member/index");

            members.value = response.data;
        }

         onBeforeMount(() => loadMember());

        const deleteMember = async (id) => {
            const response = await api.delete(`api/member/delete/${id}`);

            if(response.data === true) {
                loadMember();
            }
         }

        const searchedMembers = computed(() => {
            return members.value.filter((member) => {
                return (
                    member.first_name
                    .toLowerCase()
                    .indexOf(searchQuery.value.toLowerCase()) != -1
                 );
             });
         });

        return {
            loadMember,
            deleteMember,
            members,
            searchQuery,
            searchedMembers
        }
    },
    components: {
        MemberForm
    }

}
</script>

<style>

</style>