import { BeforeCount, BeforeFind, BeforeSave, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { DetailLocationModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'destination',
  timestamps: true,
})
export class DestinationModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  slug: string;

  @Column({
    type: DataType.TEXT,
  })
  image: string;

  @HasMany(() => DetailLocationModel)
  detailLocations: DetailLocationModel[];

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
