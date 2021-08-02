'use strict';
const service = require('../services/testService');

exports.get = (request, response) => {    
    service.get((error, result) => {
        if(error){
            response.json({success: false, data: error, message: "Failed!"});
        }

        response.json({success: true, data: result, message: "Success!"});
    });
};

exports.getById = (request, response) => {
    service.getById(request.params.id, (error, result) => {
        if (error){            
            response.json({success: false, data: error, message: "Failed!"});
        }
                
        response.json({success: true, data: result, message: "Success!"});
    });
};