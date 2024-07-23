import { ForeignKey, Column, Model, Table, DataType } from 'sequelize-typescript';
import { CruiseModel } from './cruise.model';
import { DetailLocationModel } from './detailLocation.model';

@Table({
  tableName: 'cruiseDetailLocation',
  timestamps: false,
})
export class CruiseDetailLocationModel extends Model {
  @ForeignKey(() => CruiseModel)
  @Column({
    type: DataType.INTEGER,
  })
  cruiseId: number;

  @ForeignKey(() => DetailLocationModel)
  @Column({
    type: DataType.INTEGER,
  })
  detailLocationId: number;
}
