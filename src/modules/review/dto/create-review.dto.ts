import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ name: 'tourId', type: Number, description: 'tour' })
  tourId: number;

  @ApiProperty({ name: 'cruiseId', type: Number, description: 'tour' })
  cruiseId: number;

  @ApiProperty({ name: 'date', type: String, description: 'Tiêu đề hiển thị ở đầu trang' })
  date: string;

  @ApiProperty({ name: 'fullName', type: String, description: 'Nội dung(mô tả) hiển thị ở đầu trang' })
  fullName: string;

  @ApiProperty({ name: 'star', type: Number, description: 'Ảnh vị trí' })
  star: number;

  @ApiProperty({ name: 'description', type: String, description: 'Ảnh vị trí' })
  description: string;

  @ApiProperty({ name: 'image', type: String, description: 'Ảnh vị trí' })
  image: string;
}
