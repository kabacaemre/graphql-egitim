import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

//React Router
import { useHistory } from "react-router-dom";

import { useMutation } from '@apollo/react-hooks';

//queries
import { newUserMutation } from '../queries';

//Alert
import Error from './Error';

function Join(props) {
    let history = useHistory();

    const [ formSuccess, setformSuccess ] = useState(false);
    const { register, handleSubmit, errors, watch, formState } = useForm({ mode: "onChange" });

    const { isValid, isSubmitting } = formState;

    const password = useRef({});
    password.current = watch("password", "");

    const [newUser, { error }] = useMutation(newUserMutation);

    const onSubmit = (data, e) => {
        e.preventDefault();
        newUser({ 
            variables: {
                username: data.username,
                password: data.password
            }
        }).then(async ({data}) => {
            setformSuccess(true);
            console.log(data);
            localStorage.setItem('token', data.createUser.token);
            await props.refetch();
            e.target.reset();
            history.push('/');
        }).catch(e => {
            setformSuccess(false);
            console.log("Error", e);
        });
    };
    return (
        <div>
            <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
                 <label>
                    <input type="text" name="username" placeholder="Username" ref={register({ required: "This field is required" })} className={errors.username && "notValid"}  />
                    {errors.username && <p>{errors.username.message}</p>}
                 </label>
                 <label>
                    <input type="password" name="password" placeholder="Password" ref={register({ required: "This field is required" })} className={errors.password && "notValid"} />
                    {errors.password && <p>{errors.password.message}</p>}
                 </label>
                 <label>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" ref={register({ required: "This field is required", validate: value => value === password.current || "The passwords do not match"})} className={errors.confirmPassword && "notValid"} />
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                 </label>
                <label>
                    <button type="submit" disabled={!isValid}>{isSubmitting ? "Loading" : "Join"}</button>
                    {formSuccess && <Error variant={"success"} message={"Your registration has been successfully completed."} />}
                    {error && <Error variant={"danger"} message={error.message} />}
                </label>
            </form>
        </div>
    );
}

export default Join;