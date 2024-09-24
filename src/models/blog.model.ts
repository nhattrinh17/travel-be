import { BeforeCount, BeforeFind, BeforeSave, Column, ForeignKey, BelongsTo, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { addConditionNotDelete, BlogCategoryModel } from '.';

@Table({
  tableName: 'blog',
  timestamps: true,
})
export class BlogModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => BlogCategoryModel)
  @Column({
    type: DataType.INTEGER,
  })
  blogCategoryId: number;

  @BelongsTo(() => BlogCategoryModel)
  blogCategory: BlogCategoryModel;

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

  @Column({
    type: DataType.TEXT,
  })
  content: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  view: number;

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
