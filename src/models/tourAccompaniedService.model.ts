import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { AccompaniedServiceModel, TourModel } from '.';

@Table({
  tableName: 'tourAccompaniedService',
  timestamps: false,
})
export class TourAccompaniedServiceModel extends Model {
  @ForeignKey(() => TourModel)
  @Column
  tourId: number;

  @ForeignKey(() => AccompaniedServiceModel)
  @Column
  accompaniedServiceId: number;
}
