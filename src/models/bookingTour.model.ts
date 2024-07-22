import { BeforeCount, BeforeFind, BeforeSave, Column, ForeignKey, BelongsTo, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { TourModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'bookingTour',
  timestamps: true,
})
export class BookingTourModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => TourModel)
  @Column({
    type: DataType.INTEGER,
  })
  tourId: number;

  @BelongsTo(() => TourModel)
  tour: TourModel;

  @Column({
    type: DataType.STRING,
  })
  date: string;

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
  quantity: number;

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
