import React from 'react';

import { useQuery } from '@apollo/react-hooks';

//queries
import { getSnaps, snapCreated } from '../../queries';

import SnapListItem from './SnapListItem';

function SnapList() {
    const { loading, error, data, subscribeToMore } = useQuery(getSnaps);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    subscribeToMore({
        document: snapCreated,
        updateQuery: (prev, { subscriptionData }) => {

            if (!subscriptionData.data) return prev;

            const newItem = subscriptionData.data.snap;

            if (!prev.snaps.find(snap => snap.id === newItem.id)) {
                return {
                    ...prev,
                    snaps: [newItem, ...prev.snaps]
                }
            } else {
                return prev;
            }
        }
    });

    return (
        <div>
            <ul className="snaps">
                {data.snaps.map(snap => (
                    <SnapListItem key={snap.id} snap={snap} />
                ))}
            </ul>
            <div className="counter">{data.snaps.length} snap(s)</div>
        </div>
    )
}

export default SnapList;