const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema(
{
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    sub_name: {
        type : String,
        required: true,
        trim: true
    },
    chaps : [
        {
            chap_name : {
                type : String,
                required: true,
                trim: true
            },
            chap_video : [{
                url : {
                    type: String,
                    required: true
                }
            }]
        }
    ]
}, { timestamp: true }
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
