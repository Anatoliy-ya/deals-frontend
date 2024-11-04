import moment from 'moment';

export const formatDateString = (dateString: string): string => {
  return moment(dateString).format('DD.MM.YYYY');
};

export const isISODate = (dateString: string) => {
  return moment(dateString, moment.ISO_8601, true).isValid();
};
