import React, {Component} from 'react';

class ModuleContentWithFilter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        const { title, children } = this.props;
        
        const DropdownFilter = () => (
            <Dropdown text='Filter by'>
                <Dropdown.Menu>
                    <Dropdown.Item text='Day'/>
                    <Dropdown.Item text='Week'/>
                    <Dropdown.Item text='Month'/>
                </Dropdown.Menu>
            </Dropdown>
        )

        return <div className={style.box}>
            <div className={style.dashboardHeader}>
                {title}
                {DropdownFilter()}
            </div>
            <div className={style.chart}>
                {children}
            </div>
        </div>
    }
}