import { BeforeCount, BeforeFind, BeforeSave, BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { CruiseDetailLocationModel, CruiseModel, DestinationModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'detailLocation',
  timestamps: true,
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
  images: string;

  @ForeignKey(() => DestinationModel)
  @Column({
    type: DataType.INTEGER,
  })
  destinationId: number;

  @BelongsTo(() => DestinationModel)
  destination: DestinationModel;

  @BelongsToMany(() => CruiseModel, () => CruiseDetailLocationModel)
  cruises: CruiseModel[];

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
