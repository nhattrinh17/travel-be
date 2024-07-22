import { Op } from 'sequelize';

export * from './user.model';
export * from './destination.model';
export * from './detailLocation.model';
export * from './cruise.model';
export * from './specialOffer.model';
export * from './roomCruise.model';
export * from './itineraries.model';
export * from './cruiseSpecialOffer.model';
export * from './packetTour.model';
export * from './tour.model';
export * from './tourSpecialOffer.model';
export * from './accompaniedService.model';
export * from './tourAccompaniedService.model';
export * from './cruiseAccompaniedService.model';
export * from './otherServiceBooking.model';
export * from './cruiseOtherService.model';
export * from './bookingCruise.model';
export * from './bookingTour.model';
export * from './review.model';

export const addConditionNotDelete = (options: any) => {
  if (!options.where) {
    options.where = {};
  }
  options.where.isDeleted = { [Op.ne]: true };
};
