<template>
  <Navbar />
  <div class="main-container">
    <div class="mt-4">
      <h1>Profile Page</h1>
      <div
        class="container my-4 bg-white bg-opacity-50 p-5 rounded-4 shadow-lg"
      >
        <form method="post">
          <div class="row">
            <div class="col-md-12">
              <div class="profile-head">
                <h5 class="fw-bold fs-1">
                  {{ user.firstName }} {{ user.lastName }}
                </h5>
                <h6 class="mb-2 text-primary">{{ user.role }}</h6>
                <ul
                  class="nav nav-tabs justify-content-center"
                  id="myTab"
                  role="tablist"
                >
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="about-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#about"
                      type="button"
                      role="tab"
                      aria-controls="about"
                      aria-selected="true"
                      @click="handleAboutClick()"
                    >
                      About
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="courses-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#courses"
                      type="button"
                      role="tab"
                      aria-controls="courses"
                      aria-selected="false"
                      @click="handleCoursesClick()"
                    >
                      Courses
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="tab-content profile-tab" id="myTabContent">
                <div class="active" v-if="aboutActive">
                  <div class="row">
                    <div class="col-md-6">
                      <label>User Id</label>
                    </div>
                    <div class="col-md-6">
                      <p>{{ user.id }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Username</label>
                    </div>
                    <div class="col-md-6">
                      <p>{{ user.username }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Name</label>
                    </div>
                    <div class="col-md-6">
                      <p>{{ user.firstName }} {{ user.lastName }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Age</label>
                    </div>
                    <div class="col-md-6">
                      <p>{{ user.age }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div class="col-md-6">
                      <p>{{ user.phoneNumber }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>specialisation</label>
                    </div>
                    <div class="col-md-6">
                      <p>{{ user.specialisation }}</p>
                    </div>
                  </div>
                </div>
                <div v-if="coursesActive && user.role === 'student'">
                  <div class="mt-4" v-if="courses?.length === 0">
                    <h2 class="fw-bold fs-1">
                      Don't have any courses?
                      <a class="link" href="#/dashboard">Enroll now</a>
                    </h2>
                  </div>
                  <div class="d-flex flex-wrap justify-content-center gap-4">
                    <div
                      v-for="course in courses"
                      :key="course._id"
                      class="card"
                      style="width: 18rem"
                    >
                      <img
                        :src="
                          course.image ||
                          'https://i.ibb.co/0p03mVhg/android-chrome-512x512.png'
                        "
                        class="card-img-top"
                        alt="..."
                        style="height: 240px; width: 286px"
                      />
                      <div class="card-body">
                        <h4 class="card-title fw-bold">{{ course.title }}</h4>
                        <h6 class="card-title">
                          Teacher: {{ course.teacher }}
                        </h6>
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#infoModal"
                          class="btn btn-outline-primary me-1"
                          @click="showCourseInfo(course)"
                        >
                          info ⓘ
                        </button>
                        <a
                          class="btn btn-danger"
                          @click="handleDropOut(course._id)"
                          >Drop out</a
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="coursesActive && user.role === 'teacher'">
                  <div class="mt-4" v-if="courses?.length === 0">
                    <h2 class="fw-bold fs-1">
                      Don't have any courses?
                      <a class="link" href="#/dashboard">Create now</a>
                    </h2>
                  </div>
                  <h4 class="fw-bold fs-4 mb-4" v-else>
                    Want to create / update courses?
                    <a class="link" href="#/dashboard">Dashboard</a>
                  </h4>
                  <div class="d-flex flex-wrap justify-content-center gap-4">
                    <div
                      v-for="course in courses"
                      :key="course._id"
                      class="card"
                      style="width: 18rem"
                    >
                      <img
                        :src="
                          course.image ||
                          'https://i.ibb.co/0p03mVhg/android-chrome-512x512.png'
                        "
                        class="card-img-top"
                        alt="..."
                        style="height: 240px; width: 286px"
                      />
                      <div class="card-body">
                        <h4 class="card-title fw-bold">{{ course.title }}</h4>
                        <h6 class="card-title">
                          Teacher: {{ course.teacher }}
                        </h6>
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#infoModal"
                          class="btn btn-outline-primary me-1"
                          @click="showCourseInfo(course)"
                        >
                          info ⓘ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="infoModal"
    tabindex="-1"
    aria-labelledby="infoModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="infoModalLabel">Course info</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p class="text-primary fw-bold">Course Title</p>
          <p>{{ modalCourse.title }}</p>
          <p class="text-primary fw-bold">Teacher</p>
          <p>{{ modalCourse.teacher }}</p>
          <p class="text-primary fw-bold">Description</p>
          <p>{{ modalCourse.descreption }}</p>
          <div v-if="modalCourse.attendance?.length">
            <p class="text-primary fw-bold">Learners already enrolled</p>
            <p>{{ modalCourse.attendance?.length }}</p>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>

          <button
            type="button"
            class="btn btn-danger"
            @click="handleDropOut(modalCourse._id)"
            v-if="user.role === 'student'"
          >
            Drop out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
const user = ref({});
const modalCourse = ref({});
const courses = ref([]);
const id = ref(localStorage.getItem("id"));
const aboutActive = ref(true);
const coursesActive = ref(false);

onMounted(() => {
  document.title = "EduPortal | Profile";

  axios
    .get(`${process.env.VUE_APP_API_BASE_URL}/users/${id.value}`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      user.value = response.data;
      if (user.value.role === "student") {
        console.log(user.value.enrolledCourses);
        const enrolledCourses = user.value.enrolledCourses;
        for (let i = 0; i < enrolledCourses.length; i++) {
          const element = user.value.enrolledCourses[i];
          axios
            .get(`${process.env.VUE_APP_API_BASE_URL}/courses/${element}`)
            .then((response) => {
              console.log(response.data);
              courses.value.push(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else if (user.value.role === "teacher") {
        console.log(user.value.createdCourses);
        const createdCourses = user.value.createdCourses;
        for (let i = 0; i < createdCourses.length; i++) {
          const element = user.value.createdCourses[i];
          axios
            .get(`${process.env.VUE_APP_API_BASE_URL}/courses/${element}`)
            .then((response) => {
              console.log(response.data);
              courses.value.push(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
const handleDropOut = (courseId) => {
  const dataform = {
    enrolledCourses: user.value.enrolledCourses.filter(
      (course) => course !== courseId
    ),
  };
  const modifiedCourse = courses.value.find(
    (course) => course._id === courseId
  );
  modifiedCourse.attendance = modifiedCourse.attendance.filter(
    (attend) => attend !== user.value._id
  );
  axios.put(
    `${process.env.VUE_APP_API_BASE_URL}/courses/${courseId}`,
    modifiedCourse,
    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );

  axios
    .put(`${process.env.VUE_APP_API_BASE_URL}/users/${id.value}`, dataform, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
const handleAboutClick = () => {
  aboutActive.value = true;
  coursesActive.value = false;
};
const handleCoursesClick = () => {
  aboutActive.value = false;
  coursesActive.value = true;
};

const showCourseInfo = (course) => {
  modalCourse.value = course;
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

.profile-head .nav-tabs {
  margin-bottom: 5%;
}
.profile-head .nav-tabs .nav-link {
  font-weight: 600;
  border: none;
}
.profile-head .nav-tabs .nav-link.active {
  border: none;
  border-bottom: 2px solid #0062cc;
}

.profile-tab label {
  font-weight: 600;
}
.profile-tab p {
  font-weight: 600;
  color: #0062cc;
}
</style>
