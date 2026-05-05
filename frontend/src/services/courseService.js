import api from './api';

const route = '/api/Courses';

export const getCourses = () => api.get(route).then((response) => response.data);
export const getCourseById = (id) => api.get(`${route}/${id}`).then((response) => response.data);
export const createCourse = (course) => api.post(route, course).then((response) => response.data);
export const updateCourse = (id, course) => api.put(`${route}/${id}`, course).then(() => true);
export const deleteCourse = (id) => api.delete(`${route}/${id}`).then(() => true);
