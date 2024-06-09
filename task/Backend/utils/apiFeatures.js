class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // creating search api
  search() {
    const keyword = this.queryStr.keyword
      ? {
          message: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    // console.log(keyword)
    this.query = this.query.find({ ...keyword });
    return this;
  }

  // pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    // Check if the total count is less than the calculated skip value after deletion
    if (this.totalCount && skip >= this.totalCount) {
      this.query = this.query.limit(resultPerPage).skip(0); // Reset to the first page
    } else {
      this.query = this.query.limit(resultPerPage).skip(skip);
    }

    return this;
  }

  getCurrentPage() {
    return this.queryStr.page ? Number(this.queryStr.page) : 1;
  }

  setCurrentPage(page) {
    this.queryStr.page = page.toString();
    return this;
  }

  reverse() {
    this.query = this.query.sort({ _id: -1 }); // Assuming _id is an ObjectId
    return this;
  }
}

module.exports = ApiFeatures;
