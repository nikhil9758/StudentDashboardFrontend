import axios from "axios"
// const { createProxyMiddleware } = require("http-proxy-middleware");



// module.exports = function(app: any) {
//     app.use(
//         "/api",
//         createProxyMiddleware({
//             target: `https://student-dashboard-backend-mz3y.onrender.com/`,
//             changeOrigin: true,
//         })
//     );
// }
    
export const customFetch=axios.create({
    baseURL:'https://student-dashboard-backend-mz3y.onrender.com/'
})