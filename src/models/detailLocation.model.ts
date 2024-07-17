import { BeforeCount, BeforeFind, BeforeSave, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { DestinationModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'detailLocation',
  timestamps: true,
  indexes: [],
})
export class DetailLocationModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
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

  @ForeignKey(() => DestinationModel)
  @Column({
    type: DataType.INTEGER,
  })
  destinationId: number;

  @BelongsTo(() => DestinationModel)
  destination: DestinationModel;

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
