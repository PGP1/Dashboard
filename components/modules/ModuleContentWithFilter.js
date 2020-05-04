import React, {Component, Children, isValidElement, cloneElement} from 'react';
import { TYPES } from "../../constants";
import style from '../styles/ModuleContent.module.scss';
import { Dropdown } from 'semantic-ui-react';

class ModuleContentWithFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentType: TYPES.WATER,
            data: []
        }
    }

    setTypes = (type) => {
        this.setState({ currentType: type });
    }

    render() {
        
        const { title, children } = this.props;
        const { currentType, data } = this.state;
        const childrenWithProps = Children.map(children, child => {
            if (isValidElement(child)) {
              return cloneElement(child, { data })
            }      
            return child;
        });
      
        const DropdownFilter = () => (
            <Dropdown text={TYPES.WATER}>
                <Dropdown.Menu>
                    {Object.entries(TYPES).map(([k,value]) => {
                        if(value !== currentType) 
                            return <Dropdown.Item text={value} value={value}/>
                    })}
                </Dropdown.Menu>
            </Dropdown>
        )

        return <div className={style.box}>
            <div className={[style.header, "space-between"].join(" ")}>
                {title}
                {DropdownFilter()}
            </div>
            <div className={style.chart}>
                {childrenWithProps}
            </div>
        </div>
    }
}

export default ModuleContentWithFilter;
