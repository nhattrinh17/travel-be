import { ApiProperty } from '@nestjs/swagger';

export class CreateCruiseDto {
  @ApiProperty({ name: 'destinationId', type: Number, description: 'Id địa điểm' })
  destinationId: number;

  @ApiProperty({ name: 'detailLocationId', type: Number, description: 'Id địa điểm chi tiết' })
  detailLocationId: number;

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
