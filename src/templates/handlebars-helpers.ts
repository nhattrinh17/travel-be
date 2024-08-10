import * as Handlebars from 'handlebars';

export function registerHelpers() {
  Handlebars.registerHelper(
    'calculateTotalPrice',
    function (
      //
      dataRoomSelect,
      otherServices,
      dataTransfer,
    ) {
      let totalPrice = 0;
      dataRoomSelect.forEach((room) => {
        totalPrice += room.price * (room.adult + room.child + room.infant);
      });
      // console.log('🚀 ~ dataRoomSelect.forEach ~ totalPrice:1', totalPrice);
      if (otherServices) {
        otherServices.forEach((service) => {
          // console.log('🚀 ~ otherServices.forEach ~ service:', service, service.adult || 0 + service.child || 0 + service.infant || 0);
          totalPrice += service.price * ((service.adult || 0) + (service.child || 0) + (service.infant || 0));
        });
      }
      // console.log('🚀 ~ dataRoomSelect.forEach ~ totalPrice:2', totalPrice);
      if (dataTransfer) {
        totalPrice += dataTransfer.price || 0;
      }
      // console.log('🚀 ~ dataRoomSelect.forEach ~ totalPrice:3', totalPrice);
      return Math.floor(totalPrice);
    },
  );
  Handlebars.registerHelper('default', function (value, defaultValue) {
    return value !== undefined ? value : defaultValue;
  });
  Handlebars.registerHelper('calculateDiscountedPriceForTour', function (quantity, price, discount) {
    const totalPrice = quantity * price;
    const discountedPrice = totalPrice - totalPrice * discount * 0.01;
    return Math.floor(discountedPrice);
  });
}
