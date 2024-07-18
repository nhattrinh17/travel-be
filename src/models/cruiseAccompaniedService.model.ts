import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { AccompaniedServiceModel, CruiseModel } from '.';

@Table({
  tableName: 'cruiseAccompaniedService',
  timestamps: false,
})
export class CruiseAccompaniedServiceModel extends Model {
  @ForeignKey(() => CruiseModel)
  @Column
  cruiseId: number;

  @ForeignKey(() => AccompaniedServiceModel)
  @Column
  accompaniedServiceId: number;
}
