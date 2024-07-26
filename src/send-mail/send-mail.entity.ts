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

export class SendMailBookingCruiseDto {
  sendTo: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  date: string;
  cruiseName: string;
  typeItineraries: string;
  totalRoom: number;
  totalAdult: number;
  totalChildren: number;
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
