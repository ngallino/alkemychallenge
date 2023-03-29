

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function  ) => {
    
    if (!file) return callback ( new Error ('Image is empty'), false) 

    const imageExtension = file.mimetype.split('/')[1];
    const validExtensions= ['jpg', 'jpeg', 'png', 'gif'];

    if (validExtensions.includes ( imageExtension )){
        return callback ( null, true )
    }
    

    callback (null, true);
  }