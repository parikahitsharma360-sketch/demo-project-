
// controllers / costumerControllers //

const db  = require('/..config/ mysql')

// get all costumer //

exports.getAllCostumer = async(req, res) => {

    try {

        const[costumer] = await db.query('SELECT * FROM costumer');

    res.status(201).json({

    sucess: true,

    message: 'show costumer sucessfully',

    data: costumer,

});


        } catch(err) {

            res.status(500).json({

                sucess: false,

                message: 'error costumers not found',
                
                message: err.messaage
                 
            });

        }
};

// create costumer //

exports.createCostumer = async(req, res) => {
    

    try {
      
        const{costumer_id, name, email, address} = req.body;

        const[result] = await db.query (

       'INSERT INTO(costumer_id, name, email, address)VALUES(? ? ? ? )'

       [costumer_id, name, email, address]

 );

   res.status(201).json({

    sucess: true,

    message: 'costumer created sucessfully',


   });


    } catch(err) {

  res.status(500).json({

    sucess: false,

    message: 'costumer not created! please try again later',

    message: err.message,


  });


    }

};


// update customer //

exports.updateCostumer = async(req, res) => {

    try {

        const{costumer_id, name, email, address} = req.body;

        const costumerId = req.params.body;

        const[result] = await db.query(

            'UPDATE costumer SET = ?, name = ?, email = ?, address = ?  WHERE costumer_id = ?'

            [costumer_id, name, email, address]

        );

        if(rowAffected === 0) {

            return res.status(404).json({sucess: false, message: 'costumer update unsuccessfull'});

        };

        // log activity //

        await Activity.create({

         costumer_id: parseInt(costumer_id),

         activity_type:   'costumer update',

         description:  `new costumer ${name} created`,

         metadata: {costumer_id, name, email, source, created_at}


        });

        res.status(201).json({

            sucess: true,

            message: 'costumer updated sucessFully',


        });


    } catch(err) {

        res.status(500).json({

            sucess: false,

            message: err.message

        });
    }
};


// delete costumer //

exports.deleteCostumer = async(req, res) => {

    try {

        const[result] = await db.query( 'DELETE FROM costumer WHERE costumer_id = ?'[req.paramsId]);

       res.status(201).json({

        sucess: true,

        message: 'costumer deleted sucessfully',

       });


    } catch (err) {

        res.status(500).json({

            sucess: false,

            message: 'costumer not deleted',

            messsage: 'err.message',


        });
    }
};


// get all costumers with (pagination + search)


exports.getAllCostumer = async(req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;

        const limit = parseInt(req.query.limit) || 30;

        const search = req.query.search || "";

        const offset = (page - 1) * limit;

        const [costumer] = await db.query(

            'SELECT * FROM costumer WHERE name LIKE ?, ORDER BY created_at DESC LIMIT ?, OFFSET ?'
             
            [`%${search}%`, $% limit, offset]

        );

        // count query //

        const [[{total}]] = await db.query(

            'SELECT COUNT * AS total costumer WHERE name LIKE ?'

            [`%${search}%`]

        );

        const totalpages = Math.ceil(total / limit);


      res.status(201).json({

        sucess: true,

       page,

       limit,

        totalpages,

        totalresult: 'all costumer',


      });


    } catch(err) {

    res.status(500).json({

        sucess: false,

        message: 'error fetching costumer',

        error: err.message,
        

    });


    }
};


// get single costumer with (by id) //


exports.getSinglecostumer = async(req, res) => {
   

    try{

        const{id} = req.params

        const[rows] = await db.query('SELECT * FROM costumer WHERE id = ?'[id]);

        if(rows.length === 0) {

            return res.status(404).json({

                sucess: false,

                message: 'costumer not found'

            });
        }

        res.status(201).json({

            sucess: true,

            message: 'fetch costumer',
            
            costumer: rows[0],

        });



    } catch(err) {

        res.status(500).json({

            sucess: false,

            message: err.mesage,

        });
    }
};