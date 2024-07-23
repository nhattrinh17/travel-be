import { ApiProperty } from '@nestjs/swagger';

export class CreateCruiseDto {
  @ApiProperty({ name: 'destinationId', type: Number, description: 'Id địa điểm' })
  destinationId: number;

  @ApiProperty({ name: 'name', type: String, description: 'Tên' })
  name: string;

  @ApiProperty({ name: 'contentBrief', type: String, description: 'Nội dung chi tiết' })
  contentBrief: string;

  @ApiProperty({ name: 'detail', type: String, description: 'Nội dung chi tiết' })
  detail: string;

  @ApiProperty({ name: 'images', type: String, description: 'Nội dung chi tiết' })
  images: string;

  @ApiProperty({ name: 'price', type: Number, description: 'Giá hiện tại' })
  price: number;

  @ApiProperty({ name: 'linkTripadvisor', type: String, description: 'Nội dung chi tiết' })
  linkTripadvisor: string;

  @ApiProperty({ name: 'reviewTripadvisor', type: Number, description: 'Giá hiện tại' })
  reviewTripadvisor: number;

  @ApiProperty({ name: 'isFlashSale', type: Boolean, description: 'flash sale' })
  isFlashSale: boolean;

  @ApiProperty({ name: 'discount', type: Number, description: 'flash sale' })
  discount: number;

  @ApiProperty({ name: 'travelerLoves', type: String, description: 'flash sale' })
  travelerLoves: string;

  @ApiProperty({ name: 'totalRoom', type: Number, description: 'flash sale' })
  totalRoom: number;

  @ApiProperty({ name: 'timeLaunched', type: Number, description: 'flash sale' })
  timeLaunched: number;

  @ApiProperty({ name: 'styleCruise', type: String, description: 'flash sale' })
  styleCruise: string;
}

export class CreateOrUpdateRoomTypeDto {
  @ApiProperty({ name: 'roomId', type: Number, description: 'Id phòng' })
  roomId: number;

  @ApiProperty({ name: 'cruiseId', type: Number, description: 'Id Cruise' })
  cruiseId: number;

  @ApiProperty({ name: 'name', type: String, description: 'Tên phòng' })
  name: string;

  @ApiProperty({ name: 'name', type: Number, description: 'Giá phòng' })
  price: number;

  @ApiProperty({ name: 'totalRooms', type: Number, description: 'Tổng số phòng trên thuyền' })
  totalRooms: number;

  @ApiProperty({ name: 'typeBed', type: String, description: 'Loại giường' })
  typeBed: string;

  @ApiProperty({ name: 'isViewOcean', type: Boolean, description: 'Phòng view biển' })
  isViewOcean: boolean;

  @ApiProperty({ name: 'acreage', type: Number, description: 'Diện tích' })
  acreage: number;

  @ApiProperty({ name: 'location', type: String, description: 'Địa điểm' })
  location: string;

  @ApiProperty({ name: 'specialService', type: String, description: 'Dịch vụ đặc biệt' })
  specialService: string;

  @ApiProperty({ name: 'content', type: String, description: 'Dịch vụ đặc biệt' })
  content: string;

  @ApiProperty({ name: 'maxAdult', type: Number, description: 'Số người lớn tối đa' })
  maxAdult: number;

  @ApiProperty({ name: 'maxChildren', type: Number, description: 'Số trẻ em tối đa' })
  maxChildren: number;

  @ApiProperty({ name: 'amenities', type: String, description: 'TIện ích' })
  amenities: string;
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

export class BookingCruiseDto {
  @ApiProperty({ name: 'cruiseId', type: Number, description: 'Cruise' })
  cruiseId: number;

  @ApiProperty({ name: 'fullName', type: String, description: 'Cruise' })
  fullName: string;

  @ApiProperty({ name: 'country', type: String, description: 'Cruise' })
  country: string;

  @ApiProperty({ name: 'email', type: String, description: 'Cruise' })
  email: string;

  @ApiProperty({ name: 'phone', type: String, description: 'Cruise' })
  phone: string;

  @ApiProperty({ name: 'typeItineraries', type: String, description: 'Cruise' })
  typeItineraries: string;

  @ApiProperty({ name: 'date', type: String, description: 'Cruise' })
  date: string;

  @ApiProperty({ name: 'totalRoom', type: Number, description: 'Cruise' })
  totalRoom: number;

  @ApiProperty({ name: 'totalAdult', type: Number, description: 'Cruise' })
  totalAdult: number;

  @ApiProperty({ name: 'totalChildren', type: Number, description: 'Cruise' })
  totalChildren: number;

  @ApiProperty({ name: 'otherRequest', type: String, description: 'Cruise' })
  otherRequest: string;

  @ApiProperty({ name: 'dataRoomSelect', type: [DataRoomSelect], description: 'Cruise' })
  dataRoomSelect: DataRoomSelect[];

  @ApiProperty({ name: 'otherServices', type: [OtherService], description: 'Cruise' })
  otherServices: OtherService[];

  @ApiProperty({ name: 'dataTransfer', type: DataTransfer, description: 'Cruise' })
  dataTransfer: DataTransfer;
}
