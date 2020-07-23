import React from 'react';

//TimeAgo
import TimeAgo from 'react-timeago'

import { useQuery } from '@apollo/react-hooks';

//queries
import { getSnaps } from '../queries';

function Home() {
    const { loading, error, data } = useQuery(getSnaps);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <div className="description">
                <p className="sub_header__desc">simple snap app with <span>react</span>.</p>
            </div>

            <div>
                <form>
                    <input className="add-snap__input" type="text" placeholder="add snap" />
                </form>
            </div>
            <div>
                <ul className="snaps">
                    {data.snaps.map(snap => (
                        <li key={snap.id}>
                            <div className="title">
                                <span className="username">@{ snap.user.username } </span>
                                {snap.text}
                            </div>
                            <div className="date">
                                <span><TimeAgo date={ snap.createdAt } /></span>
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