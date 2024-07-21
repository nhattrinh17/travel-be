import { BookingCruiseDto, DataRoomSelect } from 'src/modules/cruise/dto/create-cruise.dto';

export function generateBookingCruiseHTML(booking: BookingCruiseDto): string {
  const otherServicesHTML = booking.otherServices
    .map(
      (service) => `
    <div class="other-service">
      <h4>${service.name}</h4>
      <p>Adults: ${service.adult}</p>
      <p>Children: ${service.child}</p>
      <p>Infants: ${service.infant}</p>
      <p>Time: ${service.time}</p>
    </div>
  `,
    )
    .join('');

  const dataTransferHTML = `<div class="data-transfer">
      <h4>${booking.dataTransfer.name}</h4>
      <p>Address: ${booking.dataTransfer.address}</p>
      <p>Options: ${booking.dataTransfer.options}</p>
    </div>`;

  return `
    <div class="booking-cruise">
      <h1>Booking Information</h1>
      <p><strong>Full Name:</strong> ${booking.fullName}</p>
      <p><strong>Country:</strong> ${booking.country}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Type of Itineraries:</strong> ${booking.typeItineraries}</p>
      <p><strong>Date:</strong> ${booking.date}</p>
      <p><strong>Total Rooms:</strong> ${booking.totalRoom}</p>
      <p><strong>Total Adults:</strong> ${booking.totalAdult}</p>
      <p><strong>Total Children:</strong> ${booking.totalChildren}</p>
      <h2>Room Selection</h2>
      ${generateDataRoomSelectHTML(booking.dataRoomSelect)}
      <h2>Other Services</h2>
      ${otherServicesHTML}
      <h2>Data Transfer</h2>
      ${dataTransferHTML}
      <h2>Other Request</h2>
      <p>${booking.otherRequest}</p>
    </div>
  `;
}

function generateDataRoomSelectHTML(dataRoomSelect: DataRoomSelect[]): string {
  return dataRoomSelect
    .map(
      (room) => `
    <div class="data-room-select">
      <h4>${room.nameRoom}</h4>
      <p>Price: ${room.price}</p>
    </div>
  `,
    )
    .join('');
}