import * as React from 'react';
import './style/App.css';
import Menu from './components/Menu';
import Order from './components/Order';
import { menuData, MenuInterface } from './data/menuData';

// const logo = require('./logo.svg');
class App extends React.Component<{}, { items: Array<MenuInterface> , total: number}>{
    
    state = { items: Array<MenuInterface>(), total: 0};
    addItem = (item: MenuInterface) => {
        let itemsArray = this.state.items;
        let position = itemsArray.map((el: MenuInterface) => el.name).indexOf(item.name);
        if (position === -1) {
            item.qty++;
            itemsArray.push(item);
        }
        else {
            itemsArray[position].qty++;
        }
        let addPrice = this.state.total + item.price; 
        return this.setState({ items: itemsArray, total: addPrice});
    }
    removeItem = (item: MenuInterface) => {
        let itemsArray = this.state.items;
        let position = itemsArray.map((el: MenuInterface) => el.name).indexOf(item.name);
        if (item.qty > 1) {
            itemsArray[position].qty--;
        }
        else {
            itemsArray[position].qty--;
            itemsArray.splice(position, 1);
        }
        let subPrice = this.state.total - item.price; 
        return this.setState({ items: itemsArray, total: subPrice });
    }
    render() {
        return (
            <section className="container">
                <div className="row">
                    <Menu menuData={menuData} getItems={this.addItem} />
                    <Order data={this.state.items} removeItem={this.removeItem} total={this.state.total} />
                </div>
            </section>
        );
    }
}

export default App;