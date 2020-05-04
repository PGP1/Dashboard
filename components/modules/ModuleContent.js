import React, {Component, Children, isValidElement, cloneElement} from 'react';
import style from '../styles/ModuleContent.module.scss';


class ModuleContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        const { title, children } = this.props;
        const { data } = this.state;

        const childrenWithProps = Children.map(children, child => {
            if (isValidElement(child)) {
              return cloneElement(child, { data })
            }
            return child;
        });

        return <div className={style.box}>
            <div className={style.header}>
                {title}
            </div>
            <div className={style.chart}>
                {childrenWithProps}
            </div>
        </div>
    }
}
export default ModuleContent;
