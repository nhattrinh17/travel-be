import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { OtherServiceBookingModel, CruiseModel } from '.';

@Table({
  tableName: 'cruiseOtherServiceBooking',
  timestamps: false,
})
export class CruiseOtherServiceBookingModel extends Model {
  @ForeignKey(() => CruiseModel)
  @Column
  cruiseId: number;

  @ForeignKey(() => OtherServiceBookingModel)
  @Column
  otherServiceBookingId: number;
}
