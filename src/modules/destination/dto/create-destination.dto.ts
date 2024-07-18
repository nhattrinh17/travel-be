import { ApiProperty } from '@nestjs/swagger';

export class CreateDestinationDto {
  @ApiProperty({ name: 'name', type: String, description: 'Tên địa điểm' })
  name: string;

  @ApiProperty({ name: 'title', type: String, description: 'Tiêu đề hiển thị ở đầu trang' })
  title: string;

  @ApiProperty({ name: 'description', type: String, description: 'Nội dung(mô tả) hiển thị ở đầu trang' })
  description: string;

  @ApiProperty({ name: 'images', type: String, description: 'Ảnh vị trí' })
  images: string;
}
