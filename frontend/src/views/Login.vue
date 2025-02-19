<template>
  <div class="login-container">
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    return { authStore, router };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://128.199.128.166:5000/api/auth/login', {
          email: this.email,
          password: this.password
        });

        const { token, user } = response.data;
        this.authStore.setUser(user, token);

        this.router.push('/dashboard');
      } catch (error) {
        this.errorMessage = 'Invalid email or password.';
      }
    }
  }
};
</script>

<style>
.login-container {
  max-width: 300px;
  margin: auto;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
button {
  padding: 10px;
  width: 100%;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
