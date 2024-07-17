import { Op } from 'sequelize';

export * from './user.model';
export * from './destination.model';
export * from './detailLocation.model';

export const addConditionNotDelete = (options: any) => {
  if (!options.where) {
    options.where = {};
  }
  options.where.isDeleted = { [Op.ne]: true };
};
