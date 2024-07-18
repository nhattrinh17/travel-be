import { ApiProperty } from '@nestjs/swagger';

export class CreateItinerariesDto {
  @ApiProperty({ name: 'itinerariesId', type: Number, description: 'Id lịch trình ' })
  itinerariesId: number;

  @ApiProperty({ name: 'cruiseId', type: Number, description: 'cruiseId' })
  cruiseId: number;

  @ApiProperty({ name: 'tourId', type: Number, description: 'tourId' })
  tourId: number;

  @ApiProperty({ name: 'day', type: Number, description: 'Ngày số' })
  day: number;

  @ApiProperty({ name: 'name', type: String, description: 'Tiêu đề' })
  name: string;

  @ApiProperty({ name: 'description', type: String, description: 'Mô tả' })
  description: string;

  @ApiProperty({ name: 'content', type: String, description: 'Nội dung chi tiết' })
  content: string;
}
