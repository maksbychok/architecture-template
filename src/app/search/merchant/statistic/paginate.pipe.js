module.exports = () => {
  return {
    handler(request) {
      const page = request.page || 1;
      const size = request.perPage || 10;
      const offset = page * size - size;
      const limit = size;
      const { page: _a, perPage: _b, ...newRequest } = request;
      return {
        offset,
        limit,
        ...newRequest
      };
    }
  };
};
