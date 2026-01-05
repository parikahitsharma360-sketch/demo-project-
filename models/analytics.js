// analytics //

const analyticsSchema = new mongoose.schema({

    totalRevenue: Number,

    totalUser: Number,

    totalOrder: Number,

    // daily stats //

    dailyStats: {

        date: date,

        orders: number,

        revenue: number,

    },

    // top products //

    topProducts: [

        {
      productId: moongoose.types.schema.objectId,


      totalSold: number,


    },

]

});