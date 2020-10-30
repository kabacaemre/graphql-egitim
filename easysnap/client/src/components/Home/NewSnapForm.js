import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/react-hooks';

//queries
import { getSnaps, addSnapMutation } from '../../queries';

//React Hook Form
import { useForm } from 'react-hook-form';

function NewSnapForm({ session }) {
    const { register, handleSubmit, errors } = useForm();

    const [userId, setUserId] = useState('');

    useEffect(() => {
        if (session && session.activeUser) {
            setUserId(session.activeUser.id);
        }
    }, [session]);

    const [addSnap] = useMutation(addSnapMutation);

    const onSubmit = (data, e) => {
        e.preventDefault();
        addSnap({ 
            variables: {
                user_id: userId,
                text: data.snaptext
            },
            optimisticResponse: {
                __typename: "Mutation",
                createSnap: {
                  __typename: "Snap",
                  id: Math.round(Math.random() * -200000),
                  text: data.snaptext,
                  createdAt: new Date(),
                  user: {
                    __typename: "User",
                    ...session.activeUser
                  }
                }
            },
            update: (cache, { data: { createSnap } }) => {
                const { snaps } = cache.readQuery({
                    query: getSnaps
                });
    
                cache.writeQuery({
                    query: getSnaps,
                    data: {
                        snaps: [createSnap, ...snaps]
                    }
                })
            }
        });
        e.target.reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                className="add-snap__input" 
                type="text" 
                name="snaptext" 
                autoComplete="off" 
                disabled={ !(session && session.activeUser) } 
                placeholder={ session && session.activeUser ? 'add snap' : 'please login for add a new snap' } 
                ref={register({ required: true, minLength: 2 })} />

                {errors.snaptext && errors.snaptext.type === "required" && <span className="requiredText">This field is required</span>}
                {errors.snaptext && errors.snaptext.type === "minLength" && <span className="requiredText">Min 2 characters required</span> }
            </form>
        </div>
    )
}

export default NewSnapForm;