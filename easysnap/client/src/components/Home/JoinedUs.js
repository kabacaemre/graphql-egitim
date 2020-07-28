import React, { useState, useEffect } from 'react';

import { useSubscription } from "@apollo/react-hooks";

//queries
import { userCreated } from '../../queries';

function JoinedUs() {
    const [showData, setShowData] = useState(false);

    const { loading, data } = useSubscription(userCreated);

    useEffect(() => {
        setShowData(true);
        
        setTimeout(() => {
            setShowData(false);
        }, 3000);

    }, [data]);

    return (
        <div>
            {
                !loading && showData &&
                <div className="joinedUs">
                    <strong>{data.user.username}</strong> is joined to us.
                </div>
            }
        </div>
    );
}

export default JoinedUs;