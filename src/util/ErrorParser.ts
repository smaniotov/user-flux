import { ErrorEnum } from '../enums';
import ResponseType from './ResponseType';
import get from 'lodash/get';
import omit from 'lodash/omit';

export default error => {
  if (error.extensions) {
    switch (error.extensions.code) {
      case ErrorEnum.PersistedQueryNotFound:
        return ResponseType.notFound('Not found');
      case ErrorEnum.Forbidden:
        return ResponseType.forbidden(error.message);
      case ErrorEnum.Unauthenticated:
        return ResponseType.unauthorized(error.message);
      case ErrorEnum.InternalServerError:
        if (get(error, 'extensions.exception')) {
          return ResponseType.validationError(
            error.message,
            omit(error.extensions.exception, ['stacktrace'])
          );
        }
        return ResponseType.internalError(error.message);
    }
  }

  return error;
};
