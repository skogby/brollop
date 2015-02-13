var GoogleSpreadsheet = require("google-spreadsheet");

module.exports = function fromHandlerFactory(spreadsheetId, username, password){

    var my_sheet = new GoogleSpreadsheet(spreadsheetId);
    return function (req, res) {
        my_sheet.setAuth(username, password, function(err){
            if (err) {
                console.error("Could not auth:" + err);
                return;
            }
            req.body.date = (new Date()).toISOString();
            my_sheet.addRow(1, req.body);
            res.send("ok");
            return;
        });
    };
};
