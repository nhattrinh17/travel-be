import { BeforeCount, BeforeFind, BeforeSave, Column, ForeignKey, BelongsTo, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { CruiseModel, CruiseAccompaniedServiceModel, TourModel, TourAccompaniedServiceModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'accompaniedService',
  timestamps: true,
})
export class AccompaniedServiceModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.TEXT,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  slug: string;

  @BelongsToMany(() => CruiseModel, () => CruiseAccompaniedServiceModel)
  cruises: CruiseModel[];

  @BelongsToMany(() => TourModel, () => TourAccompaniedServiceModel)
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
