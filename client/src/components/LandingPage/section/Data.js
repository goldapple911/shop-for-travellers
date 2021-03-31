const continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" },
  ];
const price = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to $200",
    array: [0, 200],
  },
  {
    _id: 2,
    name: "$201 to $300",
    array: [201, 300],
  },
  {
    _id: 3,
    name: "$301 to $400",
    array: [250, 279],
  },
  {
    _id: 4,
    name: "$401 to $500",
    array: [280, 299],
  },
  {
    _id: 5,
    name: "More than $501",
    array: [501, 1500000],
  },
];

export {
    price,
    continents
}