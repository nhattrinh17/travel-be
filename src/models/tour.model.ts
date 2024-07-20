import { BeforeCount, BeforeFind, BeforeSave, BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { TourSpecialOfferModel, PacketTourModel, ItinerariesModel, RoomCruiseModel, SpecialOfferModel, addConditionNotDelete, AccompaniedServiceModel, TourAccompaniedServiceModel } from '.';
import { TypeTour } from 'src/constants';

@Table({
  tableName: 'tour',
  timestamps: true,
})
export class TourModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => PacketTourModel)
  @Column({
    type: DataType.INTEGER,
  })
  packetTourId: number;

  @BelongsTo(() => PacketTourModel)
  packetTour: PacketTourModel;

  @Column({
    type: DataType.SMALLINT,
  })
  type: number;

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
    type: DataType.TEXT,
  })
  travelerLoves: string;

  @BelongsToMany(() => SpecialOfferModel, () => TourSpecialOfferModel)
  specialOffers: SpecialOfferModel[];

  @BelongsToMany(() => AccompaniedServiceModel, () => TourAccompaniedServiceModel)
  accompaniedServices: AccompaniedServiceModel[];

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
