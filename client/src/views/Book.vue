<template>
    <div>
        <div>
            <button class="btn-group"  @click="$refs.bookModal?.createForm()" ><i class="fas fa-plus"></i> Add book</button>
            <button class="btn-group"  @click="$refs.rentModal?.showModal()"><i class="fas fa-book-reader"></i> Rent book</button>
            
            <input class="form-control" type="text" v-model="searchQuery" placeholder="Search..."/>
        </div>
        

        <BookForm ref="bookModal" @change="loadBook()"/>
        <RentBookForm ref="rentModal" :books="books" @change="loadBook()" /> 
    
        <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Writer</th>
                <th scope="col">Year</th>
                <th scope="col">Number of pages</th>
                <th scope="col">Available</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(book, index) in searchedBooks" :key="book.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ book.name }}</td>
                <td>{{ book.writer }}</td>
                <td>{{ book.year }}</td>
                <td>{{ book.pages_number }}</td>
                <td>{{ book.available }}</td>
                <td><i @click="$refs.bookModal?.updateForm(book)" class="fas fa-edit" style="color: rgb(44, 109, 184)"></i></td>
                <td><i @click="deleteBook(book.id)" class="fas fa-trash-alt" style="color: crimson"></i></td>
            </tr>
        </tbody>
        </table>
    </div>
</template>


<script>
import { onBeforeMount, ref, computed } from "vue";
import api from "../api/base";
import BookForm from "../components/BookForm.vue"
import RentBookForm from "../components/RentBookForm.vue"

export default {
    name:"Book",
    setup() {
        const books = ref([]);

        const searchQuery = ref("");

        const loadBook = async () => {
            const response = await api.get(`api/book/index`);

            books.value = response.data;
        };

         onBeforeMount(() => loadBook());

         const deleteBook = async (id) => {
             const response = await api.delete(`api/book/delete/${id}`);

             if(response.data === true) {
                 loadBook();
             }
         };

        const searchedBooks = computed(() => {
             return books.value.filter((book) => {
                 return (
                     book.name
                     .toLowerCase()
                     .indexOf(searchQuery.value.toLowerCase()) != -1
                 );
             });
         });

        return {
            loadBook,
            deleteBook,
            books,
            searchQuery,
            searchedBooks
        };
    },
    components: {
        BookForm,
        RentBookForm,
    }
}
</script>

<style>
.btn-group {
  display: inline-block;
  /* background: rgb(58, 173, 125); */
  background: rgb(44, 109, 184);

  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn-group:focus {
  outline: none;
  background: rgb(10, 56, 109);
}

.btn-group:active {
  transform: scale(0.98);
}

th {
    color: rgb(44, 109, 184);
}
</style>