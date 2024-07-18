import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { TourModel, SpecialOfferModel } from '.';

@Table({
  tableName: 'tourSpecialOffers',
  timestamps: false,
})
export class TourSpecialOfferModel extends Model {
  @ForeignKey(() => TourModel)
  @Column
  tourId: number;

  @ForeignKey(() => SpecialOfferModel)
  @Column
  specialOfferId: number;
}
