import React from 'react';

//React Moment
import Moment from 'react-moment';

function Profile({ session: { activeUser } }) {
    return (
        <div>
            <h3>Profile</h3>
            <strong>@{activeUser.username}</strong>
            <div>
                <Moment format="DD/MM/YYYY" date={activeUser.createdAt} />
            </div>
        </div>
    )
}

export default Profile;