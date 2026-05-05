import api from './api';

const route = '/api/Instructors';

export const getInstructors = () => api.get(route).then((response) => response.data);
export const getInstructorById = (id) => api.get(`${route}/${id}`).then((response) => response.data);
export const createInstructor = (instructor) => api.post(route, instructor).then((response) => response.data);
export const updateInstructor = (id, instructor) => api.put(`${route}/${id}`, instructor).then(() => true);
export const deleteInstructor = (id) => api.delete(`${route}/${id}`).then(() => true);
