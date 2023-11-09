import axios from "axios"

export const customFetch=axios.create({
    baseURL:'https://cors-anywhere.herokuapp.com/https://student-dashboard-backend-mz3y.onrender.com/'
})