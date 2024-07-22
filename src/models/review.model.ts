import { BeforeCount, BeforeFind, BeforeSave, Column, ForeignKey, BelongsTo, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { CruiseModel, TourModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'review',
  timestamps: true,
})
export class ReviewModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => TourModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  tourId: number;

  @BelongsTo(() => TourModel)
  tour: TourModel;

  @ForeignKey(() => CruiseModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  cruiseId: number;

  @BelongsTo(() => CruiseModel)
  cruise: CruiseModel;

  @Column({
    type: DataType.STRING,
  })
  date: string;

  @Column({
    type: DataType.STRING,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
  })
  image: string;

  @Column({
    type: DataType.SMALLINT,
  })
  star: number;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

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
