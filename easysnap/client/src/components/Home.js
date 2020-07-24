import React, { useState, useEffect } from 'react';

//TimeAgo
import TimeAgo from 'react-timeago'

//React Hook Form
import { useForm } from 'react-hook-form';

import { useQuery, useMutation } from '@apollo/react-hooks';

//queries
import { getSnaps, addSnapMutation } from '../queries';

function Home({ session }) {
    // console.log(session);

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

    const { loading, error, data } = useQuery(getSnaps);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    return (
        <div>
            <div className="description">
                <p className="sub_header__desc">simple snap app with <span>react</span>.</p>
            </div>

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
            <div>
                <ul className="snaps">
                    {data.snaps.map(snap => (
                        <li key={snap.id} className={snap.id < 0 ? 'optimistic' : ''}>
                            <div className="title">
                                <span className="username">@{ snap.user.username } </span>
                                {snap.text}
                            </div>
                            <div className="date">
                                <span>
                                    {snap.id < 0 ? 'Sending' : <TimeAgo date={ snap.createdAt } />}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="counter">{data.snaps.length} snap(s)</div>
        </div>
    );
}

export default Home;