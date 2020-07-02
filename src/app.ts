// GENERIC TYPES
// const names: Array<string> = []; // the same as string[] - it is a generic type built into the typescript
// // names[0].split(" ")

// const promise: Promise<any> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("This is done.")
//     }, 2000)
// });

// promise.then(data => {
//     data.split(" ")
// })

// CREATING A GENERIC FUNCTION

function merge<T extends object, U extends object>(objA: T, objB: U) {
  //constrains - extends object
  return Object.assign(objA, objB);
}

const mergeobj = merge({ name: "Max" }, { age: 30 }); // wehn calling the function we can specify the type, but for now its good to have T and U just to show the difference
console.log(mergeobj);

// const mergeobj = merge({ name: "Max" }, { age: 30 }) as {name: string, age: number};

// console.log(merge({ name: "Max" }, { age: 30 }));

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  // generic function with interface
  let descriptionText = "Got no value";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(["Sport", "Cooking"]));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  // it is not guaranteed that this object will have the key
  return "Value " + obj[key];
}

extractAndConvert({ name: "Zorana" }, "name");

// GENERIC CLASSES

// (string | number | boolean)[] this means that in the array you can store any type
// (string[] | number[] | boolean[]) this works, but than functions are compaining
// <T extends string | number | boolean> that is why the generic is the best 
class DataStorage<T extends string | number | boolean> {
  // default storage
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    // returns -1 if it doesnt find anything
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }
  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Zox");
textStorage.addItem("Max");
textStorage.addItem("Hicks Bill");
textStorage.removeItem("Zox");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = { name: "Max" };
// objStorage.addItem(maxObj);
// objStorage.addItem({ name: "Man" });

// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  // return { title: title, description: description, completeUntil: date };
  let courseGoal: Partial<CourseGoal> = {}; // properties of partial generic are optional, thats why its not complaining
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal; // with typecasting we are securing it will have at the end the same structure as defined interface
}

const names: Readonly<string[]> = ["Max", "Anna"]; // readonly, no adding
// names.push("Manu");
// names.pop()

// difference between generics and union types 