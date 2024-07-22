import { ApiProperty } from '@nestjs/swagger';

export class CreateTourDto {
  @ApiProperty({ name: 'packetTourId', type: Number, description: 'Loại tour' })
  packetTourId: number;

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

  @ApiProperty({ name: 'isFlashSale', type: Boolean, description: 'flash sale' })
  isFlashSale: boolean;

  @ApiProperty({ name: 'discount', type: Number, description: 'flash sale' })
  discount: number;

  @ApiProperty({ name: 'discount', type: String, description: 'flash sale' })
  travelerLoves: string;
}

export class UpdateSpecialOfferTourDto {
  @ApiProperty({ name: 'tourId', type: Number, description: 'Id Tour' })
  tourId: number;

  @ApiProperty({ name: 'specialOfferIds', type: [Number], description: 'Danh sachs id specialOffer' })
  specialOfferIds: number[];
}

export class BookingTourDto {
  @ApiProperty({ name: 'tourId', type: Number, description: 'tour' })
  tourId: number;

  @ApiProperty({ name: 'fullName', type: String, description: 'Cruise' })
  fullName: string;

  @ApiProperty({ name: 'country', type: String, description: 'Cruise' })
  country: string;

  @ApiProperty({ name: 'email', type: String, description: 'Cruise' })
  email: string;

  @ApiProperty({ name: 'phone', type: String, description: 'Cruise' })
  phone: string;

  @ApiProperty({ name: 'date', type: String, description: 'Cruise' })
  date: string;

  @ApiProperty({ name: 'quantity', type: Number, description: 'Cruise' })
  quantity: number;

  @ApiProperty({ name: 'otherRequest', type: String, description: 'Cruise' })
  otherRequest: string;
}
