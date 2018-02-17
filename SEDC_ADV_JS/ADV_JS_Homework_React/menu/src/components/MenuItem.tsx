import * as React from 'react';
import { MenuInterface } from '../data/menuData';

// tslint:disable-next-line:no-any
class MenuItem extends React.Component<{ item: MenuInterface, getItems(item: object, currentQty: number): void }>{
    state = {
        value: '0'
    };
    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.price}</td>
                <td>
                    <input
                        type="number"
                        className="numInput form-control"
                        value={this.state.value}
                        min="0"
                        onChange={evt => this.setState({value: evt.target.value})}
                    />
                </td>
                <td>
                    <button
                        className="btn btn-secondary"
                        onClick={() => {
                            let stateVal = parseInt(this.state.value, 10);
                            if (stateVal > 0){
                                this.props.item.qty += stateVal;
                                this.setState({value: '0'});
                                return this.props.getItems(this.props.item, stateVal);
                            }
                        }}
                    >
                        Order
                    </button>
                </td>
            </tr >
        );
    }
}

export default MenuItem;