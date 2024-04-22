export const propertyPrice = (precio) =>
    Number(precio).toLocaleString('en-US', {
     style: 'currency',
     currency: 'USD',
    })
 