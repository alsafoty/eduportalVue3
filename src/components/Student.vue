<template>
  <div class="container my-4 bg-white bg-opacity-50 p-5 rounded-4 shadow-lg">
    <div v-if="user.enrolledCourses?.length">
      <div class="section-title fw-bold fs-3">Enrolled Courses</div>
      <div class="d-flex flex-wrap justify-content-center gap-4">
        <div
          v-for="course in eCourses"
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
          <div class="card-body rounded-4 justify-content-center">
            <h4 class="card-title fw-bold">{{ course.title }}</h4>
            <h6 class="card-title">Teacher: {{ course.teacher }}</h6>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#infoModal"
              class="btn btn-outline-primary me-1"
              @click="showCourseInfo(course)"
            >
              info ⓘ
            </button>
            <a class="btn btn-danger" @click="handleDropOut(course._id)">
              Drop out
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="section-title fw-bold fs-3 mt-3">Available Courses</div>

    <!-- Search bar -->
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      rel="stylesheet"
    />
    <div class="container mb-3">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="search-container">
            <input
              type="text"
              class="form-control search-input"
              placeholder="Search for courses..."
              v-model="searchQuery"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-center gap-4">
      <div
        v-for="course in filteredCourses"
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
          <h6 class="card-title">Teacher: {{ course.teacher }}</h6>

          <!-- Button trigger modal -->
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#infoModal"
            class="btn btn-outline-primary me-1"
            @click="showCourseInfo(course)"
          >
            info ⓘ
          </button>

          <a class="btn btn-primary" @click="handleEnroll(course._id)"
            >Enroll</a
          >
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
              class="btn btn-primary"
              @click="handleEnroll(modalCourse._id)"
              v-if="!user.enrolledCourses?.includes(modalCourse._id)"
            >
              Enroll
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="handleDropOut(modalCourse._id)"
              v-if="user.enrolledCourses?.includes(modalCourse._id)"
            >
              Drop out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, computed } from "vue";
const searchQuery = ref("");
const role = ref("");
const user = ref({});
const eCourses = ref([]);
const courses = ref([]);
const modalCourse = ref({});
const id = ref(localStorage.getItem("id"));
role.value = localStorage.getItem("role");

onMounted(() => {
  document.title = "EduPortal | Dashboard";
  axios
    .get(`${process.env.VUE_APP_API_BASE_URL}/courses`)
    .then((response) => {
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
      //   console.log(user.value.enrolledCourses);
      const enrolledCourses = user.value.enrolledCourses;

      if (enrolledCourses) {
        for (let i = 0; i < enrolledCourses.length; i++) {
          const element = user.value.enrolledCourses[i];
          axios
            .get(`${process.env.VUE_APP_API_BASE_URL}/courses/${element}`)
            .then((response) => {
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

const filteredCourses = computed(() => {
  if (!searchQuery.value) {
    return courses.value;
  }
  return courses.value.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleEnroll = (courseId) => {
  const dataform = {};
  const modifiedCourse = courses.value.find(
    (course) => course._id === courseId
  );

  if (user.value.enrolledCourses) {
    if (user.value.enrolledCourses?.includes(courseId)) {
      alert("You are already enrolled in this course");
      return;
    }
    dataform.enrolledCourses = [...user.value.enrolledCourses, courseId];
  } else {
    dataform.enrolledCourses = [courseId];
  }

  if (modifiedCourse.attendance) {
    modifiedCourse.attendance = [...modifiedCourse.attendance, user.value._id];
  } else {
    modifiedCourse.attendance = [user.value._id];
  }

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
      location.reload();
    })
    .catch((error) => {
      if (error.response.status == 401) {
        alert("You are not authorized to view this page, Please Login");
      }
      console.log(error);
    });
};
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
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
const showCourseInfo = (course) => {
  modalCourse.value = course;
};
</script>

<style></style>
