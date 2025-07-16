<template>
  <!-- <Navbar /> -->
  <div class="main-container">
    <div class="mt-4">
      <h1>Login Page</h1>
    </div>

    <div
      class="container mt-5 mb-5 d-flex justify-content-center"
      v-if="showRegister"
    >
      <div class="card px-1 py-4 shadow-lg">
        <div class="d-flex flex-column gap-3 card-body">
          <h2 class="card-title mb-3">Register</h2>
          <h6 class="information mt-2">
            Please provide following information about the new user
          </h6>
          <div class="row">
            <div class="col-12">
              <div class="input-group">
                <input
                  class="form-control col-3"
                  type="text"
                  placeholder="User ID"
                  v-model="user.id"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="input-group">
                <!-- <label for="name">Name</label> -->
                <input
                  class="form-control col-3"
                  type="text"
                  placeholder="First Name"
                  v-model="user.firstName"
                />
                <input
                  class="form-control col-3"
                  type="text"
                  placeholder="Last Name"
                  v-model="user.lastName"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Age"
                    v-model="user.age"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="specialization"
                    v-model="user.specialisation"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Mobile Number"
                    v-model="user.phoneNumber"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Username"
                    v-model="user.username"
                  />
                  <input
                    class="form-control"
                    type="password"
                    placeholder="Password"
                    v-model="user.password"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <select class="form-control text-dark" v-model="user.role">
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </div>
          </div>
          <div class="information mt-1 fs-6">
            Already have an account?
            <a class="link" @click="showRegister = false">Login here</a>
          </div>
          <button
            class="btn btn-primary btn-block confirm-button"
            @click="handleConfirm"
          >
            Register
          </button>
        </div>
      </div>
    </div>

    <div class="container mt-5 mb-5 d-flex justify-content-center" v-else>
      <div class="card px-1 py-4 shadow-lg">
        <div class="d-flex flex-column gap-3 card-body">
          <h2 class="card-title mb-3">Login</h2>
          <h6 class="information mt-2">
            Please provide following information to login
          </h6>

          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Username"
                    v-model="user.username"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <div class="input-group">
                  <input
                    class="form-control"
                    type="password"
                    placeholder="Password"
                    v-model="user.password"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="error"
            class="text-danger border border-danger rounded p-2"
          >
            Invalid username or password!
          </div>
          <div class="information mt-1 fs-6">
            Don't have an account?

            <a class="link" @click="showRegister = true">Register here</a>
          </div>
          <button
            class="btn btn-primary btn-block confirm-button mt-1"
            @click="handleLogin"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const error = ref(false);

const showRegister = ref(false);
const user = ref({
  id: "",
  age: null,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  username: "",
  password: "",
  specialisation: "",
  role: "student",
});
onMounted(() => {
  document.title = "EduPortal | Login";
});
const handleConfirm = () => {
  axios
    .post(`${process.env.VUE_APP_API_BASE_URL}/users/Register`, user.value)
    .then((response) => {
      alert("User registered successfully");
      showRegister.value = false;
    })
    .catch((error) => {
      if (error.response.status === 409) {
        alert("Username or ID already exists");
      }
      console.log(error);
    });
};
const handleLogin = () => {
  axios
    .post(`${process.env.VUE_APP_API_BASE_URL}/users/Login`, user.value)
    .then((response) => {
      showRegister.value = false;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("id", response.data.id);
      alert("User logged in successfully");
      router.push("/");
    })
    .catch((err) => {
      if (err.response.status === 401) {
        error.value = true;
      }
      console.log(err);
    });
};
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
</style>
