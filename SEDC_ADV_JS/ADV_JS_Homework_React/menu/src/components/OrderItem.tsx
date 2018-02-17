import * as React from 'react';
import { MenuInterface } from '../data/menuData';

class OrderItem extends React.Component<{ item: MenuInterface, removeItem(item: object): void }>{

    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.price * this.props.item.qty}</td>
                <td>{this.props.item.qty}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => this.props.removeItem(this.props.item)}>
                        Remove
                    </button>
                </td>
            </tr>
        );
    }
}

export default OrderItem;