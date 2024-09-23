import { BeforeCount, BeforeFind, BeforeSave, Column, ForeignKey, BelongsTo, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { CruiseModel, CruiseAccompaniedServiceModel, TourModel, TourAccompaniedServiceModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'BlogCategory',
  timestamps: true,
})
export class BlogCategoryModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  slug: string;

  @Column({
    type: DataType.TEXT,
  })
  image: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean;

  @Column({ type: DataType.DATE })
  deletedAt: Date;

  @BeforeFind
  @BeforeCount
  @BeforeSave
  static async BeforeFindHook(options: any) {
    addConditionNotDelete(options);
  }
}
