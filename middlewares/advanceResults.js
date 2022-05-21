const advanceResults = (model, populate) => async (req, res, next) => {
    let query;
    const reqQuery = { ...req.query };
    const removeFeilds = ["select", "sort", "limit", "page"];
    removeFeilds.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)/g, (match) => `$${match}`);
    query = model.find(JSON.parse(queryStr));

    if (req.query.select) {
      const select = req.query.select.split(",").join(" ");
      query = query.select(select);
    }
  
    if (req.query.sort) {
      const sort = req.query.sort.split(",").join(" ");
      query = query.sort(sort);
    } else {
      query = query.sort("-createdAt");
    }
  
    if (populate) {
      query = query.populate(populate);
    }
  
    const results = await query;
  
    res.advanceResults = {
      status: "success",
      count: results.length,
      results: results,
    };
    next();
  };
  
  export default advanceResults;