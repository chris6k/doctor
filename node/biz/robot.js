var model = require('orm').load('robot');
var robot = function () {
};
robot.answer = function (type, cb) {
    model.find({type: type}, cb);
};
module.exports = robot;