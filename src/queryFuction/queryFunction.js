import axiosInstance from "../api/axiosInstance";
import { admin_dashboard_end, banner_end, banners_end, blog_end, blogs_end, create_banners_end, create_blogs_end, create_faqs_end, create_pricings_end, create_services_end,  delete_banner_end, delete_blog_end, delete_faq_end, delete_pricing_end, delete_user_end, faq_end, faqs_end, login_end, logout_end, pricing_end, pricings_end, profile_end, service_end, services_end, subscription_end, update_banner_end, update_blog_end, update_faq_end, update_pricing_end, update_service_end, update_user_end, user_end, users_end } from "../api/urls";


export const login = async (data) => {
    try {
        const login = await axiosInstance.post(login_end, data);
        return login.data
    } catch (error) {
        console.log(error)
    }
}
export const logout = async () => {
    try {
        const logout = await axiosInstance.post(logout_end);
        return logout.data
    } catch (error) {
        console.log(error)
    }
}

export const profile = async () => {
    try {
        const profile = await axiosInstance.get(profile_end);
        return profile.data
    } catch (error) {
        console.log(error)
    }
}

// User Management
export const users = async () => {
    try {
        const users = await axiosInstance.get(users_end);
        return users.data
    } catch (error) {
        console.log(error)
    }
}

export const user = async (id) => {
    try {
        const user = await axiosInstance.get(`${user_end}/${id}`);
        return user.data
    } catch (error) {
        console.log(error)
    }
}

export const update_user = async (id, data) => {
    try {
        const update_user = await axiosInstance.put(`${update_user_end}/${id}`, data);
        return update_user.data
    } catch (error) {
        console.log(error)
    }
}

export const delete_user = async (id) => {
    try {
        const delete_user = await axiosInstance.delete(`${delete_user_end}/${id}`);
        return delete_user.data
    } catch (error) {
        console.log(error)
    }
}

// Banner Management
export const create_banner = async (data) => {
    try {
        const create_banner = await axiosInstance.post(create_banners_end, data);
        return create_banner.data
    } catch (error) {
        console.log(error)
    }
}

export const banners = async () => {
    try {
        const banners = await axiosInstance.get(banners_end);
        return banners.data
    } catch (error) {
        console.log(error)
    }
}

export const banner = async (id) => {
    try {
        const banner = await axiosInstance.get(`${banner_end}/${id}`);
        return banner.data
    } catch (error) {
        console.log(error)
    }
}

export const update_banner = async ({id, data}) => {
    try {
        const update_banner = await axiosInstance.put(`${update_banner_end}/${id}`, data);
        return update_banner.data
    } catch (error) {
        console.log(error)
    }
}

export const delete_banner = async (id) => {
    try {
        const delete_banner = await axiosInstance.delete(`${delete_banner_end}/${id}`);
        return delete_banner.data
    } catch (error) {
        console.log(error)
    }
}

// FAQ Management

export const create_faq = async (data)=>{
    try {
        const create_faq = await axiosInstance.post(create_faqs_end, data);
        return create_faq.data
    } catch (error) {
        console.log(error)
    }
}

export const faqs = async () => {
    try {
        const faqs = await axiosInstance.get(faqs_end);
        return faqs.data
    } catch (error) {
        console.log(error)
    }
}


export const faq = async (id) => {
    try {
        const faq = await axiosInstance.get(`${faq_end}/${id}`);
        return faq.data
    } catch (error) {
        console.log(error)
    }
}

export const update_faq = async (id, data)=>{
    try {
        const update_faq = await axiosInstance.put(`${update_faq_end}/${id}`, data);
        return update_faq.data
    } catch (error) {
        console.log(error)
    }
}

export const delete_faq = async (id)=>{
    try {
        const delete_faq = await axiosInstance.delete(`${delete_faq_end}/${id}`);
        return delete_faq.data
    } catch (error) {
        console.log(error)
    }
}


// Pricing Management
export const create_pricing = async (data)=>{
    try {
        const create_pricing = await axiosInstance.post(create_pricings_end, data);
        return create_pricing.data
    } catch (error) {
        console.log(error)
    }
}

export const pricings = async () => {
    try {
        const pricings = await axiosInstance.get(pricings_end);
        return pricings.data
    } catch (error) {
        console.log(error)
    }
}

export const pricing = async (id) => {
    try {
        const pricing = await axiosInstance.get(`${pricing_end}/${id}`);
        return pricing.data
    } catch (error) {
        console.log(error)
    }
}

export const update_pricing = async (id, data)=>{
    try {
        const update_pricing = await axiosInstance.put(`${update_pricing_end}/${id}`, data);
        return update_pricing.data
    } catch (error) {
        console.log(error)
    }
}

export const delete_pricing = async (id)=>{
    try {
        const delete_pricing = await axiosInstance.delete(`${delete_pricing_end}/${id}`);
        return delete_pricing.data
    } catch (error) {
        console.log(error)
    }
}


// Service Management
export const create_service = async (data)=>{
    try {
        const create_service = await axiosInstance.post(create_services_end, data);
        return create_service.data
    } catch (error) {
        console.log(error)
    }
}

export const services = async () => {
    try {
        const services = await axiosInstance.get(services_end);
        return services.data
    } catch (error) {
        console.log(error)
    }
}

export const service = async (id) => {
    try {
        const service = await axiosInstance.get(`${service_end}/${id}`);
        return service.data
    } catch (error) {
        console.log(error)
    }
}

export const update_service = async (id, data)=>{
    try {
        const update_service = await axiosInstance.put(`${update_service_end}/${id}`, data);
        return update_service.data
    } catch (error) {
        console.log(error)
    }
}


// Blog Management
export const create_blog = async (data)=>{
    try {
        const create_blog = await axiosInstance.post(create_blogs_end, data);
        return create_blog.data
    } catch (error) {
        console.log(error)
    }
}

export const blogs = async () => {
    try {
        const blogs = await axiosInstance.get(blogs_end);
        return blogs.data
    } catch (error) {
        console.log(error)
    }
}


export const blog = async (id) => {
    try {
        const blog = await axiosInstance.get(`${blog_end}/${id}`);
        return blog.data
    } catch (error) {
        console.log(error)
    }
}

export const update_blog = async (id, data)=>{
    try {
        const update_blog = await axiosInstance.put(`${update_blog_end}/${id}`, data);
        return update_blog.data
    } catch (error) {
        console.log(error)
    }
}

export const delete_blog = async (id)=>{
    try {
        const delete_blog = await axiosInstance.delete(`${delete_blog_end}/${id}`);
        return delete_blog.data
    } catch (error) {
        console.log(error)
    }
}

// Admin Dashboard 

export const admin_dashboard = async () => {
    try {
        const admin_dashboard = await axiosInstance.get(admin_dashboard_end);
        return admin_dashboard.data
    } catch (error) {
        console.log(error)
    }
}

// Subscription Management

export const subscriptions = async () => {
    try {
        const subscription = await axiosInstance.get(subscription_end);
        return subscription.data
    } catch (error) {
        console.log(error)
    }
}