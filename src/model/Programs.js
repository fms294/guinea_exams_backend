const mongoose = require('mongoose')

const programSchema = mongoose.Schema(
{
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    program_name :{
        type : String,
        required : true,
        trim: true
    },
    subjects : [
        {
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
                    lessons : [
                        {
                            lesson_name : {
                                type : String,
                                required: true,
                                trim: true
                            },
                            lesson_video :[{
                                url : {
                                    type: String,
                                    required: true
                                }
                            }]
                        }
                    ]
                }
            ]
        }
    ],
}, { timestamp: true }
);

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
