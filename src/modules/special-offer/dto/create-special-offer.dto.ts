import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecialOfferDto {
  @ApiProperty({ name: 'name', type: String, description: 'Tên' })
  name: string;

  @ApiProperty({ name: 'content', type: String, description: 'Nội dung chi tiết' })
  content: string;
}
