/**
 * Created by mengleisun on 12/12/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var facultySchema = new Schema({
    Name: String,
    Uinversity: String,
    Department: String,
    Title: String,
    Email: String,
    Phone: String,
    Website: String,
    PhotoURL: String,
    ResearchInterest: [String]
});
//model's method: find findByld findOne where
var Faculty = mongoose.model('Faculty', facultySchema);
module.exports = {
    Faculty: Faculty
};