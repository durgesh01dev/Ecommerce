class ApiFeatures{
    //1. query is the actual mongoose command
    //2. given as part of url
    //Product.find(), req.query
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    search(){
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: "i",//case insensitive 
            },
        } : {};
        // console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    //function to filter the results
    filter(){
        //filter for the category
        //queryString is an object available as reference here
        const queryCopy = {...this.queryString}
        //removing few fields from copy for the category
        const fieldsToBeRemoved = ["keyword", "page", "limit"];
        fieldsToBeRemoved.forEach((key) => delete queryCopy[key]);
        
        //filter for the price rangewise
        //within mongoDB, $ needs to be used at start with operators like with the gt, lt, or similar ones
        let queryStr = JSON.stringify(queryCopy);
        //replacing terms with $
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        //convert to object prior to making query
        //find results based on queryCopy object
        this.query = this.query.find(JSON.parse(queryStr));
        
        return this;
    }
}

module.exports = ApiFeatures;