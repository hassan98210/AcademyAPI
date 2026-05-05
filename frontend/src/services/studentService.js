import api from './api';

const route = '/api/Students';

export const getStudents = () => api.get(route).then((response) => response.data);
export const getStudentById = (id) => api.get(`${route}/${id}`).then((response) => response.data);
export const registerStudent = (student) => api.post(`${route}/register`, student).then((response) => response.data);
export const deleteStudent = (id) => api.delete(`${route}/${id}`).then(() => true);
