import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceBookingDto {
  @ApiProperty({ name: 'name', type: String, description: 'Tên dịch vụ' })
  name: string;

  @ApiProperty({ name: 'description', type: String, description: 'Tên dịch vụ' })
  description: string;

  @ApiProperty({ name: 'type', type: Number, description: 'slug' })
  type: number;

  @ApiProperty({ name: 'price', type: Number, description: 'giá' })
  price: number;

  // @ApiProperty({ name: 'slug', type: String, description: 'slug' })
  // slug: string;
}
