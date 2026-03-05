class QueryBuilder {
  constructor(mongooseQuery, queryParams) {
    this.mongooseQuery = mongooseQuery;
    this.queryParams = queryParams;
  }

  pagination() {
    let { page, limit } = this.queryParams;
    if (!limit || limit <= 0) {
      limit = 5;
    }
    if (!page || page <= 0) {
      page = 1;
    }
    this.page = page;
    this.limit = limit;
    const skip = (page - 1) * limit;
    this.mongooseQuery.limit(Number(limit)).skip(Number(skip));
    return this;
  }

  sort() {
    if (this.queryParams.sort) {
      this.mongooseQuery.sort(this.queryParams.sort.replaceAll(",", " "));
      return this;
    }
    return this;
  }

  fields() {
    if (this.queryParams.fields) {
      this.mongooseQuery.select(this.queryParams.fields.replaceAll(",", " "));
      return this;
    }
    return this;
  }

  search() {
    if (this.queryParams.search) {
      // console.log(this.queryParams.search);

      this.mongooseQuery.find({
        $or: [
          // { userId: this.queryParams.search },
          { action: this.queryParams.search },
          { metadata: { $regex: this.queryParams.search } },
        ],
      });
      return this;
    }
    return this;
  }

  filter() {
    let query = { ...this.queryParams };
    let arr = ["page", "limit", "sort", "fields", "search"];
    arr.forEach((el) => {
      delete query[el];
    });

    query = JSON.stringify(query);
    query = query.replace(/gt|gte|lt|lte|eq/, (value) => `$${value}`);
    query = JSON.parse(query);
    // console.log(query);
    this.mongooseQuery.find(query);
    return this;
  }
}

export default QueryBuilder;
