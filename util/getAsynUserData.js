const app = getApp();
const getStorage = app.api.getStorage;

var timer;
function getAsynUserData ( cb ) {
    // 异步
    return getUserStorage(cb);
}
function getUserStorage ( cb ) {
    return getStorage({
        key: 'user'
    }).then( res => {
       var user = res.data;

       if ( !user ) {
           timer = setTimeout(function () {					
               getAsynUserData(cb);
            }, 0);
        }
        else {
            if ( typeof cb == 'function' ) {
                clearTimeout(timer);
                return Promise.resolve(cb(user));
            }
            else {
                return Promise.reject('cb is not a function');
            }        
        }         

    }, err => {
        console.log(err);
        return Promise.reject(err);
    });
}
export default getAsynUserData;
