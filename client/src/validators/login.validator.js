import axios from "axios"
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userSlice";
import { useNavigate } from "react-router"

const useLoginFormik = (setError) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    return useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: values => {
            const errors = {}
            if (!values.email) errors.email = 'Required';
            else if (!/^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) errors.password = 'Required';
            
            return errors
        },
        onSubmit: values => {          
            axios({
                method: "post",
                url: "/api/auth/login",
                data: {
                    ...values
                }
            })
            .then(({ data }) => {
                console.log(data.user)
                dispatch(setUser(data.user))
                navigate("/admin")
            })
            .catch(() => setError("Credenciales incorrectas"))
        }
    })
}

export default useLoginFormik