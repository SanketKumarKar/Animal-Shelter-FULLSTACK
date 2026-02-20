import API from "./api";

//successfully developed and using RESTFULL API for animal shelter management system  

// ── Auth ──
export const authService = {
    login: (data) => API.post("/auth/login", data),
    register: (data) => API.post("/auth/register", data),
    me: () => API.get("/auth/me"),
};

// ── Animals ──
export const animalService = {
    getAll: () => API.get("/animals"),
    create: (data) => API.post("/animals", data),
    getById: (id) => API.get(`/animals/${id}`),
};

// ── Adopters ──
export const adopterService = {
    getAll: () => API.get("/adopters"),
    create: (data) => API.post("/adopters", data),
    update: (id, data) => API.put(`/adopters/${id}`, data),
    delete: (id) => API.delete(`/adopters/${id}`),
};

// ── Adopter Phones ──
export const adopterPhoneService = {
    getAll: () => API.get("/adopter-phones"),
    create: (data) => API.post("/adopter-phones", data),
    delete: (ph, adId) => API.delete(`/adopter-phones/${ph}/${adId}`),
};

// ── Staff ──
export const staffService = {
    getAll: () => API.get("/staff"),
    create: (data) => API.post("/staff", data),
    update: (id, data) => API.put(`/staff/${id}`, data),
    delete: (id) => API.delete(`/staff/${id}`),
};

// ── Staff Phones ──
export const staffPhoneService = {
    getAll: () => API.get("/staff-phones"),
    create: (data) => API.post("/staff-phones", data),
    delete: (ph, stffId) => API.delete(`/staff-phones/${ph}/${stffId}`),
};

// ── Medical Records ──
export const medrecService = {
    getAll: () => API.get("/medrec"),
    create: (data) => API.post("/medrec", data),
};

// ── Checkups ──
export const checkupService = {
    getAll: () => API.get("/checkups"),
    create: (data) => API.post("/checkups", data),
};

// ── Vets ──
export const vetService = {
    getAll: () => API.get("/vets"),
    create: (data) => API.post("/vets", data),
};

// ── Donations ──
export const donationService = {
    getAll: () => API.get("/donations"),
    create: (data) => API.post("/donations", data),
    getGrowth: () => API.get("/donations/growth"),
};

// ── Volunteers ──
export const volunteerService = {
    getAll: () => API.get("/volunteers"),
    create: (data) => API.post("/volunteers", data),
    update: (id, data) => API.put(`/volunteers/${id}`, data),
    delete: (id) => API.delete(`/volunteers/${id}`),
};
