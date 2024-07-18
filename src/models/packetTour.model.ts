import { BeforeCount, BeforeFind, BeforeSave, Column, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { addConditionNotDelete } from '.';

@Table({
  tableName: 'packetTour',
  timestamps: true,
})
export class PacketTourModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  slug: string;

  @Column({
    type: DataType.TEXT,
  })
  images: string;

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
