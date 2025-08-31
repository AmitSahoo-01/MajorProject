const express = require("express");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const router = express.Router();

const listingController = require("../controllers/listing.js");

//  multer is a package that is used for parsing multi-from data....
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,  error);
    }else{
        next();
    }
};


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));


router.get("/new",isLoggedIn,listingController.newFromRender);


router.route("/:id")
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.putListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))
.get(wrapAsync(listingController.showListing));


router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));


module.exports = router;