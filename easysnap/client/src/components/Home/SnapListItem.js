import React from 'react';

//TimeAgo
import TimeAgo from 'react-timeago';

function SnapListItem({ snap }) {
    return (
        <li className={snap.id < 0 ? 'optimistic' : ''}>
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
    )
}

export default SnapListItem;