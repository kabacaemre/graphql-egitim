import React from 'react';

function Error(props) {
    return (
        <div className={["box " + props.variant]}>
            <p>{props.message}</p>
      </div>
    );
}

export default Error;