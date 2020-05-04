import React, {Component} from 'react';
import style from '../styles/Dashboard.module.scss';


class ModuleContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, children } = this.props;
        return <div className={style.box}>
            <div className={style.header}>
                {title}
                {/* <select> resources </select> */}
            </div>
            <div className={style.chart}>
                {children}
            </div>
        </div>
        
    }
}
export default ModuleContent;
