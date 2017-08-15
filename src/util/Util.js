function Util(){}

Util.css=function(ele,option){
  //TODO:check ele and option's validation
  for(let prop in option){
    ele.style[prop]=option[prop];
  }
};


export default Util;