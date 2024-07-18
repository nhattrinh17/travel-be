import { BeforeCount, BeforeFind, BeforeSave, Column, ForeignKey, BelongsTo, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { CruiseModel, CruiseSpecialOfferModel, TourModel, TourSpecialOfferModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'specialOffer',
  timestamps: true,
})
export class SpecialOfferModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.TEXT,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  content: string;

  @BelongsToMany(() => CruiseModel, () => CruiseSpecialOfferModel)
  cruises: CruiseModel[];

  @BelongsToMany(() => TourModel, () => TourSpecialOfferModel)
  tours: TourModel[];

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
