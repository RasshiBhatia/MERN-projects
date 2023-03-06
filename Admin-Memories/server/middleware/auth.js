import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.header.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;

        if(token && isCustomAuth) {
            decodeData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub; //sub is the name given by google id to differentiate user
        }

        next();
    } catch (error) {
        console.log(error);
    }
}
export default auth;