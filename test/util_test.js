function Util(){}

Util.css=function(ele,option){
  for(prop in option){
    ele.style[prop]=option[prop];
  }
};
