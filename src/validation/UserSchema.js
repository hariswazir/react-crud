import * as yup from "yup";

export const UserSchema = yup.object({
    name: yup.string().required("Name is required."), 
    
    username: yup.string().required("UserName is required."),
    
    email: yup.string()
        .email("Invalid Email format")
        .required("Email is required."),
    
    
    age: yup.number()
        .typeError("Age must be a number") 
        .required("Age is required.")
        .positive("Age must be positive")
        .integer("Age must be a whole number"),
});


export default UserSchema;