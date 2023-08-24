const mongoose=require("mongoose");
// schema
const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    role: {
        type: String,
        required:true,
        enum:['user','admin'],
        default:'user'
    },
    password: {
        type: String,
        required:true
    },
    lastLogin: {
        type: Date,
        default:Date.now()
    },
    isVerified: {
        type: String,
        default:false
    },
    // The account level here is going to be determined.If a user is being active for quite long or the user has created more posts and that posts have more comments, then we can upgrade that user account's account level
    // Maybe in future we can implement a logic that if your account level is not gold or silver, then we are going to restrict you from setting features in the application.For example, if you want to bookmark a post, unless your account is being set to gold or silver 
    accountLevel: {
        type: String,
        enum:['bronze','silver','gold'],
        default:'bronze'
    },
    profilePicture: {
        type: String,
        default:""
    },
    coverImage: {
        type: String,
        default:""
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
    // For example, if the user wants to receive notification by email or by telephone or by text.So we are going to stick to the email, but in future we can add mobile or text messages as well.
    notificationPreferences: {
      email:{ type: String,default:true}
    },
    gender: {
        type: String,
        enum:['male','female'],
    },
// And since we are going to keep track about multiple users, we are going to use an array and the type here is going to be a special type.
// When it comes to MongoDB, we have different ways of relating documents together.One of those is the embedded one.We don't want to embed all the user properties into this field and this is not the ideal way.
// The recommended way is to save the ID of the user(referencing).And if you want to fetch data about the user, we can use a method called populate on that.
    profileViewers: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    blockedUsers: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref:"Post"}],
    likedPosts: [{type: mongoose.Schema.Types.ObjectId, ref:"Post"}],
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },
    accountVerificationToken: {
        type: String,
    },
    accountVerificationExpires: {
        type: Date,
    },
},{
    timestamps:true,
});

const user=mongoose.model('User',userSchema);
module.exports=User;