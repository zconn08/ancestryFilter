$(document).ready(function(){

//Parse ANCESTRY_FILE data to usable format
var ancestry = JSON.parse(ANCESTRY_FILE);

//Defines ancestryCount as the number of people in dataset
var ancestryCount = ancestry.length;

//Initializes variables currentArr and currentPercent
var currentArr = [];
var currentPercent;

//Defines myEach to perform a function on each value in the array
function myEach(arr,f){
  for(var i = 0; i<arr.length;i++){
    f(arr[i]);
  }
}

//Defines myFilter to filter an array based on a function that returns a boolean
function myFilter(array, g){
  var myArr = [];
  myEach(array,function(x){
    if(g(x)===true){
    myArr.push(x);
    }
  });
  return myArr;
  }

//Defines functions to test for certain atributes
function isMale(x){
  return x.sex === "m";
}
function isFemale(x){
  return x.sex === "f";
}
function motherKnown(x){
  return x.mother !== null;
}
function fatherKnown(x){
  return x.father !== null;
}
function bornAfter1800(x){
  return x.born > 1799;
}
function bornAfter1600(x){
  return x.born > 1599;
}
function haverbeke(x){
  return x.name.indexOf("Haverbeke") > -1;
}
function ageOver70(x){
  return x.died - x.born >= 70;
}

//When a button is clicked, it empties the percent and name column, changes current button to blue, resets rest of buttons to black and shows bars
$(".button").click(function(){
  $("#percent2").empty();
  $("#nameColumn").empty();
  $("#totalNum").empty();
  $(".button").css("background-color","black");
  $(this).css("background-color","#000099");
  $("#smallBar").fadeIn(1000);
  $("#largeBar").show();
  $("#nameColumn").show();
  $("#totalNum").append(ancestryCount);
  $("#total").show();
});

//Defines listNames to list out names for people in current Array with dash before each name and a break to separate the names. Additionally, adds a total of the subset at the end.
function listNames(arr){
  if(arr.length < 1){
    return null;
  }
  var newArr = [];
  myEach(arr,function(x){
    if(x !== undefined){
      newArr.push("- " + x.name + "<br>");
    }
  });
  newArr.push("<br>subset="+arr.length);
  return newArr.join("");
}

//Defines updateCurrent to add names to name column. Calculates percent that subset represents and then updates percent. Changes height and margin of bars to represent correct portion.
function updateCurrent(){
  $("#nameColumn").html(listNames(currentArr));
  currentPercent = Math.round(currentArr.length / ancestry.length * 100);
  $("#percent2").append(currentPercent);
  $("#smallBar").css("margin-top",(1 - (currentPercent/100))*400 + "px");
  $("#smallBar").css("height",(currentPercent/100) * 400+"px");
}

//Defines respondToClick to filter currentArr based on button clicked and runs updateCurrent function
function respondToClick(button,filter){
  $(button).click(function(){
  currentArr = myFilter(ancestry,filter);
  updateCurrent();
  });
}

//Runs respondToClick function with relevant button ids and tests
respondToClick("#male",isMale);
respondToClick("#female",isFemale);
respondToClick("#motherKnown",motherKnown);
respondToClick("#fatherKnown",fatherKnown);
respondToClick("#BornAfter1800",bornAfter1800);
respondToClick("#BornAfter1600",bornAfter1600);
respondToClick("#Haverbeke",haverbeke);
respondToClick("#ageOver70",ageOver70);

});

//Ancestry data in JSON
var ANCESTRY_FILE = "[\n  " + [
  '{"name": "Carolus Haverbeke", "sex": "m", "born": 1832, "died": 1905, "father": "Carel Haverbeke", "mother": "Maria van Brussel"}',
  '{"name": "Emma de Milliano", "sex": "f", "born": 1876, "died": 1956, "father": "Petrus de Milliano", "mother": "Sophia van Damme"}',
  '{"name": "Maria de Rycke", "sex": "f", "born": 1683, "died": 1724, "father": "Frederik de Rycke", "mother": "Laurentia van Vlaenderen"}',
  '{"name": "Jan van Brussel", "sex": "m", "born": 1714, "died": 1748, "father": "Jacobus van Brussel", "mother": "Joanna van Rooten"}',
  '{"name": "Philibert Haverbeke", "sex": "m", "born": 1907, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"}',
  '{"name": "Jan Frans van Brussel", "sex": "m", "born": 1761, "died": 1833, "father": "Jacobus Bernardus van Brussel", "mother":null}',
  '{"name": "Pauwels van Haverbeke", "sex": "m", "born": 1535, "died": 1582, "father": "N. van Haverbeke", "mother":null}',
  '{"name": "Clara Aernoudts", "sex": "f", "born": 1918, "died": 2012, "father": "Henry Aernoudts", "mother": "Sidonie Coene"}',
  '{"name": "Emile Haverbeke", "sex": "m", "born": 1877, "died": 1968, "father": "Carolus Haverbeke", "mother": "Maria Sturm"}',
  '{"name": "Lieven de Causmaecker", "sex": "m", "born": 1696, "died": 1724, "father": "Carel de Causmaecker", "mother": "Joanna Claes"}',
  '{"name": "Pieter Haverbeke", "sex": "m", "born": 1602, "died": 1642, "father": "Lieven van Haverbeke", "mother":null}',
  '{"name": "Livina Haverbeke", "sex": "f", "born": 1692, "died": 1743, "father": "Daniel Haverbeke", "mother": "Joanna de Pape"}',
  '{"name": "Pieter Bernard Haverbeke", "sex": "m", "born": 1695, "died": 1762, "father": "Willem Haverbeke", "mother": "Petronella Wauters"}',
  '{"name": "Lieven van Haverbeke", "sex": "m", "born": 1570, "died": 1636, "father": "Pauwels van Haverbeke", "mother": "Lievijne Jans"}',
  '{"name": "Joanna de Causmaecker", "sex": "f", "born": 1762, "died": 1807, "father": "Bernardus de Causmaecker", "mother":null}',
  '{"name": "Willem Haverbeke", "sex": "m", "born": 1668, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"}',
  '{"name": "Pieter Antone Haverbeke", "sex": "m", "born": 1753, "died": 1798, "father": "Jan Francies Haverbeke", "mother": "Petronella de Decker"}',
  '{"name": "Maria van Brussel", "sex": "f", "born": 1801, "died": 1834, "father": "Jan Frans van Brussel", "mother": "Joanna de Causmaecker"}',
  '{"name": "Angela Haverbeke", "sex": "f", "born": 1728, "died": 1734, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"}',
  '{"name": "Elisabeth Haverbeke", "sex": "f", "born": 1711, "died": 1754, "father": "Jan Haverbeke", "mother": "Maria de Rycke"}',
  '{"name": "Lievijne Jans", "sex": "f", "born": 1542, "died": 1582, "father":null, "mother":null}',
  '{"name": "Bernardus de Causmaecker", "sex": "m", "born": 1721, "died": 1789, "father": "Lieven de Causmaecker", "mother": "Livina Haverbeke"}',
  '{"name": "Jacoba Lammens", "sex": "f", "born": 1699, "died": 1740, "father": "Lieven Lammens", "mother": "Livina de Vrieze"}',
  '{"name": "Pieter de Decker", "sex": "m", "born": 1705, "died": 1780, "father": "Joos de Decker", "mother": "Petronella van de Steene"}',
  '{"name": "Joanna de Pape", "sex": "f", "born": 1654, "died": 1723, "father": "Vincent de Pape", "mother": "Petronella Wauters"}',
  '{"name": "Daniel Haverbeke", "sex": "m", "born": 1652, "died": 1723, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"}',
  '{"name": "Lieven Haverbeke", "sex": "m", "born": 1631, "died": 1676, "father": "Pieter Haverbeke", "mother": "Anna van Hecke"}',
  '{"name": "Martina de Pape", "sex": "f", "born": 1666, "died": 1727, "father": "Vincent de Pape", "mother": "Petronella Wauters"}',
  '{"name": "Jan Francies Haverbeke", "sex": "m", "born": 1725, "died": 1779, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"}',
  '{"name": "Maria Haverbeke", "sex": "m", "born": 1905, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"}',
  '{"name": "Petronella de Decker", "sex": "f", "born": 1731, "died": 1781, "father": "Pieter de Decker", "mother": "Livina Haverbeke"}',
  '{"name": "Livina Sierens", "sex": "f", "born": 1761, "died": 1826, "father": "Jan Sierens", "mother": "Maria van Waes"}',
  '{"name": "Laurentia Haverbeke", "sex": "f", "born": 1710, "died": 1786, "father": "Jan Haverbeke", "mother": "Maria de Rycke"}',
  '{"name": "Carel Haverbeke", "sex": "m", "born": 1796, "died": 1837, "father": "Pieter Antone Haverbeke", "mother": "Livina Sierens"}',
  '{"name": "Elisabeth Hercke", "sex": "f", "born": 1632, "died": 1674, "father": "Willem Hercke", "mother": "Margriet de Brabander"}',
  '{"name": "Jan Haverbeke", "sex": "m", "born": 1671, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"}',
  '{"name": "Anna van Hecke", "sex": "f", "born": 1607, "died": 1670, "father": "Paschasius van Hecke", "mother": "Martijntken Beelaert"}',
  '{"name": "Maria Sturm", "sex": "f", "born": 1835, "died": 1917, "father": "Charles Sturm", "mother": "Seraphina Spelier"}',
  '{"name": "Jacobus Bernardus van Brussel", "sex": "m", "born": 1736, "died": 1809, "father": "Jan van Brussel", "mother": "Elisabeth Haverbeke"}'
].join(",\n  ") + "\n]";