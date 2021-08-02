'use strict';

var testData = [
    {
        Id: 1,
        FirstName: "Amalay",
        LastName: "Verma"
    },
    {
        Id: 2,
        FirstName: "Mahesh",
        LastName: "Marthi"
    },
    {
        Id: 3,
        FirstName: "Samik",
        LastName: "Roy"
    },
    {
        Id: 4,
        FirstName: "Rakesh",
        LastName: "Prasad"
    }
];

exports.get = (callback) => {
    callback(null, testData);
};

exports.getById = (id, callback) => {
    var data = testData.find(item => item.Id == id);

    callback(null, data);
};