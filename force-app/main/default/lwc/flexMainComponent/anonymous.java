String onlyText = '{"Id":1,"ibmCode":"12345","basesCode":[],"baseCode":"","productCodes":[],"productCode":"","prices":[],"price":"","IBM":"","Base":"","Product":"","Price":""}';


FlexController.Filter flex = new FlexController.Filter();
flex.ibmCode = '12345';
flex.productCode = 'DIESEL A';

System.debug(flex.ibmCode);
System.debug(flex.productCode);

System.debug(FlexController.getRegisteredPricesForIBM(flex));

