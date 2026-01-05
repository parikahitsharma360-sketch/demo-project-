// controllers / reiewcontrollers.js //

const review = require ('../models/review');

// get all  reviews of costumer //

exports.getCostumerReview = async (req, res) => {

    try {
     
     const review = await  db.find ({

        costumer_id : parseInt(req.params.costumer_id)

      }).sort({timestamp: -1});

      res.status(201).json ({sucess: true, data: review});

      
    } catch(err) {

      res.status(500).json ({sucess: false, message: err.message})


    }
};

// add costum note/review //

exports.addReview = async(req, res) => {

  try {

    const{product_id, costumer_id, costumer_name, rating, review_text, helpful_count, timestamp} = req.body;

    const review = await review.create({

      product_id,

      costumer_id,
      
      costumer_name,

      rating,

      review_text,

      helpful_count,
      
      timestamp,

    });

    res.status(201).json({
      
      sucess: true, 
      
      message: 'costumer review sucessfully',

      data: review
    
    });


  } catch(err) {

    res.status(500).json({sucess: false, message: err.message})
  }
};


// get all review (with pagination) //


exports.getAllreview = async(req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1)  * limit;

    const review = await review.find()

      .sort ({timestamp: - 1})
    
      .skip (skip)

      .limit (limit);

      const total = await review.countDocuments();

      res.status(201).json({
       
        sucess: true,

        data: review,

        pagination : {
        
        page, 

        limit,

        total,

        pages: Math.ceil(total / limit)

        }

      });


    
  }catch(err){

    res.status(500).json({sucess: false, message: err.message})


  }
};


// delete review by id //

exports.deleteReview = async (req, res) => {

  try {
    
    const {reviewId} = req.params;

    const review = await review.findById(reviewId);

    if(!review) {

      return res.status(404).json({

        sucess: false,

        message: 'review not found',

      });

    }

await review.findByIdAndDelete(reviewId);
    
      res.status(201).json({

        sucess: true,

        message: 'review deleted sucessfuly',

        data: review,

      });

  } catch(err) {

    res.status(500).json({

      sucess: false,

      message: 'error deleting review',

      message: err.message

    });

  }
  
};


// update review //

exports.updateReview = async(req, res) => {

  try{

    const{reviewId} = req.params;

    const review = {review_text, rating, helpful_count} = req.body;


    const updatereview = await review.findReviewByIdAndupdate(

      reviewId,
      {

        review_text,

        rating, 

        helpfull_count,


      },

      {

        new: true,

        runValidator: true,
      },

    )

    if(!reviewUpdate){

      return res.status(404).json({

        sucess: false,

        message: 'review not found'


      });

    }

     res.status(201).json({

      sucess: true,

      message: 'review updated sucessfull',

     });


     } catch(err) {

      res.status(500).json({

        sucess: false,

        mesage: err.message,

      });

     }
};


// get single review / by id //


exports.getSinglereview = async(req, res) => {


  try {

    const{reviewId} = req.params;

    const review = await review.findbyid(id);
   
    if(!review) {

      return res.status(404).json({

        sucess: false,

        message: 'review not found'

      });

    }

    res.status(201).json({

      sucess: true,

      review,

    });

  } catch(err) {

    res.status(500).json({

      sucess: false,

      message: 'server error',

      error: err.message,

    });
  }
};