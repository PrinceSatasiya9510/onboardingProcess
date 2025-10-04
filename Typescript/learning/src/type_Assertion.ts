let a: any = "12";
(a as string).charAt(0)

// => after write as string so always show string methods and also same work for number and others.


let b: any = 45.3698;
(b as number).toFixed(2)

// other method of type assertion 



let c: any = 45.3698;
(<number>c).valueOf()


let d: any = 45.3698;
(<string>d).indexOf("a")