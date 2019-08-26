let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let minutes = today.getMinutes();
let hours = today.getHours();

switch (month) {
    case 1:
        month = 'Jan'
        break;
    case 2:
        month = 'Feb'
        break;
    case 3:
        month = 'Mar'
        break;
    case 4:
        month = 'April'
        break;
    case 5:
        month = 'May'
        break;
    case 6:
        month = 'June'
        break;
    case 7:
        month = 'July'
        break;
    case 8:
        month = 'Aug'
        break;
    case 9:
        month = 'Sep'
        break;
    case 10:
        month = 'Oct'
        break;
    case 11:
        month = 'Nov'
        break;
    case 12:
        month = 'Dec'
        break;
    default:
        break;
}

if (minutes < 10) {
    minutes = '0' + minutes;
} 
if (hours < 10) {
    hours = '0' + hours;
}

const date = `${day} ${month} ${year} - ${hours}:${minutes}`;

module.exports = date;