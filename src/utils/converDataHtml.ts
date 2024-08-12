import { BookingCruiseDto, DataRoomSelect } from 'src/modules/cruise/dto/create-cruise.dto';
import { BookingTourDto } from 'src/modules/tour/dto/create-tour.dto';

export function generateBookingCruiseHTML(booking: BookingCruiseDto, cruiseName: string): string {
  const { fullName, email, phone, country, date, typeItineraries, totalRoom, totalAdult, totalChildren, otherRequest, dataRoomSelect, otherServices, dataTransfer } = booking;

  return `
    <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; text-align: center;">
      <div style="width: 80%; margin: 0 auto; background-color: #ffffff; padding: 20px">
        <div style="padding-bottom: 20px;">
          <h1 style="font-size: 24px; color: #333333;">TH Global Travel</h1>
        </div>
        <div style="margin-bottom: 20px; text-align: left;">
          <p style="font-size: 16px; color: #555555; margin: 5px 0;"><strong>Full Name:</strong> ${fullName}</p>
          <p style="font-size: 16px; color: #555555; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          <p style="font-size: 16px; color: #555555; margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
          <p style="font-size: 16px; color: #555555; margin: 5px 0;"><strong>Country:</strong> ${country}</p>
          <p style="font-size: 16px; color: #555555; margin: 5px 0;"><strong>Date:</strong> ${date}</p>
        </div>
        <div style="margin-bottom: 20px; text-align: left;">
          <h2 style="font-size: 20px; color: #333333; margin-bottom: 10px;">${cruiseName}</h2>
          <p style="font-size: 16px; color: #555555; margin: 5px 0;"><strong>Itineraries:</strong> ${typeItineraries}</p>
          <p style="font-size: 16px; color: #555555; margin: 5px 0;"><strong>Total Rooms:</strong> ${totalRoom}</p>
          <p style="font-size: 16px; color: #555555; margin: 5px 0;"><strong>Total Adults:</strong> ${totalAdult}</p>
          <p style="font-size: 16px; color: #555555; margin: 5px 0;"><strong>Total Children:</strong> ${totalChildren}</p>
          <p style="font-size: 16px; color: #555555; margin: 5px 0;"><strong>Other Requests:</strong> ${otherRequest}</p>
          ${dataRoomSelect
            .map(
              (room, index) => `
            <div style="margin-bottom: 20px; text-align: left;">
              <h3 style="font-size: 18px; color: #333333;">Room ${index + 1}:</h3>
              <p style="margin-left: 20px;"><strong>Room style:</strong> ${room.nameRoom}</p>
              <p style="margin-left: 20px;"><strong>Total Adults:</strong> ${room.adult}</p>
              <p style="margin-left: 20px;"><strong>Total Children:</strong> ${room.child}</p>
              <p style="margin-left: 20px;"><strong>Total Infants:</strong> ${room.infant}</p>
              <p style="margin-left: 20px;"><strong>Price:</strong> ${room.price}</p>
            </div>
          `,
            )
            .join('')}
          ${otherServices
            .map(
              (service, index) => `
            <div style="margin-bottom: 20px; text-align: left;">
              <h3 style="font-size: 18px; color: #333333;">Service ${index + 1}:</h3>
              <p style="margin-left: 20px;"><strong>Name:</strong> ${service.name}</p>
              <p style="margin-left: 20px;"><strong>Description:</strong> ${service.description}</p>
              <p style="margin-left: 20px;"><strong>Adults:</strong> ${service.adult}</p>
              <p style="margin-left: 20px;"><strong>Children:</strong> ${service.child}</p>
              <p style="margin-left: 20px;"><strong>Infants:</strong> ${service.infant}</p>
              <p style="margin-left: 20px;"><strong>Time:</strong> ${service.time}</p>
            </div>
          `,
            )
            .join('')}
          <div style="margin-bottom: 20px; text-align: left;">
            <h3 style="font-size: 18px; color: #333333;">Transfer Details:</h3>
            <p style="margin-left: 20px;"><strong>Name:</strong> ${dataTransfer.name}</p>
            <p style="margin-left: 20px;"><strong>Address:</strong> ${dataTransfer.address}</p>
            <p style="margin-left: 20px;"><strong>Options:</strong> ${dataTransfer.options}</p>
          </div>
        </div>
        <div style="text-align: start; font-size: 14px;">
          <b style="text-transform: uppercase; padding-bottom: 4px; border-bottom: 1px double #000;">TH Global Travel</b>
          <p>Hotline:<a href='tel:+84946707266'>+84946707266</a></p>
          <p>Email: <a href='mailto:info@thglobaltravel.com'>info@thglobaltravel.com</a></p>
          <p>Website: <a href='https://thglobaltravel.com/'>thglobaltravel.com</a></p>
        </div>
      </div>
    </div>
  `;
}

export function generateBookingTourHtml(booking: BookingTourDto): string {
  return `
  <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; text-align: center;">
    <div style="width: 80%; margin: 0 auto; background-color: #ffffff; padding: 20px;">
      <div style="padding-bottom: 20px;">
        <h1 style="font-size: 24px; color: #333333;">TH Global Travel</h1>
      </div>
      <p><strong>Name:</strong> ${booking.fullName}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Country:</strong> ${booking.country}</p>
      <p><strong>Date:</strong> ${booking.date}</p>
      <h2>${booking.fullName}</h2>
      <p><strong>Quantity:</strong> ${booking.quantity}</p>
      <p><strong>Other Requests:</strong> ${booking.otherRequest}</p>
      <div style="text-align: start; font-size: 14px;">
          <b style="text-transform: uppercase; padding-bottom: 4px; border-bottom: 1px double #000;">TH Global Travel</b>
          <p>Hotline:<a href='tel:+84946707266'>+84946707266</a></p>
          <p>Email: <a href='mailto:info@thglobaltravel.com'>info@thglobaltravel.com</a></p>
          <p>Website: <a href='https://thglobaltravel.com/'>thglobaltravel.com</a></p>
      </div>
    </div>
  </div>
`;
}
