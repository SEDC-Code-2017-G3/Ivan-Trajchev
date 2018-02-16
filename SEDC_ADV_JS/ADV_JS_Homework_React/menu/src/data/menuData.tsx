interface MenuInterface {
    name: string;
    price: number;
    qty: number;
}

const menuData: Array<MenuInterface> = [
    {
        name: 'Beer',
        price: 70,
        qty: 0
    },
    {
        name: 'Wine',
        price: 100,
        qty: 0
    },
    {
        name: 'Liver',
        price: 150,
        qty: 0
    }, 
    {
        name: 'Shopska',
        price: 120,
        qty: 0
    }
];

export {menuData, MenuInterface};