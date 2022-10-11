 var getTimeStamp = (selectedValue) =>{
    var date = new Date()
    if(selectedValue == 7){
      date = addMonths(date = new Date(),3)
     
      return date
    }
    if(selectedValue == 7){
      date = addMonths(date = new Date(),3)
     
      return date
    }
    if(selectedValue == 4){
      date = addMonths(date = new Date(),1)
     
      return date
    }
    if(selectedValue == 1.5){
      date = addWeeks(date = new Date(),1)
      
      return date
    }
    if(selectedValue == 0.5){
      date = addHour(date = new Date(),24)
      
      return date
    }
  
    if(selectedValue == 0.1){
      date = addHour(date = new Date(),1)
      
      return date
    }
  
    function addHour (date = new Date(), hour) {  
      date.setHours(date.getHours() + hour)
      return date
    }
    function addWeeks (date = new Date(), weeks) {  
      date.setDate(date.getDate() + weeks * 7)
      return date
    }
  
    function addMonths(date = new Date(), months) {
      var d = date.getDate();
      date.setMonth(date.getMonth() + +months);
      if (date.getDate() != d) {
        date.setDate(0);
      }
      return date;
    }   
    
  }
  export {getTimeStamp}
