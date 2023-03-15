import mongoose from "mongoose";

const Employee = mongoose.Schema({
    fname:{
        type: String,
        required: false
    },
    lname:{
        type: String,
        required: false
    },
    mnumber:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false
    },
    address:{
        type: String,
        required: false
    },
    address2:{
        type: String,
        required: false
    },
    city:{
        type: String,
        required: false
    },
    state:{
        type: String,
        required: false
    },
    pincode:{
        type: String,
        required: false
    },
    cname:{
        type: String,
        required: false
    },
    photo:{
        type: String,
        required: false
    }
});

export default mongoose.model('Employee', Employee);