import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

import { useQuery, useMutation } from '@apollo/react-hooks';

//queries
import { getDirectorsQuery, newMovieMutation, getMoviesQuery } from '../queries/queries';

const addMovieSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    year: yup
      .number()
      .required()
      .integer(),
    directorId: yup.string().required()
});

export default function NewMovieForm() {
    const { register, handleSubmit } = useForm({
        validationSchema: addMovieSchema
    });

    const [addMovie] = useMutation(newMovieMutation);

    const onSubmit = (data, e) => {
        e.preventDefault();
        addMovie({ 
            variables: {
                title: data.title,
                description: data.description,
                year: data.year,
                directorId: data.directorId
            },
            refetchQueries: [{ query: getMoviesQuery }]
        });
        e.target.reset();
        //console.log("Data", data)
    };

    const { loading, error, data } = useQuery(getDirectorsQuery);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
    return (
        <div className="container" data-state="New Movie">
            <div className="device" data-view="list">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Title</label>
                        <input type="text" name="title" placeholder="Title" ref={register} />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea name="description" placeholder="Description" ref={register} />
                    </div>
                    <div>
                        <label>Year</label>
                        <input type="text" name="year" placeholder="Year" ref={register} />
                    </div>
                    <div>
                        <label>Director</label>
                        <select name="directorId" ref={register({ required: true })}>
                            <option value="">Choose Director</option>
                            {data.directors.map(({ id, name }) =>  (
                                <option key={id} value={id}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}