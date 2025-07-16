<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid d-flex flex-row">
      <a class="navbar-brand" href="#">
        <i class="bi bi-mortarboard"></i>
        EduPortal
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="d-flex flex-row ms-auto justify-content-center">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle fw-bold text-white"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                dir="rtl"
              >
                Profile
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="#/profile">Profile</a>
                </li>
                <li>
                  <a class="dropdown-item" @click="handleLogout">Logout</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-bold text-white" href="#/dashboard"
                >Dashboard</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link fw-bold text-white"
                aria-current="page"
                href="#"
                >Home</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<style></style>
