const {Schema, model} = require('mongoose');

const PostSchema = new Schema({
   
    photo: {
        type : [""],
        default:"https://www.google.com/search?q=virat+kohli+image&oq=virat+kohli+image+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTINCAEQABiDARixAxiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCDQyOTBqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#vhid=_Jn173x9vtzK1M&vssid=l"
    },


    title : {
        type:String,
        required:true
    },

    description : {
        type :String,
        required:true,
    },

       
    
},
{timestamps: true}
);

let  post = model("post", PostSchema)
module.exports = post