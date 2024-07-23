import { BeforeCount, BeforeFind, BeforeSave, BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { AccompaniedServiceModel, CruiseAccompaniedServiceModel, CruiseDetailLocationModel, CruiseOtherServiceBookingModel, CruiseSpecialOfferModel, DestinationModel, DetailLocationModel, ItinerariesModel, OtherServiceBookingModel, RoomCruiseModel, SpecialOfferModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'cruise',
  timestamps: true,
})
export class CruiseModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => DestinationModel)
  @Column({
    type: DataType.INTEGER,
  })
  destinationId: number;

  @BelongsTo(() => DestinationModel)
  destination: DestinationModel;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  contentBrief: string;

  @Column({ type: DataType.TEXT })
  detail: string;

  @Column({
    type: DataType.STRING,
  })
  slug: string;

  @Column({
    type: DataType.TEXT,
  })
  images: string;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  isFlashSale: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  discount: number;

  @Column({
    type: DataType.INTEGER,
  })
  totalRoom: number;

  @Column({
    type: DataType.STRING,
  })
  styleCruise: string;

  @Column({
    type: DataType.INTEGER,
  })
  timeLaunched: number;

  @Column({
    type: DataType.TEXT,
  })
  travelerLoves: string;

  @BelongsToMany(() => SpecialOfferModel, () => CruiseSpecialOfferModel)
  specialOffers: SpecialOfferModel[];

  @BelongsToMany(() => AccompaniedServiceModel, () => CruiseAccompaniedServiceModel)
  accompaniedServices: AccompaniedServiceModel[];

  @BelongsToMany(() => OtherServiceBookingModel, () => CruiseOtherServiceBookingModel)
  otherServiceBookings: OtherServiceBookingModel[];

  @BelongsToMany(() => DetailLocationModel, () => CruiseDetailLocationModel)
  detailLocations: DetailLocationModel[];

  @HasMany(() => RoomCruiseModel)
  roomCruises: RoomCruiseModel[];

  @HasMany(() => ItinerariesModel)
  itineraries: ItinerariesModel[];

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
