import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useMutation } from '@apollo/react-hooks';

//queries
import { signInMutation } from '../queries';

//Alert
import Error from './Error';

function Login() {
    const [ formSuccess, setformSuccess ] = useState(false);
    const { register, handleSubmit, errors, formState } = useForm({ mode: "onChange" });

    const { isValid, isSubmitting } = formState;

    const [singIn, { error }] = useMutation(signInMutation);

    const onSubmit = (data, e) => {
        e.preventDefault();
        singIn({ 
            variables: {
                username: data.username,
                password: data.password
            }
        }).then(data => {
            setformSuccess(true);
            console.log(data);
            e.target.reset();
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
                    <button type="submit" disabled={!isValid}>{isSubmitting ? "Loading" : "Login"}</button>
                    {formSuccess && <Error variant={"success"} message={"Login successful."} />}
                    {error && <Error variant={"danger"} message={error.message} />}
                </label>
            </form>
        </div>
    );
}

export default Login;