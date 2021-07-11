<template>
    <div>
        <div class="nav">
            <router-link :to="{ name: 'Book' }">Books</router-link>
            <router-link :to="{ name: 'Member' }">Members</router-link>
            <router-link :to="{ name: 'Rent' }">Rented books</router-link>
        </div>
         <button class="btn-logout"><i class="fas fa-sign-out-alt"></i> Logout</button>
        <router-view/>
    </div>
</template>

<script>

export default {
	name: "AppLayout",
};
</script>

<style scoped>

    div .nav {
        padding: 30px;
        display: inline-block;
        margin-left: auto;
    }

    .nav a {
        font-weight: bold;
        color: #2c3e50;
        text-decoration: none;
        padding: 10px;
        border-radius: 4px;
    }

    .nav a.router-link-exact-active {
        color: white;
        background: crimson;
    }

    .btn-logout {
        font-weight: bold;
        padding: 10px;
        border-radius: 4px;
        background: white;
        color: crimson;
        border-color: crimson;
        float: right;
        margin: 30px;
    }
    .btn-logout:hover {
        color: white;
        background: crimson;
        /* border-color: crimson; */
        /* border: none; */
    }
</style>