<template>
  <Navbar />
  <div class="main-container">
    <div class="mt-4">
      <h1>Dashboard Page</h1>
      <div>
        <div>
          <p>Welcome, {{ user.firstName }}!</p>
        </div>
      </div>

      <Student v-if="role == 'student'" />
      <Teacher v-if="role == 'teacher'" />
    </div>
  </div>
</template>

<script setup>
import Student from "@/components/Student.vue";
import Teacher from "@/components/Teacher.vue";

import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import { onMounted, ref, computed } from "vue";

const role = ref("");
const user = ref({});
const eCourses = ref([]);
const courses = ref([]);
const id = ref(localStorage.getItem("id"));
role.value = localStorage.getItem("role");

// console.log(role.value);
onMounted(() => {
  document.title = "EduPortal | Dashboard";
  axios
    .get(`${process.env.VUE_APP_API_BASE_URL}/courses`)
    .then((response) => {
      // console.log(response.data);
      courses.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  axios
    .get(`${process.env.VUE_APP_API_BASE_URL}/users/${id.value}`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      user.value = response.data;
      // console.log(user.value.enrolledCourses);
      const enrolledCourses = user.value.enrolledCourses;

      if (enrolledCourses) {
        for (let i = 0; i < enrolledCourses.length; i++) {
          const element = user.value.enrolledCourses[i];
          axios
            .get(`${process.env.VUE_APP_API_BASE_URL}/courses/${element}`)
            .then((response) => {
              // console.log(response.data);
              eCourses.value.push(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    })
    .catch((error) => {
      if (error.response.status == 401) {
        alert("You are not authorized to view this page, Please Login");
      }
      console.log(error);
    });
});
</script>

<style>
.main-container {
  background: radial-gradient(
    circle,
    rgb(255, 255, 255) 0%,

    rgb(94, 95, 105) 100%
  );
  background-size: cover;
  min-height: 100vh;
  overflow: hidden;
}

.section-title {
  color: #0d6efd;
  border-bottom: 2px solid #0d6efd;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.search-container {
  position: relative;
}

.search-input {
  height: 50px;
  border-radius: 30px;
  padding-left: 35px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #888;
}
</style>
