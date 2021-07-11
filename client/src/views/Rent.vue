<template>
<div>
    <table class="table table-hover">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Card number</th>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Date renting</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(rent, index) in rents" :key="rent.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ rent.name }}</td>
            <td>{{ rent.member_id }}</td>
            <td>{{ rent.first_name }}</td>
            <td>{{ rent.last_name }}</td>
            <td>{{ rent.renting_date }}</td>
            <td><button class="btn-group" @click="returnBook(rent.id, rent.book_id)" style="margin:0"> <i class="fas fa-arrow-left"></i> Return book</button></td>
        </tr>
    </tbody>
    </table>
</div>

</template>

<script>
import api from "../api/base";
import { onBeforeMount, ref } from "vue";

export default {
    name:"Rent",
    setup() {
        const rents = ref([]);
     
        const loadRent = async () => {
            const response = await api.get("api/book/index-rent");

            rents.value = response.data;
        }

        onBeforeMount(() => loadRent());

        const returnBook = async (rent_id, book_id) => {
            const response = await api.delete(`api/book/returnBook/${rent_id}/${book_id}`); //2 parametra
            
            if(response.data === true) {
                loadRent();
            }
        }

        return {
            loadRent,
            rents,
            returnBook
        }
    }

}
</script>

<style>

</style>