const mongoose = require(mongoose);

const reviewSchema = new mongoose.schema ({

    costumer_id: {

     type: number,

     require: true

    },

product_id: {

    type: number,

    require: true
},

costumer_name: {

    type: string,

    require: true

},

rating: {

    type: number,

    require: true
},

review_text: {

    type: string,

    require: true

},

helpful_count: {

    type: string,

    require: true

},

timestamp: {

    type: date,

    default: date.now,

    require: true

}

});