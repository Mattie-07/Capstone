import {useState, useEffect} from 'react';


const useFormHook = validate =>{
    const[values, setValues] = useState({
        username:'',
        email:'',
        password:'',
        password2:'',
    })

    const [errors, setErrors] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = e =>{
        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value 
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        setErrors(validate(values))
        setIsSubmitted(true);
    }

    return {handleChange, values, handleSubmit, errors}
}
export default useFormHook;