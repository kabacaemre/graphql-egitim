import React, { useState, useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';

//queries
import { getMoviesQuery, getMovieQuery } from '../queries/queries';

//Bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DetailModal = (props) => {
    const [profileState, setProfileState] = useState(props);

    useEffect(() => {
        setProfileState(props);
    }, [props]);

    const { loading, error, data } = useQuery(getMovieQuery, { variables: { id: `${profileState.id}` } }); 
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "#fff", fontSize: "16px", height: "120px", backgroundColor: "#000" }}>{`${error}`}</p>;

    return (
        <Modal show={profileState.show} onHide={profileState.onHide}>
            <Modal.Header closeButton>
            <Modal.Title>Movie Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>{ data.movie.title }</h3>
                <p>{ data.movie.year }</p>
                <p>{ data.movie.description }</p>
                <br/>
                <h4>{ data.movie.director.name }</h4>
                <ul className="director-list">
                    {data.movie.director.movies.map(item => (
                        <li key={item.id}>
                            <div className="bg"></div>
                            <div className="title">{item.title}</div>
                        </li>
                    ))}
                </ul>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={profileState.onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={profileState.onHide}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
};

function MovieList() {
    const [modalShow, setModalShow] = useState(false);
    const [activeId, setActiveId] = useState();

    const { loading, error, data } = useQuery(getMoviesQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const showModal = id => {
        setModalShow(true);
        setActiveId(id);
    }
  
    return (
        <div className="container" data-state="Movie App">
            <div className="device" data-view="list">
                <ul className="movie-list layer" data-layer="list">
                    {data.movies.map(({ id, title, description }) => (
                        <li className="content" key={id} onClick={() => showModal(id)}>
                            <div className="bg"></div>
                            <div className="avatar"></div>
                            <div className="title">{title}</div>
                            <p>{ description }</p>
                        </li>
                    ))}
                </ul>
                {activeId&&(<DetailModal id={activeId} show={modalShow} onHide={() => setModalShow(false)} />)}
            </div>
        </div>
    );
}

export default MovieList;