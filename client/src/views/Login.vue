<template>
	<div class="form-container" @submit.prevent="handleSubmit">
		<SignupForm ref="signupModal"/>
		<form class="login-box">
			<h1>Login</h1>
			<div class="textbox">
				<i class="fa fa-user"></i>
				<input type="text" v-model="form.username" placeholder="Username"/>
			</div>
			<div class="textbox">
				<i class="fa fa-lock" aria-hidden="true"></i>
				<input type="password" v-model="form.password" placeholder="Password"/>
			</div>
			<input class="submit" type="submit" value="Login" />
			<p>Don't have account? <a @click="$refs.signupModal?.showModal()" href="#" >Singup Now</a></p>
		</form>
	</div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import SignupForm from "../components/SignupForm.vue"

export default {
	name: "Login",
	setup() {
		const router = useRouter();

		const form = reactive({
			username: "",
			password: "",
		});

		const handleSubmit = async () => {
			const response = await axios.post("http://localhost:5000/api/user/login", form);

			if (response.data.success === true) {
				localStorage.setItem("token", response.data.token);
				router.push("/app");
			} else {
				alert(response.data.message);
			}
		};

		return {
			form,
			handleSubmit,
		};
	},
	components: {
		SignupForm
	}
};
</script>

<style scoped >
.form-container {
	margin: 0;
	padding: 0;
	font-family: sans-serif;
	background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
		url("../../image/login.jpg");
	height: 100vh;
	background-size: cover;
	background-position: center;
}

.login-box {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: white;
}

.login-box h1 {
	font-size: 40px;
	border-bottom: 6px solid #992139;
	margin-bottom: 50px;
	padding: 13px 0;
}

.textbox {
	font-size: 20px;
	padding: 8px 0;
	margin: 8px 0;
	border-bottom: 1px solid #992139;
}

.textbox i {
	width: 26px;
	float: left;
	text-align: center;
}

.textbox input {
	border: none;
	outline: none;
	background: none;
	color: white;
	font-size: 18px;
}

.submit {
	width: 100%;
	background: none;
	color: white;
	border: 2px solid #992139;
	border-radius: 3px;
	padding: 5px;
	margin-top: 12px;
	font-size: 18px;
	cursor: pointer;
	letter-spacing: 1px;
}

.submit:hover {
	color: #992139;
}

.submit:active {
	transform: scale(0.97);
}

a {
	text-decoration: none;
}
</style>