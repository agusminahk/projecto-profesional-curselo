import axios from "axios"
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userSlice";
import { useNavigate } from "react-router"

const useRegisterFormik = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            telephone: '',
            email: '',
            password: ''
        },
        validate: values => {
            const errors = {}
            if (!values.email) errors.email = 'Campo requerido'
            else if (!/^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/i.test(values.email)) {
                errors.email = 'Direccion de email no valida';
            }
            if (!values.firstname) errors.firstname = 'Campo requerido';
            else if (!/^[A-Za-z ]*$/.test(values.firstname)) errors.firstname = "Ingrese solo letras y espacios"
            if (!values.lastname) errors.lastname = 'Campo requerido';
            else if (!/^[A-Za-z ]*$/.test(values.lastname)) errors.lastname = "Ingrese solo letras y espacios"
            if (!values.password) errors.password = 'Campo requerido';
            else {
                if (!/^.{8,}$/.test(values.password)) errors.password = "Debe ser de 8 de largo"
                else if (!/[a-zA-Z]/.test(values.password)) errors.password = "Debe contener al menos una letra"
                else if (!/\d/.test(values.password)) errors.password = "Debe contener al menos un número"
            }
            if (values.telephone !== "" 
                && (
                    !/\(?\+{0,1}[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})?$/.test(values.telephone)
                    || values.telephone.length > 18)
                ) errors.telephone = "Número de telefono no valido"
            return errors
        },
        onSubmit: values => {
            axios({
                method: "post",
                url: "/api/auth/register",
                data: {
                    ...values
                }
            }).then(({ data }) => {
                dispatch(setUser(data))
                navigate("/admin")
            })
            .catch(console.error)
        }
    })
}

export default useRegisterFormik