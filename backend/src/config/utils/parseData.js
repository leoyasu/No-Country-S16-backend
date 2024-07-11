export const parseValidationResult = ({ success, error, data }) => {
    return {
      hasError: !success,
      errorMessages: success ? null : JSON.parse(error.message),
      userData: success ? data : null
    };
  };
  