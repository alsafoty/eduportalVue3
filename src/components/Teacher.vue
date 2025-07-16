<template>
  <div class="container my-4 bg-white bg-opacity-50 p-5 rounded-4 shadow-lg">
    <div v-if="user.createdCourses?.length">
      <div v-if="!editing">
        <div class="section-title fw-bold fs-3">Teaching Courses</div>

        <div class="d-flex flex-wrap justify-content-center gap-4">
          <div
            v-for="course in tCourses"
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
            <div class="card-body rounded-4">
              <h4 class="card-title fw-bold">{{ course.title }}</h4>
              <h6 class="card-title">Teacher: {{ course.teacher }}</h6>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#infoModal"
                class="btn btn-outline-primary me-1 mb-1"
                @click="showCourseInfo(course)"
              >
                info ⓘ
              </button>
              <div class="d-flex gap-2 justify-content-center">
                <a class="btn btn-primary" @click="handleEdit(course._id)">
                  Edit
                </a>
                <a class="btn btn-danger" @click="handleDelete(course._id)">
                  Delete
                </a>
              </div>
            </div>
          </div>

          <div
            class="card p-4 d-flex flex-wrap justify-content-center gap-5"
            style="width: 288px"
          >
            <div class="d-flex justify-content-center">
              <i
                class="d-flex bi bi-plus-circle text-dark"
                style="font-size: 200px"
              ></i>
            </div>

            <!-- Button trigger modal -->
            <div class="d-flex justify-content-center mt-4">
              <button
                class="d-flex btn btn-dark justify-content-center fw-bold"
                style="width: 200px"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Create a course
              </button>

              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        Create a course
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <form>
                      <div class="modal-body">
                        <div class="mb-3">
                          <label for="courseTitle" class="form-label"
                            >Course Title</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="courseTitle"
                            placeholder="Enter course title"
                            v-model="course.title"
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <label for="courseDescription" class="form-label"
                            >Course Description</label
                          >
                          <textarea
                            class="form-control"
                            id="courseDescription"
                            rows="3"
                            placeholder="Enter course description"
                            v-model="course.descreption"
                            required
                          ></textarea>
                        </div>
                        <div class="mb-3">
                          <label for="courseImage" class="form-label"
                            >Course Image</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="courseImage"
                            placeholder="Enter course image URL"
                            v-model="course.image"
                          />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button class="btn btn-dark" @click="createCourse">
                          Create Course
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="section-title fw-bold fs-3">Course Editing</div>
        <div class="d-flex justify-content-center">
          <div
            class="d-flex flex-column gap-4 justify-content-center bg-white bg-opacity-50 p-5 rounded-4 shadow-lg col-md-6"
          >
            <form>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="courseTitle" class="form-label"
                    >Course Title</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="courseTitle"
                    placeholder="Enter course title"
                    v-model="eCourse.title"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="courseDescription" class="form-label"
                    >Course Description</label
                  >
                  <textarea
                    class="form-control"
                    id="courseDescription"
                    rows="3"
                    placeholder="Enter course description"
                    v-model="eCourse.descreption"
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="courseImage" class="form-label"
                    >Course Image</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="courseImage"
                    placeholder="Enter course image URL"
                    v-model="eCourse.image"
                  />
                </div>
              </div>
              <div class="modal-footer justify-content-center gap-3">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="editing = false"
                >
                  Close
                </button>
                <button
                  class="btn btn-dark"
                  @click="handleConfirmEdit(eCourse._id)"
                >
                  Edit Course
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex flex-wrap justify-content-center gap-5" v-else>
      <div
        class="d-flex flex-column gap-4 justify-content-center bg-white bg-opacity-50 p-5 rounded-4 shadow-lg"
      >
        <div>
          <i
            class="d-flex bi bi-plus-circle text-dark"
            style="font-size: 300px"
          ></i>
        </div>

        <!-- Button trigger modal -->
        <button
          class="btn btn-dark rounded-pill justify-content-center fw-bold"
          style="width: 300px"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Create a course
        </button>

        <!-- Modal -->
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Create a course
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <form>
                <div class="modal-body">
                  <div class="mb-3">
                    <label for="courseTitle" class="form-label"
                      >Course Title</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="courseTitle"
                      placeholder="Enter course title"
                      v-model="course.title"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="courseDescription" class="form-label"
                      >Course Description</label
                    >
                    <textarea
                      class="form-control"
                      id="courseDescription"
                      rows="3"
                      placeholder="Enter course description"
                      v-model="course.descreption"
                      required
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="courseImage" class="form-label"
                      >Course Image</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="courseImage"
                      placeholder="Enter course image URL"
                      v-model="course.image"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button class="btn btn-dark" @click="createCourse">
                    Create Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
            @click="handleDelete(modalCourse._id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { Alert } from "bootstrap";
import { onMounted, ref } from "vue";
const role = ref("");
const tCourses = ref([]);
const user = ref({});
const editing = ref(false);
const modalCourse = ref({});

const id = ref(localStorage.getItem("id"));
role.value = localStorage.getItem("role");
const course = ref({
  title: "",
  descreption: "",
  teacher: user.value.id,
  image: "",
});
const eCourse = ref({
  title: "",
  descreption: "",
  image: "",
});

onMounted(() => {
  document.title = "EduPortal | Dashboard";

  axios
    .get(`${process.env.VUE_APP_API_BASE_URL}/users/${id.value}`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      user.value = response.data;

      const createdCourses = user.value.createdCourses;

      if (createdCourses) {
        for (let i = 0; i < createdCourses.length; i++) {
          const element = user.value.createdCourses[i];
          axios
            .get(`${process.env.VUE_APP_API_BASE_URL}/courses/${element}`)
            .then((response) => {
              tCourses.value.push(response.data);
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

const Testing = (courseId) => {
  console.log(tCourses.value);
  const dcourse = tCourses.value.filter((course) => course._id === courseId)[0];
  console.log(dcourse);
  console.log(dcourse.attendance?.length);
};
const createCourse = () => {
  const dataform = {
    title: course.value.title,
    descreption: course.value.descreption,
    teacher: user.value.firstName + " " + user.value.lastName,
    image: course.value.image,
  };
  axios
    .post(`${process.env.VUE_APP_API_BASE_URL}/courses`, dataform, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      handleCreate(response.data._id);
      alert("Course created successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleCreate = (courseId) => {
  const dataform = {};

  if (user.value.createdCourses) {
    dataform.createdCourses = [...user.value.createdCourses, courseId];
  } else {
    dataform.createdCourses = [courseId];
  }
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
const handleDelete = (courseId) => {
  const dcourse = tCourses.value.filter((course) => course._id === courseId)[0];
  console.log(dcourse.attendance?.length);
  if (dcourse.attendance?.length > 0) {
    dcourse.attendance?.length === 1
      ? alert(`Don't be mean, there is one student taking this course.`)
      : alert(
          `Don't be mean, there are ${dcourse.attendance?.length} students taking this course.`
        );
    return;
  }
  const dataform = {
    createdCourses: user.value.createdCourses.filter(
      (course) => course !== courseId
    ),
  };
  axios
    .put(`${process.env.VUE_APP_API_BASE_URL}/users/${id.value}`, dataform, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      axios
        .delete(`${process.env.VUE_APP_API_BASE_URL}/courses/${courseId}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          location.reload();
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleEdit = (courseId) => {
  eCourse.value = tCourses.value.find((course) => course._id === courseId);
  editing.value = true;
};

const handleConfirmEdit = (courseId) => {
  const dataform = {
    title: eCourse.value.title,
    descreption: eCourse.value.descreption,
    image: eCourse.value.image,
  };
  axios
    .put(`${process.env.VUE_APP_API_BASE_URL}/courses/${courseId}`, dataform, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      alert("Course updated successfully");
      editing.value = false;
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
