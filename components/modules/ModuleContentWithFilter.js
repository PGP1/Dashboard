import React, {Component} from 'react';
import { TYPES } from "../../constants";
import style from '../styles/Dashboard.module.scss';
import { Dropdown } from 'semantic-ui-react';

class ModuleContentWithFilter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        const { title, children } = this.props;
        const current = TYPES.WATER;

        const DropdownFilter = () => (
            <Dropdown text={TYPES.WATER}>
                <Dropdown.Menu>
                    {Object.entries(TYPES).map(([k,value]) => {
                        if(value !== current) 
                            return <Dropdown.Item text={value} value={value}/>
                    })}
                </Dropdown.Menu>
            </Dropdown>
        )

        return <div className={style.box}>
            <div className={[style.header, "space-around"].join(" ")}>
                {title}
                {DropdownFilter()}
            </div>
            <div className={style.chart}>
                {children}
            </div>
        </div>
    }
}

export default ModuleContentWithFilter;
