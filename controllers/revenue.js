import Revenue from "../models/Revenue.js";
const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
var goBackDays = 7;

var today = new Date();
var isoDays = [];
var daysNames = [];

for (var i = 0; i < goBackDays; i++) {
  var newDate = new Date(today.setDate(today.getDate() - 1));

  var date = new Date();
  date.setDate(date.getDate() - i);

  const iso =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  const name = days[newDate.getDay()];

  isoDays.push(iso);
  daysNames.push(name);
}

const last7daysIso = isoDays.reverse();
const last7daysNames = daysNames.reverse();

// Create revenue
export const addRevenue = async (req, res, next) => {
  const newProduct = new Revenue(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const savedProduct = await Revenue.find();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

// export const range = async (req, res, next) => {
//   // let {start, end} = req.query;
//   var values = [];
//   try {
//     for (let index = 0; index < last7daysIso.length; index++) {
//       const savedProduct = await Revenue.find({
//         createdAt: { $gte: last7daysIso[i], $lt: last7daysIso[i+1] },
//       });
//       values.push(savedProduct);
//     }
//     res.status(200).json(values);
//   } catch (err) {
//     next(err);
//   }
// };

export const range = async (req, res, next) => {
  // let {start, end} = req.query;
  var values = [];
  try {
    for await (let day of last7daysIso) {
      var value = 0;
      const index = last7daysIso.indexOf(day);
      const start = day;
      const end = last7daysIso[last7daysIso.indexOf(day) + 1];
      const savedProduct = await Revenue.find({
        createdAt: { $gte: start, $lt: end },
      });
      savedProduct.map((p) => (value += p.value));
      const word = last7daysNames[index].substring(0, 3);

      const firstLetter = word.charAt(0);

      const firstLetterCap = firstLetter.toUpperCase();

      const remainingLetters = word.slice(1);

      const capitalizedWord = firstLetterCap + remainingLetters;

      values.push({
        name: capitalizedWord,
        iso: last7daysIso[index],
        profit: value,
      });
    }

    res.status(200).json(values);
  } catch (err) {
    next(err);
  }
};
