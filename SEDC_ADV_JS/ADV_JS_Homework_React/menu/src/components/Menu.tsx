import * as React from 'react';
import { MenuInterface } from '../data/menuData';
import MenuItem from './MenuItem';

class Menu extends React.Component<{ menuData: Array<MenuInterface>, getItems(item: object): void}>{
    
    items = this.props.menuData.map(
        (item, index) => <MenuItem key={index} item={item} getItems={this.props.getItems}/>
    );
    render() {
        return (
            <div className="col border border-primary p-4 m-4">
                <table className="menu">
                    <thead>
                        <tr>
                            <th colSpan={4} className="text-center alert-info p-2">MENU</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Order</th>
                        </tr>
                        {this.items}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Menu;