import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ name: 'blogCategoryId', type: Number, description: 'Tên địa điểm' })
  blogCategoryId: number;

  @ApiProperty({ name: 'name', type: String, description: 'Tên địa điểm' })
  name: string;

  @ApiProperty({ name: 'description', type: String, description: 'Mô tả ngắn' })
  description: string;

  @ApiProperty({ name: 'image', type: String, description: 'Ảnh vị trí' })
  image: string;

  @ApiProperty({ name: 'content', type: String, description: 'Nội dung' })
  content: string;
}
