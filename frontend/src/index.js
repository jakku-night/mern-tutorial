import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Com from './components/com';

const App = () => {
    return (
        <Fragment>
            <Com />
        </Fragment>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));