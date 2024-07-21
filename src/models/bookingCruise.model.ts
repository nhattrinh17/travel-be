import { BeforeCount, BeforeFind, BeforeSave, Column, ForeignKey, BelongsTo, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { CruiseModel, UserModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'bookingCruise',
  timestamps: true,
})
export class BookingCruiseModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => CruiseModel)
  @Column({
    type: DataType.INTEGER,
  })
  cruiseId: number;

  @BelongsTo(() => CruiseModel)
  cruise: CruiseModel;

  @Column({
    type: DataType.STRING,
  })
  typeItineraries: string;

  @Column({
    type: DataType.STRING,
  })
  date: string;

  @Column({
    type: DataType.SMALLINT,
  })
  totalRoom: number;

  @Column({
    type: DataType.STRING,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.SMALLINT,
  })
  totalAdult: number;

  @Column({
    type: DataType.SMALLINT,
  })
  totalChildren: number;

  @Column({
    type: DataType.STRING,
  })
  country: string;

  @Column({
    type: DataType.TEXT,
  })
  detail: string;

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
