import moment from 'moment';



export default class DateUtil {
    static getTimeInString() {
        const now = moment().toDate();
        const news=moment.utc(now, "YYYY-MM-DD HH:mm:ss.SSS");
        var result=news.toDate().toISOString().replace('T'," ").replace("Z",'')
        return result.toString();
    }
    static UtcToLocal(utcTime){
        return moment.utc(utcTime).local().format('YYYY-MM-DD HH:mm:ss')
    }
}

// export function getTimeInString() {
//     const now = moment().toDate();
//     const news=moment.utc(now, "YYYY-MM-DD HH:mm:ss.SSS");
//     var result=news.toDate().toISOString().replace('T'," ").replace("Z",'')
//     return result.toString();
// }
// function UtcToLocal(utcTime){
//     return moment.utc(utcTime).local().format('YYYY-MM-DD HH:mm:ss')
// }
// export default UtcToLocal;