declare module "@salesforce/apex/CarController.getCars" {
  export default function getCars(param: {filters: any}): Promise<any>;
}
declare module "@salesforce/apex/CarController.getSimilarCars" {
  export default function getSimilarCars(param: {carId: any, maker: any}): Promise<any>;
}
