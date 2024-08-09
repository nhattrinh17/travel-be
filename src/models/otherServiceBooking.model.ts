import { BeforeCount, BeforeFind, BeforeSave, Column, ForeignKey, BelongsTo, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { CruiseModel, CruiseOtherServiceBookingModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'otherServiceBooking',
  timestamps: true,
})
export class OtherServiceBookingModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  options: string;

  @Column({
    type: DataType.SMALLINT,
  })
  type: number;

  @Column({
    type: DataType.SMALLINT,
    defaultValue: 0,
  })
  price: number;

  @BelongsToMany(() => CruiseModel, () => CruiseOtherServiceBookingModel)
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
