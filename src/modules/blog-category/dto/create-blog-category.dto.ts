import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogCategoryDto {
  @ApiProperty({ name: 'name', type: String, description: 'Tên địa điểm' })
  name: string;

  @ApiProperty({ name: 'description', type: String, description: 'Nội dung(mô tả) hiển thị ở đầu trang' })
  description: string;

  @ApiProperty({ name: 'image', type: String, description: 'Ảnh vị trí' })
  image: string;
}
