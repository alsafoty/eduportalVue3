<template>
  <div class="main-container">
    <div class="mt-4">
      <h1>Home Page</h1>
      <p class="text-center fw-bold fs-1">Welcome to EduPortal</p>

      <div class="d-flex flex-wrap justify-content-center gap-5">
        <div
          class="d-flex flex-column gap-4 justify-content-center bg-white bg-opacity-50 p-5 rounded-4 shadow-lg"
        >
          <div>
            <i
              class="d-flex bi bi-person-circle text-dark"
              style="font-size: 300px"
            ></i>
          </div>
          <div
            class="d-flex btn btn-dark rounded-pill justify-content-center fw-bold"
            style="width: 300px"
            @click="router?.push('/profile')"
          >
            View Profile
          </div>
        </div>
        <div
          class="d-flex flex-column gap-4 justify-content-center bg-white bg-opacity-50 p-5 rounded-4 shadow-lg"
        >
          <div>
            <i
              class="d-flex bi bi-speedometer text-dark"
              style="font-size: 300px"
            ></i>
          </div>
          <div
            class="d-flex btn btn-dark rounded-pill justify-content-center fw-bold"
            style="width: 300px"
            @click="router?.push('/dashboard')"
          >
            View Dashboard
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 


{
    "title": "Math course",
    "descreption": "This is a math course",
    "teacher": "Odai"
  }

-->
<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  document.title = "EduPortal | Main page";
});
</script>

<style scoped>
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
</style>
