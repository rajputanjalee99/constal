function yearMonthName(month){

    if(month == 1){
        return "January"
    }
    else if(month == 2){
        return "February"
    }
    else if(month == 3){
        return "March"
    }
    else if(month == 4){
        return "April"
    }
    else if(month == 5){
        return "May"
    }
    else if(month == 6){
        return "June"
    }
    else if(month == 7){
        return "July"
    }
    else if(month == 8){
        return "August"
    }
    else if(month == 9){
        return "September"
    }
    else if(month == 10){
        return "October"
    }
    else if(month == 11){
        return "November"
    }
    else if(month == 12){
        return "December"
    }else{
        return "Invalid"
    }
    // switch (month) {
    //   case 1:
    //     return "January"
    //     break;
    //   case 2 || 02:
    //     return "February"
    //     break;
    //   case 3 || 03:
    //     return "March"
    //     break;
    //   case 4 || 04:
    //     return "April"
    //     break;
    //   case 5 || 05:
    //     return "May"
    //     break;
    //   case 6 || 06:
    //     return "June"
    //     break;
    //   case 7 || 07:
    //     return "July"
    //     break;
    //   case 8 || 08:
    //     return "August"
    //     break;
    //   case 9 || 09:
    //     return "September"
    //     break;
    //   case 10:
    //     return "October"
    //     break;
    //   case 11:
    //     return "November"
    //     break;
    //   case 12:
    //     return "December"
    //     break;
    
    //   default:
    //     return "Invalid month"
    //     break;
    // }

  }

//   export var yearMonthName = yearMonthName

  module.exports = {
    yearMonthName : yearMonthName
  }