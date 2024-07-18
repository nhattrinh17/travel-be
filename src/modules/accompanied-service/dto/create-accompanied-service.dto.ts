import { ApiProperty } from '@nestjs/swagger';

export class CreateAccompaniedServiceDto {
  @ApiProperty({ name: 'name', type: String, description: 'Tên dịch vụ' })
  name: string;

  @ApiProperty({ name: 'slug', type: String, description: 'slug' })
  slug: string;
}
