import { BeforeCount, BeforeFind, BeforeSave, Column, ForeignKey, BelongsTo, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { CruiseModel, addConditionNotDelete } from '.';
import { TourModel } from './tour.model';

@Table({
  tableName: 'itineraries',
  timestamps: true,
})
export class ItinerariesModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => CruiseModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  cruiseId: number;

  @BelongsTo(() => CruiseModel)
  cruise: CruiseModel;

  @ForeignKey(() => TourModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  tourId: number;

  @BelongsTo(() => TourModel)
  tour: CruiseModel;

  @Column({
    type: DataType.INTEGER,
  })
  day: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.TEXT,
  })
  content: string;

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
