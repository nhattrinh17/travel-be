import * as Handlebars from 'handlebars';

export function registerHelpers() {
  Handlebars.registerHelper('calculateTotalPrice', function (dataRoomSelect) {
    let totalPrice = 0;
    dataRoomSelect.forEach((room) => {
      totalPrice += room.price * (room.adult + room.child + room.infant);
    });
    return totalPrice;
  });
}
