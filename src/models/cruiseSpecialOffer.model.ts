import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { CruiseModel, SpecialOfferModel } from '.';

@Table({
  tableName: 'cruiseSpecialOffers',
  timestamps: false,
})
export class CruiseSpecialOfferModel extends Model {
  @ForeignKey(() => CruiseModel)
  @Column
  cruiseId: number;

  @ForeignKey(() => SpecialOfferModel)
  @Column
  specialOfferId: number;
}
