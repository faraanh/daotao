<template>
  <div>
    <h2>{{ notification.title }}</h2>
    <p>{{ notification.content }}</p>
    <p><strong>Deadline:</strong> {{ formatDate(notification.deadline) }}</p>

    <h3>Forms</h3>
    <div v-for="form in forms" :key="form.id">
      <h4>{{ form.name }}</h4>
      <form @submit.prevent="submitForm(form.id)">
        <div v-for="field in form.FormFields" :key="field.id">
          <label>{{ field.label }}</label>
          <input v-if="field.type === 'text'" type="text" v-model="formData[form.id][field.id]" />
          <input v-if="field.type === 'number'" type="number" v-model="formData[form.id][field.id]" />
          <input v-if="field.type === 'date'" type="date" v-model="formData[form.id][field.id]" />
        </div>
        <button type="submit">Submit Response</button>
      </form>
    </div>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      notification: {},
      forms: [],
      formData: {},
      message: ''
    };
  },
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();
    return { authStore, route, router };
  },
  methods: {
    async fetchNotification() {
      try {
        const response = await axios.get(`http://128.199.128.166:5000/api/notifications/${this.route.params.id}`, {
          headers: { Authorization: `Bearer ${this.authStore.token}` }
        });
        this.notification = response.data;
      } catch (error) {
        console.error('Error fetching notification:', error);
        this.router.push('/dashboard');
      }
    },
    async fetchForms() {
      try {
        const response = await axios.get(`http://128.199.128.166:5000/api/forms/notification/${this.route.params.id}`, {
          headers: { Authorization: `Bearer ${this.authStore.token}` }
        });
        this.forms = response.data;
        
        // Khởi tạo dữ liệu rỗng để lưu phản hồi
        this.forms.forEach(form => {
          this.formData[form.id] = {};
          form.FormFields.forEach(field => {
            this.formData[form.id][field.id] = '';
          });
        });
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    },
    async submitForm(formId) {
      try {
        await axios.post(`http://128.199.128.166:5000/api/responses`, {
    notificationId: this.route.params.id,  // 🔹 Sử dụng notificationId thay vì formId
    content: JSON.stringify(this.formData[formId]),
    no_data: false
}, {
    headers: { Authorization: `Bearer ${this.authStore.token}` }
});

        this.message = 'Response submitted successfully!';
      } catch (error) {
        console.error('Error submitting response:', error);
        this.message = 'Failed to submit response.';
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    }
  },
  mounted() {
    this.fetchNotification();
    this.fetchForms();
  }
};
</script>

<style>
input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}
button {
  padding: 8px 12px;
  margin: 5px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
