var cxn = require(`./connection`);

var printQuestionMarks = (num) => {
    var arr = [];

    for (var i = 0; i < num; i ++) {
        arr.push(`?`);
    }

    // console.log(arr.toString());

    return arr.toString();

}

var objToSql = (ob) => {
    var arr = [];

    console.log(ob);

    Object.keys(ob).forEach(key => {
        var value = ob[key];

        if(Object.hasOwnProperty.call(ob, key)) {
            if(typeof value === `string` && value.indexOf(` `) >= 0) {
                value = `'${value}'`;
            }
            arr.push(`${key}=${value}`);
        }
    });

    return arr.toString();
}

var orm = {
    selectAll: (tableInput, cb) => {
        var queryString = `SELECT * FROM ${tableInput};`
        cxn.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (tableInput, cols, vals, cb) => {
        var queryString = `INSERT INTO ${tableInput} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`
        // console.log(queryString);
        cxn.query(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: (table, objColVals, condition, cb) => {
        var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;
        cxn.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    delete: (table, condition, cb) => {
        var queryString = `DELETE FROM ${table} WHERE ${condition}`
        
        console.log(queryString);

        cxn.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        })
    
    }
};

module.exports = orm;