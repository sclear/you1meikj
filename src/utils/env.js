/**
 * @param {mode}
 */
 let Imgurl = '';
 let ipUrl  = '';

if(process.env.NODE_ENV === 'development'){
    Imgurl = 'https:/you1mei.com/public/uploads/logo/';
    ipUrl  = 'https:/you1mei.com'
} else{
    Imgurl = '/public/uploads/logo/';
    ipUrl  = '';
}

export {
    Imgurl,
    ipUrl
}