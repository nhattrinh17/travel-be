export const Status = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
};

export enum Gender {
  MALE = 'MALE',
  GIRL = 'FEMALE',
  OTHER = 'OTHER',
}

export const Environment = {
  Development: 'development',
  Production: 'production',
};

export const TypeUser = {
  Tourist: 'Tourist',
  Admin: 'Admin-CMS',
};

export const TypeTour = {
  Packet: 0,
  Daily: 1,
};

export * from './message';
