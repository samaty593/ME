let constNumber2 = this.constNumber;
const lenghtN = this.constNumber.length; // = 5

 for(let i = 0; i < lenghtN; i++) {
  const item = constNumber2[i];

  if(this.revenues < item.tranche && i <= lenghtN - 2) {
    constNumber2[i].tranche = this.revenues;
    constNumber2.splice(i+1, lenghtN - i -1);
    break;
  }
 
  if(this.revenues > item.tranche && i === lenghtN - 2){
    constNumber2[i+1].tranche = this.revenues;
    break;
  };

  };// code to simulate yhe IR with a for loop