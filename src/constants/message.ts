export const messageResponse = {
  system: {
    badRequest: 'bad_request',
    emailNotInvalid: 'email_invalid',
    phoneNumberInvalid: 'phone_number_invalid',
    missingData: 'missing_data',
    notFound: 'not_found',
    duplicateData: 'duplicate_data',
    idInvalid: 'id_invalid',
    dataInvalid: 'data_invalid',
  },
  user: {
    userExists: 'user_exists',
    userDoseNotExists: 'user_dose_not_exists',
  },
  auth: {
    userNotFound: 'user_not_found',
    password_wrong: 'password_wrong',
    userHasBlocked: 'user_has_blocked',
    cannot_access_cms: 'cannot_access_cms',
  },
  specialOffer: {
    idInvalid: 'special_offer_invalid',
  },
  accompaniedServiceId: {
    idInvalid: 'accompanied_serviceId_invalid',
  },
  blog: {
    blogCategoryNotFound: 'blog_category_not_found',
  },
};
