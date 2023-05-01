
export default function validations(input) {

var errors = {};

if(!input.name) {
    errors.name = "Name is required"
}
else if(input.name.match("^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$")) {
    if(input.name.length > 20) {
     errors.name = "Name cannot be longer than 20 characters"
    }
}
else {errors.name = "Name must not contain Numbers or Special characters"};




if(input.heightMin) {
    
    if(!input.heightMax) {
        errors.heightMax = "heightMax is required"
    }
    
    else if(input.heightMin.match("^[0-9]+$")) {
        if (Number(input.heightMin) < 1) {
            errors.heightMin = "Height cannot be less than 1cm";
        }
    }
    else { errors.height = "Number must not contain Letters or Special characters"}
    
}



if(input.heightMax) {
    
    if(!input.heightMin) {
        errors.heightMin = "heightMin is required"
    }
    
    else if(input.heightMax.match("^[0-9]+$")) {
        if (Number(input.heightMax) > 120) {
            errors.heightMax = "Height cannot be more than 120cm";
        }
    }
    else {errors.height = "Number must not contain Letters or Special characters"}

}    

if(input.heightMin && input.heightMax){
    if(Number(input.heightMin) > Number(input.heightMax)) {
        errors.height = "Min height cannot be bigger than Max height or vice versa"
    }
}

else if(!input.heightMax && !input.heightMin) {errors.height = "Height is required"}






if(input.weightMin) {
    
    if(!input.weightMax) {
        errors.weightMax = "weightMax is required"
    }
    else if(input.weightMin.match("^[0-9]+$")) {
        if (Number(input.weightMin) < 1) {
            errors.weightMin = "Weight cannot be less than 1kg";
        }
    }
    else {errors.weightMin = "Number must not contain Letters or Special characters"}
}

if(input.weightMax) {
    
    if(!input.weightMin) {
        errors.weightMin = "weightMin is required"}

    else if(input.weightMax.match("^[0-9]+$")) {
        if (Number(input.weightMax) > 120) {
            errors.weightMax = "Weight cannot be more than 120kg";
          }
    }
    else {errors.weightMax = "Number must not contain Letters or Special characters"}
}


if(input.weightMin && input.weightMax){

    if(Number(input.weightMin) > Number(input.weightMax)) {
        errors.weight = "Min weight cannot be bigger than Max weight or vice versa"
    }

}

else if(!input.weightMax && !input.weightMin) {errors.weight = "Weight is required"}



if(input.lifeMin) {
    if(input.lifeMin.match("^[0-9]+$")) {
      if (Number(input.lifeMin) < 1) {
          errors.lifeMin = "Life expectancy cannot be less than 1 year";
      }
    }
    else {
      errors.life = "Number must not contain Letters or Special characters";
    }
  }

if(input.lifeMax) {

if(input.lifeMax.match("^[0-9]+$")) {
    if (Number(input.lifeMax) > 20) {
        errors.lifeMax = "Life expectancy cannot be more than 20 years";
      }
}
else {errors.life = "Number must not contain Letters or Special characters"}
}

if(input.lifeMin && input.lifeMax){
   if(Number(input.lifeMin) > Number(input.lifeMax)) {
    errors.life = "minLife cannot be bigger than maxLife or vice versa"
}
}

if(Number(input.lifeMax) === 0 && Number(input.lifeMin) > 0) {
    errors.lifeMax = "lifeMax is required"
}

else if(Number(input.lifeMin) === 0 && Number(input.lifeMax) > 0) {
    errors.lifeMin = "lifeMin is required"
}

return errors
}

