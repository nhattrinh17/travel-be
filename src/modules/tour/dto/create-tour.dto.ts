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
