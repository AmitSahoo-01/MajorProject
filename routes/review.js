const express = require("express");
const Review = require("../models/review.js");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isReviewAuthor } = require("../middleware.js");


const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,  error);
    }else{
        next();
    }
};


const reviewController = require("../controllers/review.js");



//Reviews route  (post route)
router.post("/", isLoggedIn,validateReview, wrapAsync(reviewController.createReview));


//  Delete route 

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));



module.exports = router;