
export const parseValidationResult = (result) => {
  if (result.success) {
    return {
      hasError: false,
      errorMessages: [],
      userData: result.data, 
    };
  } else {
    return {
      hasError: true,
      errorMessages: result.error.issues.map(issue => issue.message),
      userData: null,
    };
  }
};
