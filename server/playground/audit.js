let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" }
];

// returns array of the first two users
let someUsers = users.filter(item => {
  // item.id == 1
  if (item.id < 3) {
    console.log(item.name);
    return item["name"];
  }
}

)

console.log(someUsers.name); //