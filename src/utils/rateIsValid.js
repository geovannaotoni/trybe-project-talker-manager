module.exports = (rate) => {
  if (rate !== undefined) {
    const isValid = (rate >= 1 && rate <= 5 && Number.isInteger(rate));
    return isValid;
  }
  return false;
};