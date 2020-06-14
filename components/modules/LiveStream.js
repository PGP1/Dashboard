import React, { Component } from 'react';
import ReactHLS from 'react-hls-player';
import styles from '../styles/LiveStream.module.scss';

/**
* Video stream component
* @extends React.Component
*/
class LiveStream extends Component {
    render() {
        const { liveVideo } = this.props;
        return <div className={styles.holder}>
            <ReactHLS url={liveVideo} autoplay={true}/>
        </div>;
    }
}

export default LiveStream;