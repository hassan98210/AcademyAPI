import api from './api';

const route = '/api/Enrollments';

export const getEnrollments = () => api.get(route).then((response) => response.data);
export const getEnrollmentsForStudent = (studentId) => api.get(`${route}/student/${studentId}`).then((response) => response.data);
export const createEnrollment = (enrollment) => api.post(route, enrollment).then((response) => response.data);
export const updateEnrollmentGrade = (id, grade) => api.put(`${route}/${id}/grade`, { grade }).then(() => true);
export const deleteEnrollment = (id) => api.delete(`${route}/${id}`).then(() => true);
