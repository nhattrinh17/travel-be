export class SendMailDto {
  title: string;
  sendTo: string;
  heading: string;
  message: string;
  buttonLabel?: string;
  signerName: string;
  signerPhone: string;
  signerEmail: string;
  signerCompany: string;
  signerAddress: string;
  signerWebsite: string;
}

export class DataRoomSelect {
  indexRoom: number;
  nameRoom: string;
  price: number;
  adult: number;
  child: number;
  infant: number;
  typeBed: string;
}
export class OtherService {
  name: string;
  adult: number;
  child: number;
  description: number;
  infant: number;
  time: string;
}

export class DataTransfer {
  name: string;
  address: string;
  options: string;
}

export class SendMailBookingCruiseDto {
  cruiseName: string;
  sendTo: string;
  email: string;
  fullName: string;
  phone: string;
  country: string;
  date: string;
  typeItineraries: string;
  totalRoom: number;
  dataRoomSelect: DataRoomSelect[];
  otherServices: OtherService[];

  dataTransfer: DataTransfer;
}

export class SendMailBookingTourDto {
  sendTo: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  date: string;
  tourName: string;
  quantity: number;
  otherRequest: string;
}

export class SendEmailCustomDto {
  sendTo: string;
  subject: string;
  content: string;
}

export class SendEmailHomeDto {
  otherRequest: string;
  fullName: string;
  email: string;
  phone: string;
}
