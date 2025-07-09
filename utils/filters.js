const {Op} = require("sequelize");

exports.getSearchFilter = (data) => {
    let searchData = {};
    for (const [key, value] of Object.entries(data)) {
        if (key && value) {
            searchData[key] = {[Op.like]: `%${value}%`};
        }
    }
    return searchData;
}

exports.getUndefinedFilter = (obj, searchFilter = false) => {
    // const filteredObj = JSON.parse(JSON.stringify(obj))
    Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
    return searchFilter ? this.getSearchFilter(obj) : obj
};

exports.getQueryParamList=(data, type="string")=>{
    if(data){
        if(typeof data === "number"){
            return [data];
        }else if(typeof data === "string" && data.includes(",")){
            data=data.split(",")
            if(type==="number"){
                return data.map(d=>Number(d));
            }
            return data;
        }else{
            return [data];
        }
    }else{
        return [];
    }
}