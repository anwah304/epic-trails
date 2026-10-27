import * as yup from "yup";
export const RegisterValidation = yup.object().shape({
    name: yup
        .string()
        .required('Full name is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    // ✅ جديد: يجبر المستخدم يختار الجنس
    gender: yup
        .string()
        .oneOf(['Male', 'Female'], 'Please select your gender')
        .required('Gender is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
})