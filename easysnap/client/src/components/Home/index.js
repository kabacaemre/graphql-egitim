import React from 'react';

import NewSnapForm from './NewSnapForm';
import JoinedUs from './JoinedUs';
import SnapList from './SnapList';

function Home({ session }) {
    console.log("home", session);
    return (
        <div>
            <div className="description">
                <p className="sub_header__desc">simple snap app with <span>react</span>.</p>
            </div>
            <NewSnapForm session={session} />
            <JoinedUs />
            <SnapList />
        </div>
    );
}

export default Home;