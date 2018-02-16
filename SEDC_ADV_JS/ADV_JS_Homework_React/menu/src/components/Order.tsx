import * as React from 'react';
import { MenuInterface } from '../data/menuData';
import OrderItem from './OrderItem';

class Order extends React.Component<{ data: MenuInterface[], total: number, removeItem(item: object): void}>{

    render() {
        return (
            <div className="col border border-primary p-4 m-4">
                <table className="order">
                    <thead>
                        <tr>
                            <th colSpan={4} className="text-center alert-info p-2">ORDER</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Remove</th>
                        </tr>
                        {this.props.data.map(
                            (item, index) => <OrderItem
                                key={index}
                                item={item}
                                removeItem={this.props.removeItem}
                            />
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>Total:</td>
                            <td colSpan={2}>{this.props.total}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default Order;