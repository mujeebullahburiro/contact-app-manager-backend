const mongoose  = require ("mongoose");
const contactSchema=mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    Name:{
        type: String,
        required: [true, "Please add the contact Name"],
    },
    Email:{
        type: String,
        required: [true, "Please add the contact Email Address"],
    },
    Phone:{
        type: String,
        required: [true, "Please add the contact Phone Number"],
    }
},
{
    timestamps: true,
}
);

module.exports=mongoose.model("Contact", contactSchema);