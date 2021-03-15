import React from "react";

import useFormHook from '../../useFormHook'
import validate from '../../validateInfo'
import '../../assets/Form.css'
import {Paper} from '../Styles'



const SignupForm = ({submitForm}) => {
    const {handleChange, values, handleSubmit, errors} = useFormHook(
        submitForm, 
        validate
        );
    return (
            <div className="form-content-right">
                <Paper> 
                <form className="form" onSubmit={handleSubmit}>
                    <p>Get started today! Fill out the information below.</p>
                <div className="form-inputs">
                    <label htmlFor="username"
                    className="form-label">
                        Username
                        <input 
                        id="username"
                        type="text" 
                        name="username" 
                        className="form-input"
                        placeholder="Enter your username"
                        value={values.username}
                        onChange={handleChange}
                        />
                        </label>
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="email"
                    className="form-label">
                        Email
                        <input
                        id="email"
                        type="email" 
                        name="email" 
                        className="form-input"
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                        />
                            {errors.email && <p>{errors.email}</p>}
                    </label>
                </div>
                <div className="form-inputs">
                    <label htmlFor="password"
                    className="form-label">
                        Password
                        <input
                        id="password"
                        type="password" 
                        name="password" 
                        className="form-input"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        />
                            {errors.password && <p>{errors.password}</p>}
                    </label>
                </div>
                <div className="form-inputs">
                    <label htmlFor="password2"
                    className="form-label">
                        Confirm Password
                        <input
                        id="password2"
                        type="password" 
                        name="password2" 
                        className="form-input"
                        placeholder="Confirm your password"
                        value={values.password2}
                        onChange={handleChange}
                        />
                            {errors.password2 && <p>{errors.password2}</p>}
                    </label>
                </div>
                <button className="form-input-btn"
                type="submit" >
                    Sign up
                </button> <br/>
                <span className="form-input-login">
                    Already have an account?< a href="/signin"> Login Here</a>
                </span>
                </form>
                </Paper> 
        </div>
    )
}


export default SignupForm;