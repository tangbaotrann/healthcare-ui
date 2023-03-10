// data card
export const cardsData = [
    {
        title: 'Revenue',
        change: 24,
        amount: 42056,
    },
    {
        title: 'Orders',
        change: -14,
        amount: 52125.03,
    },
    {
        title: 'Expenses',
        change: 18,
        amount: 1216.5,
    },
    {
        title: 'Profit',
        change: 12,
        amount: 10125.0,
    },
];

//* get the value in group number format
export const groupNumber = (number) => {
    return parseFloat(number.toFixed(2)).toLocaleString('en', {
        useGrouping: true,
    });
};
