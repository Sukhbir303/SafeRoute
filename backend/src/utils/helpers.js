// Helper functions that can be used throughout the app

// Format date to readable format
exports.formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Generate random string
exports.generateRandomString = (length) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

// Validate email format
exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
