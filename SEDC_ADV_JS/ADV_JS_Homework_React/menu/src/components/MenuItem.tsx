import * as React from 'react';
import { MenuInterface } from '../data/menuData';

// tslint:disable-next-line:no-any
class MenuItem extends React.Component<{ item: MenuInterface, getItems(item: object): void }>{
    
    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.price}</td>
                <td>
                    <button
                        className="btn btn-secondary"
                        onClick={() => this.props.getItems(this.props.item)}
                    >
                        Order
                    </button>
                </td>
            </tr >
        );
    }
}

export default MenuItem;