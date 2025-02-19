<template>
  <div>
    <h2>Create Notification & Forms</h2>

    <!-- Tạo Thông Báo -->
    <form @submit.prevent="createNotification">
      <input v-model="title" placeholder="Notification Title" required />
      <textarea v-model="content" placeholder="Notification Content" required></textarea>
      <input v-model="deadline" type="datetime-local" required />

      <label>Target Type:</label>
      <select v-model="targetType" required>
        <option value="all">All Users</option>
        <option value="group">Specific Group</option>
        <option value="individual">Specific Users</option>
      </select>

      <h3>Forms for this Notification</h3>
      <div v-for="(form, formIndex) in forms" :key="formIndex">
        <input v-model="form.name" placeholder="Form Name" required />
        
        <div v-for="(field, fieldIndex) in form.fields" :key="fieldIndex">
          <input v-model="field.label" placeholder="Field Label" required />
          <select v-model="field.type">
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="file">File</option>
          </select>
          <button type="button" @click="removeField(formIndex, fieldIndex)">Remove Field</button>
        </div>

        <button type="button" @click="addField(formIndex)">Add Field</button>
        <button type="button" @click="removeForm(formIndex)">Remove Form</button>
      </div>

      <button type="button" @click="addForm">Add Form</button>
      <button type="submit">Create Notification</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      content: '',
      deadline: '',
      targetType: 'all', // 🔹 Mặc định gửi cho tất cả users
      forms: [],
      message: ''
    };
  },
  methods: {
    addForm() {
      this.forms.push({ name: '', fields: [] });
    },
    removeForm(index) {
      this.forms.splice(index, 1);
    },
    addField(formIndex) {
      this.forms[formIndex].fields.push({ label: '', type: 'text', required: true });
    },
    removeField(formIndex, fieldIndex) {
      this.forms[formIndex].fields.splice(fieldIndex, 1);
    },
    async createNotification() {
      try {
        console.log('🔹 Sending notification:', {
          title: this.title,
          content: this.content,
          deadline: this.deadline,
          targetType: this.targetType
        });

        // 🔹 Tạo Notification trước
        const notificationResponse = await axios.post('http://128.199.128.166:5000/api/notifications', {
          title: this.title,
          content: this.content,
          deadline: this.deadline,
          targetType: this.targetType // 🔹 Bổ sung targetType
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const notificationId = notificationResponse.data.notification.id;

        // 🔹 Nếu có Form, tạo từng form với notificationId vừa tạo
        for (const form of this.forms) {
          await axios.post('http://128.199.128.166:5000/api/forms', {
            notificationId,
            name: form.name,
            fields: form.fields
          }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
        }

        this.message = 'Notification and forms created successfully!';
        this.title = '';
        this.content = '';
        this.deadline = '';
        this.targetType = 'all';
        this.forms = [];

      } catch (error) {
        console.error('❌ Error:', error.response ? error.response.data : error);
        this.message = 'Failed to create notification or forms.';
      }
    }
  }
};
</script>

<style>
input, select, textarea {
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
