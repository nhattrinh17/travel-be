import { BeforeCount, BeforeFind, BeforeSave, Column, ForeignKey, BelongsTo, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { CruiseModel, ItinerariesModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'roomCruise',
  timestamps: true,
})
export class RoomCruiseModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => CruiseModel)
  @Column({
    type: DataType.INTEGER,
  })
  cruiseId: number;

  @BelongsTo(() => CruiseModel)
  cruise: CruiseModel;

  @ForeignKey(() => ItinerariesModel)
  @Column({
    type: DataType.INTEGER,
  })
  itinerariesId: number;

  @BelongsTo(() => ItinerariesModel)
  itineraries: ItinerariesModel;

  @Column({
    type: DataType.TEXT,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
  })
  totalRooms: number;

  @Column({
    type: DataType.STRING,
  })
  typeBed: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  isViewOcean: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  acreage: number;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.TEXT,
  })
  images: string;

  @Column({
    type: DataType.TEXT,
  })
  specialService: string;

  @Column({
    type: DataType.TEXT,
  })
  content: string;

  @Column({
    type: DataType.SMALLINT,
  })
  maxAdult: number;

  @Column({
    type: DataType.SMALLINT,
  })
  maxChildren: number;

  @Column({
    type: DataType.STRING,
  })
  amenities: string;

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
