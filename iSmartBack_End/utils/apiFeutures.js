class ApiFeatures {
  constructor(obj, query) {
    this.obj = obj;
    this.query = query;
  }

  paginate() {
    const page = parseInt(this.query.page) || 1;
    const limit = parseInt(this.query.limit) || 10;

    this.obj.skip((page - 1) * limit).limit(limit);

    return this;
  }

  // search() {
  //   let query = this.query.q;
  //   if (query) {
  //     this.obj.find([
  //       {
  //         $or: [{ title: { $regex: query } }],
  //       },
  //     ]);
  //   }
  // }

  sort() {
    const sort = this.query.sort || "createdAt";
    const sortQuery = sort.split(",").join(" ");
    this.obj.sort(sortQuery);

    return this;
  }

  filterByChargerId() {
    let filter = parseInt(this.query.chargerId);
    if (filter) {
      this.obj.find({ chargerId: filter });
    }

    return this;
  }
}

module.exports = ApiFeatures;
