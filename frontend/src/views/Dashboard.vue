<template>
  <div>
    <h2>Welcome, {{ authStore.user?.name }}</h2>
    <button @click="logout">Logout</button>

    <h3>Notifications</h3>
    <ul v-if="notifications.length > 0">
      <li v-for="notification in notifications" :key="notification.id">
        <h4>
          <router-link :to="`/notifications/${notification.id}`">
            {{ notification.title }}
          </router-link>
        </h4>
        <p><strong>Deadline:</strong> {{ formatDate(notification.deadline) }}</p>
      </li>
    </ul>
    <p v-else>No notifications available.</p>
  </div>
</template>


<script>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      notifications: []
    };
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const logout = () => {
      authStore.logout();
      router.push('/');
    };

    return { authStore, logout };
  },
  methods: {
    async fetchNotifications() {
      try {
        const response = await axios.get('http://128.199.128.166:5000/api/notifications', {
          headers: { Authorization: `Bearer ${this.authStore.token}` }
        });
        this.notifications = response.data;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    }
  },
  mounted() {
    this.fetchNotifications();
  }
};
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}
</style>
