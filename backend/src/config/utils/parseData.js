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
      errorMessages: result.error.issues.map((issue) => issue.message),
      userData: null,
    };
  }
};

export const parseDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date)) {
    throw new Error("Invalid date format");
  }
  return date;
};
