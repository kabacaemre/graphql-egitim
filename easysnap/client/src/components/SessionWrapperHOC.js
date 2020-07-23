import React from 'react';

import { useQuery } from '@apollo/react-hooks';

//queries
import { getActiveUser } from '../queries/';

const sessionWrapperHOC = Component => (props) => {
    const { loading, data, refetch } = useQuery(getActiveUser);
    if (loading) return <div>Loading...</div>;
    return <Component {...props} refetch={refetch} session={data} />
};

export default sessionWrapperHOC;