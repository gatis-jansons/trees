/*
The k-nearest neighbors algorithm is used for classification of unknown items and involves calculating the distance of the unknown item's neighbors. We'll use Euclidean distance to determine the closest neighbor and make our best guess on what the mystery fruit is.
The k-nearest neighbors algorithm is used for classification of unknown items and involves 
calculating the distance of the unknown item's neighbors. We'll use Euclidean distance to determine
the closest neighbor and make our best guess on what the mystery fruit is.
*/
function determineFruit({ size, redness }) {
  const fruit = [
    { name: "grape", size: 1, redness: 0 },
    { name: "orange", size: 2, redness: 1 },
    { name: "grapefruit", size: 3, redness: 2 }
  ];

  const { name } = fruit.reduce(
    (prev, cur) => {
      let curCalc = calcDistance([[size, cur.size], [redness, cur.redness]]);
      console.log(curCalc);
      return prev.dist < curCalc ? prev : { name: cur.name, dist: curCalc };
    },
    {
      name: fruit[0].name,
      dist: calcDistance([[size, fruit[0].size], [redness, fruit[0].redness]])
    }
  );
  return `This is most likely a ${name}`;
}

function calcDistance(data) {
  return Math.sqrt(
    data.reduce((acc, [init, test]) => acc + Math.pow(init - test, 2), 0)
  );
}

console.log(determineFruit({ size: 2, redness: 2 }));


