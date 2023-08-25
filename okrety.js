var list = Array(100).fill(" ");
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];



////Creating a board
function board_creation() {
  var tresc_diva = "";

  for (var i = 0; i < list.length; i++) {
    var nazwa_diva = "pold" + (i + 1);
    tresc_diva += '<div class="square" id="' + nazwa_diva + '">' + list[i] + '</div>';
    if ((i + 1) % 10 == 0) {
      tresc_diva += '<div style="clear:both;"></div>';
    }
  }

  document.getElementById("box").innerHTML = tresc_diva;
}
////Create numbers
function numb_creation() {
  var tresc_diva_numbers = "";

  for (var i = 0; i < numbers.length; i++) {
    var nazwa_liczb = "liczb" + i;
    tresc_diva_numbers += '<div class="lightA" id="' + nazwa_liczb + '">' + numbers[i] + '</div>';
  }

  document.getElementById("numbers").innerHTML = tresc_diva_numbers;
}
////Creating digits
function lett_creation() {
  var tresc_diva_letters = "";

  for (var i = 0; i < letters.length; i++) {
    var nazwa_litr = "litr" + i;
    tresc_diva_letters += '<div class="lightA" id="' + nazwa_litr + '">' + letters[i] + '</div>';
  }

  document.getElementById("letters").innerHTML = tresc_diva_letters;
}

numb_creation();
lett_creation();
board_creation();
////Illumination of numbers and digits
function Lampki_ON() {
  for (var nr = 0; nr <= 99; nr++) {
    for (var i = 0; i <= 9; i++) {
      var list = document.getElementById('pold' + (nr + 1));
      var liczba = document.getElementById('liczb' + i);
      var litera = document.getElementById('litr' + i);
      if (list.classList.contains("squareship_to_select")) {
        if (nr % 10 == i) {  
          litera.classList.replace("lightA", "light1");
        }        
        if ((nr - (nr % 10))/10 == i) {
          liczba.classList.replace("lightA", "light1");
        }
      }
  }
}
}
////Extinguishing numbers and digits
function Lampki_OFF() {
  for (var i = 0; i <= 9; i++) {
    var liczba = document.getElementById('liczb' + i);
    var litera = document.getElementById('litr' + i);
    if (liczba.classList.contains("light1") || litera.classList.contains("light1")) {
      liczba.classList.replace("light1", "lightA");
      litera.classList.replace("light1", "lightA");
    }
  }
}
////Covering the squares around the ones we chose as those with the ship after clicking on them
function round_round(nr) {

    var Variable1 = document.getElementById('pold' + (nr + 1));
    if ((nr + 1) % 10 != 1) {
      Variable1.classList.replace('square', 'empty'); 
    }
    var Variable2 = document.getElementById('pold' + (nr - 1));
    if ((nr - 1) % 10 != 0) {
      Variable2.classList.replace('square', 'empty');
    }
    var Variable3 = document.getElementById('pold' + (nr + 10));
    if (nr + 10 <= list.length) {
        Variable3.classList.replace('square', 'empty');
    }
    var Variable4 = document.getElementById('pold' + (nr - 10));
    if (nr - 10 >= 1) {
        Variable4.classList.replace('square', 'empty');
    }
    var Variable5 = document.getElementById('pold' + (nr - 9));
    if (nr - 9 >= 1 && (nr - 9) % 10 != 1) {
        Variable5.classList.replace('square', 'empty');
    }
    var Variable6 = document.getElementById('pold' + (nr - 11));
    if (nr - 11 >= 1 && (nr - 11) % 10 != 0) {
        Variable6.classList.replace('square', 'empty');
    }
    var Variable7 = document.getElementById('pold' + (nr + 11));
    if (nr + 11 <= list.length && (nr + 11) % 10 != 1) {
        Variable7.classList.replace('square', 'empty');
    }
    var Variable8 = document.getElementById('pold' + (nr + 9));
    if (nr + 9 <= list.length && (nr + 9) % 10 != 0) {
        Variable8.classList.replace('square', 'empty');
    }
  }
////Single ship selection
  function single_steal(nr) {
  var Variable1 = document.getElementById('pold' + nr);
  if (Variable1.classList.contains("square")) {
  Variable1.classList.replace("square", "squareship_to_select");
  Variable1.addEventListener('click', function() {
    function Dama1() {
      Variable1.classList.replace("squareship_to_select", "ship");
      round_round(nr);
    };
    Dama1();
    Counter1++;
    if (Counter1 >= 4) {
      single_steal = function () {};
    }
  });
  }
  }
////Selection of a double ship - function inside expliained 
  function double_steal_vertical(nr) {

    var Variable1 = document.getElementById('pold' + nr);
    var Variable2 = document.getElementById('pold' + (nr + 10));
    var Variable3 = document.getElementById('pold' + (nr - 10));
  
    if (nr <= 90 && Variable1.classList.contains("square") && Variable2.classList.contains("square")) {
      Variable1.classList.replace("square", "squareship_to_select");
      Variable2.classList.replace("square", "squareship_to_select");    
      ////Clicking on a selected ship permanently selects a location for the ship 
        Variable1.addEventListener('click', function() {
            function Dama2() {
              Variable1.classList.replace("squareship_to_select", "ship1_vertical");
              Variable2.classList.replace("squareship_to_select", "ship3_vertical");
              round_round(nr);
              round_round(nr + 10)
            };
            Dama2();
            ////In addition, there are counters that increase after adding ships, there is a certain amount of them.
          Counter2++;
          if (Counter2 >= 3) {
            double_steal_vertical = function () {};
          }
      });
      
    }
  
    if ((nr > 90) && Variable1.classList.contains("square") && Variable3.classList.contains("square")) {
      Variable1.classList.replace("square", "squareship_to_select");
      Variable3.classList.replace("square", "squareship_to_select");  
      ////Clicking on a selected ship permanently selects a location for the ship 
        Variable1.addEventListener('click', function() {
          function Dama3() {
            Variable1.classList.replace("squareship_to_select", "ship3_vertical");
            Variable3.classList.replace("squareship_to_select", "ship1_vertical");
            round_round(nr);
            round_round(nr - 10)
          };
          Dama3();
          ////In addition, there are counters that increase after adding ships, there is a certain amount of them.
          Counter2++;
          if (Counter2 >= 3) {
            double_steal_vertical = function () {};
          }
      });
      
      
    }
    
  }
/////Selection of a double ship
  function double_steal_flat(nr) {
    var Variable1 = document.getElementById('pold' + nr);
    var Variable8 = document.getElementById('pold' + (nr + 1));
    var Variable9 = document.getElementById('pold' + (nr - 1));
  
        if (nr % 10 <= 9 && nr % 10 >= 1 && Variable1.classList.contains("square") && Variable8.classList.contains("square")) {
          Variable1.classList.replace("square", "squareship_to_select");
          Variable8.classList.replace("square", "squareship_to_select");           
              Variable1.addEventListener('click', function() {
                function Dama4() {
                  Variable1.classList.replace("squareship_to_select", "ship3_flat");
                  Variable8.classList.replace("squareship_to_select", "ship1_flat");
                  round_round(nr);
                  round_round(nr + 1)
                  };
                  Dama4();
                Counter2++;
                if (Counter2 >= 3) {
                  double_steal_flat = function () {};
                }
              
            });
            
      
        } if (nr % 10 == 0 && Variable1.classList.contains("square") && Variable9.classList.contains("square")) {
          Variable1.classList.replace("square", "squareship_to_select");
          Variable9.classList.replace("square", "squareship_to_select");
              Variable1.addEventListener('click', function() {
                function Dama5() {
                  Variable1.classList.replace("squareship_to_select", "ship1_flat");
                  Variable9.classList.replace("squareship_to_select", "ship3_flat");
                  round_round(nr);
                  round_round(nr - 1)
                  };
                  Dama5();
                  Counter2++;
                  if (Counter2 >= 3) {
                    double_steal_flat = function () {};
                  }                  
              });       
        }    
  }
////Triple ship selection
  function triple_steal_vertical(nr) {
  
    var Variable1 = document.getElementById('pold' + nr);
    var Variable2 = document.getElementById('pold' + (nr + 10));
    var Variable3 = document.getElementById('pold' + (nr - 10));
    var Variable4 = document.getElementById('pold' + (nr + 20));
    var Variable5 = document.getElementById('pold' + (nr - 20));
  
        if (nr <= 80 && Variable1.classList.contains("square") && Variable2.classList.contains("square") && Variable4.classList.contains("square")) {
          Variable1.classList.replace("square", "squareship_to_select");
          Variable2.classList.replace("square", "squareship_to_select");
          Variable4.classList.replace("square", "squareship_to_select");
          Variable1.addEventListener('click', function() {
            function Dama6() {
              Variable1.classList.replace("squareship_to_select", "ship1_vertical");
              Variable2.classList.replace("squareship_to_select", "ship2_vertical");
              Variable4.classList.replace("squareship_to_select", "ship3_vertical");
              round_round(nr);
              round_round(nr + 10)
              round_round(nr +20)
            };
            Dama6();
            Counter3++;
            if (Counter3 >= 2) {
              triple_steal_vertical = function () {};
            }
          });
               
        } if ((nr + 20 > 100 && nr + 10 <= 100) && Variable1.classList.contains("square") && Variable2.classList.contains("square") && Variable3.classList.contains("square")) {
          Variable1.classList.replace("square", "squareship_to_select");
          Variable2.classList.replace("square", "squareship_to_select");
          Variable3.classList.replace("square", "squareship_to_select");
          Variable1.addEventListener('click', function() {
            
            function Dama7() {
              Variable1.classList.replace("squareship_to_select", "ship2_vertical");
              Variable2.classList.replace("squareship_to_select", "ship3_vertical");
              Variable3.classList.replace("squareship_to_select", "ship1_vertical");
              round_round(nr);
              round_round(nr + 10)
              round_round(nr - 10)
            };
            Dama7();
            Counter3++;
            if (Counter3 >= 2) {
              triple_steal_vertical = function () {};
            }
          }); 
  
        } if ((nr + 20 > 100 && nr + 10 > 100) && Variable1.classList.contains("square") && Variable3.classList.contains("square") && Variable5.classList.contains("square")) {
          Variable1.classList.replace("square", "squareship_to_select");
          Variable3.classList.replace("square", "squareship_to_select");
          Variable5.classList.replace("square", "squareship_to_select");
          Variable1.addEventListener('click', function() {
            function Dama8() {
              Variable1.classList.replace("squareship_to_select", "ship3_vertical");
              Variable3.classList.replace("squareship_to_select", "ship2_vertical");
              Variable5.classList.replace("squareship_to_select", "ship1_vertical");
              round_round(nr);
              round_round(nr - 10)
              round_round(nr - 20)
            };
            Dama8();
            Counter3++;
            if (Counter3 >= 2) {
              triple_steal_vertical = function () {};
            }
          });
        }
  }
////Triple ship selection
  function triple_steal_flat(nr) {
  
      var Variable1 = document.getElementById('pold' + nr);
      var Variable8 = document.getElementById('pold' + (nr + 1));
      var Variable9 = document.getElementById('pold' + (nr - 1));
      var Variable10 = document.getElementById('pold' + (nr + 2));
      var Variable11 = document.getElementById('pold' + (nr - 2));
    
    
          if (nr % 10 <= 8 && nr % 10 >= 1 && Variable1.classList.contains("square") && Variable8.classList.contains("square") && Variable10.classList.contains("square")) {
            Variable1.classList.replace("square", "squareship_to_select");
            Variable8.classList.replace("square", "squareship_to_select");
            Variable10.classList.replace("square", "squareship_to_select");
              Variable1.addEventListener('click', function() {
                function Dama9() {
                  Variable1.classList.replace("squareship_to_select", "ship3_flat");
                  Variable8.classList.replace("squareship_to_select", "ship2_flat");
                  Variable10.classList.replace("squareship_to_select", "ship1_flat");
                  round_round(nr);
                  round_round(nr + 1)
                  round_round(nr + 2)
                 };
                Dama9();
                Counter3++;
                if (Counter3 >= 2) {
                  triple_steal_flat = function () {};
                }
              });
              
        
          } if (nr % 10 == 9 && Variable1.classList.contains("square") && Variable8.classList.contains("square") && Variable9.classList.contains("square")) {
              Variable1.classList.replace("square", "squareship_to_select");
              Variable8.classList.replace("square", "squareship_to_select");
              Variable9.classList.replace("square", "squareship_to_select");
              Variable1.addEventListener('click', function() {
                function Dama10() {
                  Variable1.classList.replace("squareship_to_select", "ship2_flat");
                  Variable8.classList.replace("squareship_to_select", "ship1_flat");
                  Variable9.classList.replace("squareship_to_select", "ship3_flat");
                  round_round(nr);
                  round_round(nr + 1)
                  round_round(nr - 1)
                };           
                Dama10();
                Counter3++;
                if (Counter3 >= 2) {
                  triple_steal_flat = function () {};
                }
              });
              
        
          } if (nr % 10 == 0 && Variable1.classList.contains("square") && Variable9.classList.contains("square") && Variable11.classList.contains("square")) {
              Variable1.classList.replace("square", "squareship_to_select");
              Variable9.classList.replace("square", "squareship_to_select");
              Variable11.classList.replace("square", "squareship_to_select");
              Variable1.addEventListener('click', function() {
                function Dama11() {
                  Variable1.classList.replace("squareship_to_select", "ship1_flat");
                  Variable9.classList.replace("squareship_to_select", "ship2_flat");
                  Variable11.classList.replace("squareship_to_select", "ship3_flat");
                  round_round(nr);
                  round_round(nr - 1)
                  round_round(nr - 2)
                  };
                  Dama11();
                Counter3++;
                if (Counter3 >= 2) {
                  triple_steal_flat = function () {};
                }
               });       
          }
  }
////Choice of quadruple ship
  function quadruple_steal_vertical(nr) {
  
    var Variable1 = document.getElementById('pold' + nr);
    var Variable2 = document.getElementById('pold' + (nr + 10));
    var Variable3 = document.getElementById('pold' + (nr - 10));
    var Variable4 = document.getElementById('pold' + (nr + 20));
    var Variable5 = document.getElementById('pold' + (nr - 20));
    var Variable6 = document.getElementById('pold' + (nr + 30));
    var Variable7 = document.getElementById('pold' + (nr - 30));
  
        if (nr <= 70 && Variable1.classList.contains("square") && Variable2.classList.contains("square") && Variable4.classList.contains("square") && Variable6.classList.contains("square")) {
          Variable1.classList.replace("square", "squareship_to_select");
          Variable2.classList.replace("square", "squareship_to_select");
          Variable4.classList.replace("square", "squareship_to_select");
          Variable6.classList.replace("square", "squareship_to_select");
          Variable1.addEventListener('click', function() {
            function Dama12() {
              Variable1.classList.replace("squareship_to_select", "ship1_vertical");
              Variable2.classList.replace("squareship_to_select", "ship2_vertical");
              Variable4.classList.replace("squareship_to_select", "ship2_vertical");
              Variable6.classList.replace("squareship_to_select", "ship3_vertical");
              round_round(nr);
              round_round(nr + 10)
              round_round(nr + 20)
              round_round(nr + 30)
            };
            Dama12();
            Counter4++;
            if (Counter4 >= 1) {
              quadruple_steal_vertical = function () {};
            }
          });
               
        } if ((nr + 30 > 100 && nr + 20 > 100 && nr + 10 <= 100) && Variable1.classList.contains("square") && Variable2.classList.contains("square") && Variable3.classList.contains("square") && Variable5.classList.contains("square")) {
          Variable1.classList.replace("square", "squareship_to_select");
          Variable2.classList.replace("square", "squareship_to_select");
          Variable3.classList.replace("square", "squareship_to_select");
          Variable5.classList.replace("square", "squareship_to_select");
          Variable1.addEventListener('click', function() {
            function Dama13() {
              Variable1.classList.replace("squareship_to_select", "ship2_vertical");
              Variable2.classList.replace("squareship_to_select", "ship3_vertical");
              Variable3.classList.replace("squareship_to_select", "ship2_vertical");
              Variable5.classList.replace("squareship_to_select", "ship1_vertical");
              round_round(nr);
              round_round(nr + 10)
              round_round(nr - 10)
              round_round(nr - 20)
            };
            Dama13();
            Counter4++;
            if (Counter4 >= 1) {
              quadruple_steal_vertical = function () {};
            }
          }); 
  
        } if ((nr + 30 > 100 && nr + 20 > 100 && nr + 10 > 100) && Variable1.classList.contains("square") && Variable3.classList.contains("square") && Variable5.classList.contains("square") && Variable7.classList.contains("square")) {
          Variable1.classList.replace("square", "squareship_to_select");
          Variable3.classList.replace("square", "squareship_to_select");
          Variable5.classList.replace("square", "squareship_to_select");
          Variable7.classList.replace("square", "squareship_to_select");
          Variable1.addEventListener('click', function() {
            function Dama14() {
              Variable1.classList.replace("squareship_to_select", "ship3_vertical");
              Variable3.classList.replace("squareship_to_select", "ship2_vertical");
              Variable5.classList.replace("squareship_to_select", "ship2_vertical");
              Variable7.classList.replace("squareship_to_select", "ship1_vertical");
              round_round(nr);
              round_round(nr - 10)
              round_round(nr - 20)
              round_round(nr - 30)
            };
            Dama14();
            Counter4++;
            if (Counter4 >= 1) {
              quadruple_steal_vertical = function () {};
            }
          });
  
        } if ((nr + 30 > 100 && nr + 20 <= 100 && nr + 10 < 100) && Variable1.classList.contains("square") && Variable2.classList.contains("square") && Variable4.classList.contains("square") && Variable3.classList.contains("square")) {
          Variable1.classList.replace("square", "squareship_to_select");
          Variable2.classList.replace("square", "squareship_to_select");
          Variable4.classList.replace("square", "squareship_to_select");
          Variable3.classList.replace("square", "squareship_to_select");
          Variable1.addEventListener('click', function() {
            function Dama15() {
              Variable1.classList.replace("squareship_to_select", "ship2_vertical");
              Variable2.classList.replace("squareship_to_select", "ship2_vertical");
              Variable4.classList.replace("squareship_to_select", "ship3_vertical");
              Variable3.classList.replace("squareship_to_select", "ship1_vertical");
              round_round(nr);
              round_round(nr + 10)
              round_round(nr + 20)
              round_round(nr - 10)
            };
            Dama15();
            Counter4++;
            if (Counter4 >= 1) {
              quadruple_steal_vertical = function () {};
            }
          });
        }
  }
////Choice of quadruple ship
  function quadruple_steal_flat(nr) {
  
    var Variable1 = document.getElementById('pold' + nr);
    var Variable8 = document.getElementById('pold' + (nr + 1));
    var Variable9 = document.getElementById('pold' + (nr - 1));
    var Variable10 = document.getElementById('pold' + (nr + 2));
    var Variable11 = document.getElementById('pold' + (nr - 2));
    var Variable12 = document.getElementById('pold' + (nr + 3));
    var Variable13 = document.getElementById('pold' + (nr - 3));
  
  
        if (nr % 10 <= 7 && nr % 10 >= 1 && Variable1.classList.contains("square") && Variable8.classList.contains("square") && Variable10.classList.contains("square") && Variable12.classList.contains("square")) {
          Variable1.classList.replace("square", "squareship_to_select");
          Variable8.classList.replace("square", "squareship_to_select");
          Variable10.classList.replace("square", "squareship_to_select");
          Variable12.classList.replace("square", "squareship_to_select");
            Variable1.addEventListener('click', function() {
              function Dama16() {
                Variable1.classList.replace("squareship_to_select", "ship3_flat");
                Variable8.classList.replace("squareship_to_select", "ship2_flat");
                Variable10.classList.replace("squareship_to_select", "ship2_flat");
                Variable12.classList.replace("squareship_to_select", "ship1_flat");
                round_round(nr);
                round_round(nr + 1);
                round_round(nr + 2);
                round_round(nr + 3);
               };
              Dama16();
              Counter4++;
              if (Counter4 >= 1) {
                quadruple_steal_flat = function () {};
              }
            });
            
      
        } if (nr % 10 == 8 && Variable1.classList.contains("square") && Variable8.classList.contains("square") && Variable9.classList.contains("square") && Variable10.classList.contains("square")) {
          Variable1.classList.replace("square", "squareship_to_select");
          Variable8.classList.replace("square", "squareship_to_select");
          Variable9.classList.replace("square", "squareship_to_select");
          Variable10.classList.replace("square", "squareship_to_select");
          Variable1.addEventListener('click', function() {
            
            function Dama17() {
              Variable1.classList.replace("squareship_to_select", "ship2_flat");
              Variable8.classList.replace("squareship_to_select", "ship2_flat");
              Variable9.classList.replace("squareship_to_select", "ship3_flat");
              Variable10.classList.replace("squareship_to_select", "ship1_flat");
              round_round(nr);
              round_round(nr + 1);
              round_round(nr - 1);
              round_round(nr + 2);
            };           
            Dama17();
            Counter4++;
            if (Counter4 >= 1) {
              quadruple_steal_flat = function () {};
            }
          });
          
    
        } if (nr % 10 == 9 && Variable1.classList.contains("square") && Variable8.classList.contains("square") && Variable9.classList.contains("square") && Variable11.classList.contains("square")) {
            Variable1.classList.replace("square", "squareship_to_select");
            Variable8.classList.replace("square", "squareship_to_select");
            Variable9.classList.replace("square", "squareship_to_select");
            Variable11.classList.replace("square", "squareship_to_select");
            Variable1.addEventListener('click', function() {
              function Dama18() {
                Variable1.classList.replace("squareship_to_select", "ship2_flat");
                Variable8.classList.replace("squareship_to_select", "ship1_flat");
                Variable9.classList.replace("squareship_to_select", "ship2_flat");
                Variable11.classList.replace("squareship_to_select", "ship3_flat");
                round_round(nr);
                round_round(nr + 1)
                round_round(nr - 1)
                round_round(nr - 2)
              };           
              Dama18();
              Counter4++;
              if (Counter4 >= 1) {
                quadruple_steal_flat = function () {};
              }
            });
            
      
        } if (nr % 10 == 0 && Variable1.classList.contains("square") && Variable9.classList.contains("square") && Variable11.classList.contains("square") && Variable13.classList.contains("square")) {
            Variable1.classList.replace("square", "squareship_to_select");
            Variable9.classList.replace("square", "squareship_to_select");
            Variable11.classList.replace("square", "squareship_to_select");
            Variable13.classList.replace("square", "squareship_to_select");
            Variable1.addEventListener('click', function() {
              function Dama19() {
                Variable1.classList.replace("squareship_to_select", "ship1_flat");
                Variable9.classList.replace("squareship_to_select", "ship2_flat");
                Variable11.classList.replace("squareship_to_select", "ship2_flat");
                Variable13.classList.replace("squareship_to_select", "ship3_flat");
                round_round(nr);
                round_round(nr - 1)
                round_round(nr - 2)
                round_round(nr - 3)
              };
              Dama19();
              Counter4++;
              if (Counter4 >= 1) {
                quadruple_steal_flat = function () {};
              }
             });       
        }
  }
  ////////gaszenie pol    
  function turnoff_sun_() {
    for (var nr = 1; nr <= list.length; nr++) {
      var Variable1 = document.getElementById('pold' + nr);
      if (Variable1.classList.contains("squareship_to_select")) {
        Variable1.classList.replace("squareship_to_select", "square");
      }
    }
  }

var Switch1 = true;
var Counter1 = 0;
var Counter2 = 0;
var Counter3 = 0;
var Counter4 = 0;

function changes() {
  if (Switch1) {
    Switch1 = false;
    
  } else {
    Switch1 = true;
    
  }
}
////A function that makes ship selection possible horizontally or vertically. 
function Highlighting_fields(nr) {
  if (Switch1) {
    if (Counter4 < 1) {
      quadruple_steal_flat(nr);
     } if (Counter3 < 2 && Counter4 >= 1) {     
      triple_steal_flat(nr);
        } if (Counter2 < 3 && Counter3 >= 2) {
      double_steal_flat(nr);
          } if (Counter1 < 4 && Counter2 >= 3) {
            single_steal(nr);
          }
        
  } else {
      if (Counter4 < 1) {
        quadruple_steal_vertical(nr);
        } if (Counter3 < 2 && Counter4 >= 1) {
          triple_steal_vertical(nr);
          } if (Counter2 < 3 && Counter3 >= 2) {
            double_steal_vertical(nr);
            } if (Counter1 < 4 && Counter2 >= 3) {
              single_steal(nr);
            }
          }
  if (Counter1 >= 4) {
    Take_off_water_z_plansza2();
    cross();
  }
        

}
////One-time change of classes of the second board to be able to choose ships
function Take_off_water_z_plansza2() {
  for (var nr = 1; nr <= list.length; nr++) {
    var Variable1 = document.getElementById('poldA' + nr);
    Variable1.classList.replace("cross", "square")
    }
  }
////One-time change of classes of the second board to be able to choose ships
function cross() {
  for (var nr = 1; nr <= list.length; nr++) {
    var Variable1 = document.getElementById('pold' + nr);
    Variable1.classList.add("cross")
  }
}
 var rotation = document.getElementById("rotation");
  rotation.addEventListener("click", changes);

var rotation2 = document.getElementById("rotation2");
rotation2.addEventListener("click", changesA);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Now the second board, all functions are the same 
function board_creation_A() {
  var tresc_diva = "";

  for (var i = 0; i < list.length; i++) {
    var nazwa_diva = "poldA" + (i + 1);
    tresc_diva += '<div class="cross" id="' + nazwa_diva + '">' + list[i] + '</div>';
    if ((i + 1) % 10 == 0) {
      tresc_diva += '<div style="clear:both;"></div>';
    }
  }

  document.getElementById("box2").innerHTML = tresc_diva;
}

function numb_creation_A() {
  var tresc_diva_numbers = "";

  for (var i = 0; i < numbers.length; i++) {
    var nazwa_liczb = "liczbA" + i;
    tresc_diva_numbers += '<div class="lightA" id="' + nazwa_liczb + '">' + numbers[i] + '</div>';
  }

  document.getElementById("numbers2").innerHTML = tresc_diva_numbers;
}

function lett_creation_A() {
  var tresc_diva_letters = "";

  for (var i = 0; i < letters.length; i++) {
    var nazwa_litr = "litrA" + i;
    tresc_diva_letters += '<div class="lightA" id="' + nazwa_litr + '">' + letters[i] + '</div>';
  }

  document.getElementById("letters2").innerHTML = tresc_diva_letters;
}




numb_creation_A();
lett_creation_A();
board_creation_A();

function Lampki_ONA() {
  for (var nr = 0; nr <= 99; nr++) {
    for (var i = 0; i <= 9; i++) {
      var list = document.getElementById('poldA' + (nr + 1));
      var liczba = document.getElementById('liczbA' + i);
      var litera = document.getElementById('litrA' + i);
      if (list.classList.contains("squareship_to_select")) {
        if (nr % 10 == i) {  
          litera.classList.replace("lightA", "light1");
        }        
        if ((nr - (nr % 10))/10 == i) {
          liczba.classList.replace("lightA", "light1");
        }
      }
    }
  }
}

function Lampki_OFFA() {
  for (var i = 0; i <= 9; i++) {
    var liczba = document.getElementById('liczbA' + i);
    var litera = document.getElementById('litrA' + i);
    if (liczba.classList.contains("light1") || litera.classList.contains("light1")) {
      liczba.classList.replace("light1", "lightA");
      litera.classList.replace("light1", "lightA");
    }
  }
}

function round_roundA(nr) {
  if ((nr + 1) % 10 !== 1) {
    var prawe_list = document.getElementById('poldA' + (nr + 1));
    prawe_list.classList.replace('square', 'empty');
  }
  if ((nr - 1) % 10 !== 0) {
    var lewe_list = document.getElementById('poldA' + (nr - 1));
    lewe_list.classList.replace('square', 'empty');
  }
  var dolne_list = document.getElementById('poldA' + (nr + 10));
  if (nr + 10 <= list.length) {
    dolne_list.classList.replace('square', 'empty');
  }
  var gorne_list = document.getElementById('poldA' + (nr - 10));
  if (nr - 10 >= 1) {
    gorne_list.classList.replace('square', 'empty');
  }
  var gorne_list_prawe = document.getElementById('poldA' + (nr - 9));
  if (nr - 9 >= 1 && (nr - 9) % 10 !== 1) {
    gorne_list_prawe.classList.replace('square', 'empty');
  }
  var gorne_list_lewe = document.getElementById('poldA' + (nr - 11));
  if (nr - 11 >= 1 && (nr - 11) % 10 !== 0) {
    gorne_list_lewe.classList.replace('square', 'empty');
  }
  var dolne_list_prawe = document.getElementById('poldA' + (nr + 11));
  if (nr + 11 <= list.length && (nr + 11) % 10 !== 1) {
    dolne_list_prawe.classList.replace('square', 'empty');
  }
  var dolne_list_lewe = document.getElementById('poldA' + (nr + 9));
  if (nr + 9 <= list.length && (nr + 9) % 10 !== 0) {
    dolne_list_lewe.classList.replace('square', 'empty');
  }
}


function single_stealA(nr) {
  var Variable1 = document.getElementById('poldA' + nr);
  if (Variable1.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama20() {
        Variable1.classList.replace("squareship_to_select", "ship");
        round_roundA(nr);
      };
      Dama20();
      Counter1A++;
      if (Counter1A >= 4) {
        single_stealA = function () {};
      }
    });
  }
}

function double_steal_verticalA(nr) {
  var Variable1 = document.getElementById('poldA' + nr);
  var Variable2 = document.getElementById('poldA' + (nr + 10));
  var Variable3 = document.getElementById('poldA' + (nr - 10));

  if (nr <= 90 && Variable1.classList.contains("square") && Variable2.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable2.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama21() {
        Variable1.classList.replace("squareship_to_select", "ship1_vertical");
        Variable2.classList.replace("squareship_to_select", "ship3_vertical");
        round_roundA(nr);
        round_roundA(nr + 10);
      }
      Dama21();
      Counter2A++;
      if (Counter2A >= 3) {
        double_steal_verticalA = function() {};
      }
    });
  }

  if ((nr > 90) && Variable1.classList.contains("square") && Variable3.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable3.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama22() {
        Variable1.classList.replace("squareship_to_select", "ship3_vertical");
        Variable3.classList.replace("squareship_to_select", "ship1_vertical");
        round_roundA(nr);
        round_roundA(nr - 10);
      }
      Dama22();
      Counter2A++;
      if (Counter2A >= 3) {
        double_steal_verticalA = function() {};
      }
    });
  }
}

function double_steal_flatA(nr) {
  var Variable1 = document.getElementById('poldA' + nr);
  var Variable8 = document.getElementById('poldA' + (nr + 1));
  var Variable9 = document.getElementById('poldA' + (nr - 1));

  if (nr % 10 <= 9 && nr % 10 >= 1 && Variable1.classList.contains("square") && Variable8.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable8.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama23() {
        Variable1.classList.replace("squareship_to_select", "ship3_flat");
        Variable8.classList.replace("squareship_to_select", "ship1_flat");
        round_roundA(nr);
        round_roundA(nr + 1);
      }
      Dama23();
      Counter2A++;
      if (Counter2A >= 3) {
        double_steal_flatA = function() {};
      }
    });
  }

  if (nr % 10 == 0 && Variable1.classList.contains("square") && Variable9.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable9.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama24() {
        Variable1.classList.replace("squareship_to_select", "ship1_flat");
        Variable9.classList.replace("squareship_to_select", "ship3_flat");
        round_roundA(nr);
        round_roundA(nr - 1);
      }
      Dama24();
      Counter2A++;
      if (Counter2A >= 3) {
        double_steal_flatA = function() {};
      }
    });
  }
}

function triple_steal_verticalA(nr) {
  var Variable1 = document.getElementById('poldA' + nr);
  var Variable2 = document.getElementById('poldA' + (nr + 10));
  var Variable3 = document.getElementById('poldA' + (nr - 10));
  var Variable4 = document.getElementById('poldA' + (nr + 20));
  var Variable5 = document.getElementById('poldA' + (nr - 20));

  if (nr <= 80 && Variable1.classList.contains("square") && Variable2.classList.contains("square") && Variable4.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable2.classList.replace("square", "squareship_to_select");
    Variable4.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama25() {
        Variable1.classList.replace("squareship_to_select", "ship1_vertical");
        Variable2.classList.replace("squareship_to_select", "ship2_vertical");
        Variable4.classList.replace("squareship_to_select", "ship3_vertical");
        round_roundA(nr);
        round_roundA(nr + 10);
        round_roundA(nr + 20);
      }
      Dama25();
      Counter3A++;
      if (Counter3A >= 2) {
        triple_steal_verticalA = function() {};
      }
    });

  } else if ((nr + 20 > 100 && nr + 10 <= 100) && Variable1.classList.contains("square") && Variable2.classList.contains("square") && Variable3.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable2.classList.replace("square", "squareship_to_select");
    Variable3.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama26() {
        Variable1.classList.replace("squareship_to_select", "ship2_vertical");
        Variable2.classList.replace("squareship_to_select", "ship3_vertical");
        Variable3.classList.replace("squareship_to_select", "ship1_vertical");
        round_roundA(nr);
        round_roundA(nr + 10);
        round_roundA(nr - 10);
      }
      Dama26();
      Counter3A++;
      if (Counter3A >= 2) {
        triple_steal_verticalA = function() {};
      }
    });

  } else if ((nr + 20 > 100 && nr + 10 > 100) && Variable1.classList.contains("square") && Variable3.classList.contains("square") && Variable5.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable3.classList.replace("square", "squareship_to_select");
    Variable5.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama27() {
        Variable1.classList.replace("squareship_to_select", "ship3_vertical");
        Variable3.classList.replace("squareship_to_select", "ship2_vertical");
        Variable5.classList.replace("squareship_to_select", "ship1_vertical");
        round_roundA(nr);
        round_roundA(nr - 10);
        round_roundA(nr - 20);
      }
      Dama27();
      Counter3A++;
      if (Counter3A >= 2) {
        triple_steal_verticalA = function() {};
      }
    });
  }
}

function triple_steal_flatA(nr) {
  var Variable1 = document.getElementById('poldA' + nr);
  var Variable8 = document.getElementById('poldA' + (nr + 1));
  var Variable9 = document.getElementById('poldA' + (nr - 1));
  var Variable10 = document.getElementById('poldA' + (nr + 2));
  var Variable11 = document.getElementById('poldA' + (nr - 2));

  if (nr % 10 <= 8 && nr % 10 >= 1 && Variable1.classList.contains("square") && Variable8.classList.contains("square") && Variable10.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable8.classList.replace("square", "squareship_to_select");
    Variable10.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama28() {
        Variable1.classList.replace("squareship_to_select", "ship3_flat");
        Variable8.classList.replace("squareship_to_select", "ship2_flat");
        Variable10.classList.replace("squareship_to_select", "ship1_flat");
        round_roundA(nr);
        round_roundA(nr + 1);
        round_roundA(nr + 2);
      }
      Dama28();
      Counter3A++;
      if (Counter3A >= 2) {
        triple_steal_flatA = function() {};
      }
    });

  } else if (nr % 10 == 9 && Variable1.classList.contains("square") && Variable8.classList.contains("square") && Variable9.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable8.classList.replace("square", "squareship_to_select");
    Variable9.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama29() {
        Variable1.classList.replace("squareship_to_select", "ship2_flat");
        Variable8.classList.replace("squareship_to_select", "ship1_flat");
        Variable9.classList.replace("squareship_to_select", "ship3_flat");
        round_roundA(nr);
        round_roundA(nr + 1);
        round_roundA(nr - 1);
      }
      Dama29();
      Counter3A++;
      if (Counter3A >= 2) {
        triple_steal_flatA = function() {};
      }
    });

  } else if (nr % 10 == 0 && Variable1.classList.contains("square") && Variable9.classList.contains("square") && Variable11.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable9.classList.replace("square", "squareship_to_select");
    Variable11.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama30() {
        Variable1.classList.replace("squareship_to_select", "ship1_flat");
        Variable9.classList.replace("squareship_to_select", "ship2_flat");
        Variable11.classList.replace("squareship_to_select", "ship3_flat");
        round_roundA(nr);
        round_roundA(nr - 1);
        round_roundA(nr - 2);
      }
      Dama30();
      Counter3A++;
      if (Counter3A >= 2) {
        triple_steal_flatA = function() {};
      }
    });
  }
}

function quadruple_steal_verticalA(nr) {
  var Variable1 = document.getElementById('poldA' + nr);
  var Variable2 = document.getElementById('poldA' + (nr + 10));
  var Variable3 = document.getElementById('poldA' + (nr - 10));
  var Variable4 = document.getElementById('poldA' + (nr + 20));
  var Variable5 = document.getElementById('poldA' + (nr - 20));
  var Variable6 = document.getElementById('poldA' + (nr + 30));
  var Variable7 = document.getElementById('poldA' + (nr - 30));

  if (nr <= 70 && Variable1.classList.contains("square") && Variable2.classList.contains("square") && Variable4.classList.contains("square") && Variable6.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable2.classList.replace("square", "squareship_to_select");
    Variable4.classList.replace("square", "squareship_to_select");
    Variable6.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama31() {
        Variable1.classList.replace("squareship_to_select", "ship1_vertical");
        Variable2.classList.replace("squareship_to_select", "ship2_vertical");
        Variable4.classList.replace("squareship_to_select", "ship2_vertical");
        Variable6.classList.replace("squareship_to_select", "ship3_vertical");
        round_roundA(nr);
        round_roundA(nr + 10);
        round_roundA(nr + 20);
        round_roundA(nr + 30);
      }
      Dama31();
      Counter4A++;
      if (Counter4A >= 1) {
        quadruple_steal_verticalA = function() {};
      }
    });

  } else if ((nr + 30 > 100 && nr + 20 > 100 && nr + 10 <= 100) && Variable1.classList.contains("square") && Variable2.classList.contains("square") && Variable3.classList.contains("square") && Variable5.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable2.classList.replace("square", "squareship_to_select");
    Variable3.classList.replace("square", "squareship_to_select");
    Variable5.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama32() {
        Variable1.classList.replace("squareship_to_select", "ship2_vertical");
        Variable2.classList.replace("squareship_to_select", "ship3_vertical");
        Variable3.classList.replace("squareship_to_select", "ship2_vertical");
        Variable5.classList.replace("squareship_to_select", "ship1_vertical");
        round_roundA(nr);
        round_roundA(nr + 10);
        round_roundA(nr - 10);
        round_roundA(nr - 20);
      }
      Dama32();
      Counter4A++;
      if (Counter4A >= 1) {
        quadruple_steal_verticalA = function() {};
      }
    });

  } else if ((nr + 30 > 100 && nr + 20 > 100 && nr + 10 > 100) && Variable1.classList.contains("square") && Variable3.classList.contains("square") && Variable5.classList.contains("square") && Variable7.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable3.classList.replace("square", "squareship_to_select");
    Variable5.classList.replace("square", "squareship_to_select");
    Variable7.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama33() {
        Variable1.classList.replace("squareship_to_select", "ship3_vertical");
        Variable3.classList.replace("squareship_to_select", "ship2_vertical");
        Variable5.classList.replace("squareship_to_select", "ship2_vertical");
        Variable7.classList.replace("squareship_to_select", "ship1_vertical");
        round_roundA(nr);
        round_roundA(nr - 10);
        round_roundA(nr - 20);
        round_roundA(nr - 30);
      }
      Dama33();
      Counter4A++;
      if (Counter4A >= 1) {
        quadruple_steal_verticalA = function() {};
      }
    });

  } else if ((nr + 30 > 100 && nr + 20 <= 100 && nr + 10 < 100) && Variable1.classList.contains("square") && Variable2.classList.contains("square") && Variable4.classList.contains("square") && Variable3.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable2.classList.replace("square", "squareship_to_select");
    Variable4.classList.replace("square", "squareship_to_select");
    Variable3.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama34() {
        Variable1.classList.replace("squareship_to_select", "ship2_vertical");
        Variable2.classList.replace("squareship_to_select", "ship2_vertical");
        Variable4.classList.replace("squareship_to_select", "ship3_vertical");
        Variable3.classList.replace("squareship_to_select", "ship1_vertical");
        round_roundA(nr);
        round_roundA(nr + 10);
        round_roundA(nr + 20);
        round_roundA(nr - 10);
      }
      Dama34();
      Counter4A++;
      if (Counter4A >= 1) {
        quadruple_steal_verticalA = function() {};
      }
    });
  }
}

function quadruple_steal_flatA(nr) {
  var Variable1 = document.getElementById('poldA' + nr);
  var Variable8 = document.getElementById('poldA' + (nr + 1));
  var Variable9 = document.getElementById('poldA' + (nr - 1));
  var Variable10 = document.getElementById('poldA' + (nr + 2));
  var Variable11 = document.getElementById('poldA' + (nr - 2));
  var Variable12 = document.getElementById('poldA' + (nr + 3));
  var Variable13 = document.getElementById('poldA' + (nr - 3));

  if (nr % 10 <= 7 && nr % 10 >= 1 && Variable1.classList.contains("square") && Variable8.classList.contains("square") && Variable10.classList.contains("square") && Variable12.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable8.classList.replace("square", "squareship_to_select");
    Variable10.classList.replace("square", "squareship_to_select");
    Variable12.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama35() {
        Variable1.classList.replace("squareship_to_select", "ship3_flat");
        Variable8.classList.replace("squareship_to_select", "ship2_flat");
        Variable10.classList.replace("squareship_to_select", "ship2_flat");
        Variable12.classList.replace("squareship_to_select", "ship1_flat");
        round_roundA(nr);
        round_roundA(nr + 1);
        round_roundA(nr + 2);
        round_roundA(nr + 3);
      }
      Dama35();
      Counter4A++;
      if (Counter4A >= 1) {
        quadruple_steal_flatA = function() {};
      }
    });

  } else if (nr % 10 == 8 && Variable1.classList.contains("square") && Variable8.classList.contains("square") && Variable9.classList.contains("square") && Variable10.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable8.classList.replace("square", "squareship_to_select");
    Variable9.classList.replace("square", "squareship_to_select");
    Variable10.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama36() {
        Variable1.classList.replace("squareship_to_select", "ship2_flat");
        Variable8.classList.replace("squareship_to_select", "ship2_flat");
        Variable9.classList.replace("squareship_to_select", "ship3_flat");
        Variable10.classList.replace("squareship_to_select", "ship1_flat");
        round_roundA(nr);
        round_roundA(nr + 1);
        round_roundA(nr - 1);
        round_roundA(nr + 2);
      }
      Dama36();
      Counter4A++;
      if (Counter4A >= 1) {
        quadruple_steal_flatA = function() {};
      }
    });

  } else if (nr % 10 == 9 && Variable1.classList.contains("square") && Variable8.classList.contains("square") && Variable9.classList.contains("square") && Variable11.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable8.classList.replace("square", "squareship_to_select");
    Variable9.classList.replace("square", "squareship_to_select");
    Variable11.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama37() {
        Variable1.classList.replace("squareship_to_select", "ship2_flat");
        Variable8.classList.replace("squareship_to_select", "ship1_flat");
        Variable9.classList.replace("squareship_to_select", "ship2_flat");
        Variable11.classList.replace("squareship_to_select", "ship3_flat");
        round_roundA(nr);
        round_roundA(nr + 1);
        round_roundA(nr - 1);
        round_roundA(nr - 2);
      }
      Dama37();
      Counter4++;
      if (Counter4 >= 1) {
        quadruple_steal_flatA = function() {};
      }
    });

  } else if (nr % 10 == 0 && Variable1.classList.contains("square") && Variable9.classList.contains("square") && Variable11.classList.contains("square") && Variable13.classList.contains("square")) {
    Variable1.classList.replace("square", "squareship_to_select");
    Variable9.classList.replace("square", "squareship_to_select");
    Variable11.classList.replace("square", "squareship_to_select");
    Variable13.classList.replace("square", "squareship_to_select");
    Variable1.addEventListener('click', function() {
      function Dama38() {
        Variable1.classList.replace("squareship_to_select", "ship1_flat");
        Variable9.classList.replace("squareship_to_select", "ship2_flat");
        Variable11.classList.replace("squareship_to_select", "ship2_flat");
        Variable13.classList.replace("squareship_to_select", "ship3_flat");
        round_roundA(nr);
        round_roundA(nr - 1);
        round_roundA(nr - 2);
        round_roundA(nr - 3);
      }
      Dama38();
      Counter4A++;
      if (Counter4A >= 1) {
        quadruple_steal_flatA = function() {};
      }
    });
  }
}

function turnoff_sun_A() {
  for (var nr = 1; nr <= list.length; nr++) {
    var Variable1 = document.getElementById('poldA' + nr);
    if (Variable1.classList.contains("squareship_to_select")) {
      Variable1.classList.replace("squareship_to_select", "square");
    }
  }
}



var Switch1A = true;
var Counter1A = 0;
var Counter2A = 0;
var Counter3A = 0;
var Counter4A = 0;

function changesA() {
if (Switch1A) {
  Switch1A = false;
  
} else {
  Switch1A = true;
  
}
}



function Highlighting_fieldsA(nr) {
if (Switch1A) {
  if (Counter4A < 1) {
    quadruple_steal_flatA(nr);
    } if (Counter3A < 2 && Counter4A >= 1) {
    triple_steal_flatA(nr);
      } if (Counter2A < 3 && Counter3A >= 2) {
    double_steal_flatA(nr);
        } if (Counter1A < 4 && Counter2A >= 3) {
          single_stealA(nr);
        }
} else {
    if (Counter4A < 1) {
      quadruple_steal_verticalA(nr);
      } if (Counter3A < 2 && Counter4A >= 1) {
        triple_steal_verticalA(nr);
        } if (Counter2A < 3 && Counter3A >= 2) {
          double_steal_verticalA(nr);
          } if (Counter1A < 4 && Counter2A >= 3) {
            single_stealA(nr);
          }
        }
        if (Counter1A >= 4) {
          
          //// Turning off some functions, some added to prepare game to start 
          Take_off_water_z_plansza2 = function() {};
          crossA();
          chang_game_na_water();
          Highlighting_fieldsA = function() {};
          Highlighting_fields = function() {};
          
          
        }
        
}



  function crossA() {
    for (var nr = 1; nr <= list.length; nr++) {
      var Variable1 = document.getElementById('poldA' + nr);
      Variable1.classList.add("cross")
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///The function adds hover methods, other functions are included in it
function First_play() {

      for (var i = 0; i < list.length; i++) {
        var uchwyt_okienaka = document.getElementById('pold' + (i + 1));
        uchwyt_okienaka.addEventListener("mouseover", createEventListener(i + 1));
        uchwyt_okienaka.addEventListener("mouseout", Christmas_tree_lights);
      }
      function createEventListener(index) {
        return function() {
          Highlighting_fields(index);
          Lampki_ON();
          Hit(index);
          Lampki_ONgame(); 
        }
      }
      function Christmas_tree_lights() {
        turnoff_sun_();
        Lampki_OFF();
        turnoff_sun_game();
        
      }
      
    
}

function Second_play() {

  for (var i = 0; i < list.length; i++) {
    var uchwyt_okienakaA = document.getElementById('poldA' + (i + 1));
    uchwyt_okienakaA.addEventListener("mouseover", createEventListenerA(i + 1));
    uchwyt_okienakaA.addEventListener("mouseout", Christmas_tree_lightsA);
  }
  function createEventListenerA(index) {
    return function() {
      Highlighting_fieldsA(index);
      Lampki_ONA();
      HitA(index);
      Lampki_ONAgame(); 
    }
  }
  function Christmas_tree_lightsA() {
    turnoff_sun_A();
    Lampki_OFFA();
    turnoff_sun_Agame();
    
  }
  

}
////The function determines whether you need to change the class after hitting the ship with a hit, or maybe it's the second player's turn when there was a miss (class: "empty")
function Hit(nr) {
  var Hit = document.getElementById('pold' + nr);

  if (Hit.classList.contains("water")) {
    Hit.classList.replace("water", "gold");
    Hit.addEventListener('click', function() {
      if (Hit.classList.contains("ship")) {
        Hit.classList.replace("ship", "shipT");
      }
      if (Hit.classList.contains("ship1_vertical")) {
        Hit.classList.replace("ship1_vertical", "ship1_verticalT");
      }
      if (Hit.classList.contains("ship2_vertical")) {
        Hit.classList.replace("ship2_vertical", "ship2_verticalT");
      }
      if (Hit.classList.contains("ship3_vertical")) {
        Hit.classList.replace("ship3_vertical", "ship3_verticalT");
      }
      if (Hit.classList.contains("ship1_flat")) {
        Hit.classList.replace("ship1_flat", "ship1_flatT");
      }
      if (Hit.classList.contains("ship2_flat")) {
        Hit.classList.replace("ship2_flat", "ship2_flatT");
      }
      if (Hit.classList.contains("ship3_flat")) {
        Hit.classList.replace("ship3_flat", "ship3_flatT");
      }
      if (Hit.classList.contains("empty") || Hit.classList.contains("square")) {
        Hit.classList.replace("empty", "mishit");
        Hit.classList.replace("square", "mishit");
        chang_game_na_waterA();
        chang_game_na_woter();
      }

    });
}
}

function HitA(nr) {
  var HitA = document.getElementById('poldA' + nr);

  if (HitA.classList.contains("water")) {
    HitA.classList.replace("water", "gold");
    HitA.addEventListener('click', function() {
      if (HitA.classList.contains("ship")) {
        HitA.classList.replace("ship", "shipT");
      }
      if (HitA.classList.contains("ship1_vertical")) {
        HitA.classList.replace("ship1_vertical", "ship1_verticalT");
      }
      if (HitA.classList.contains("ship2_vertical")) {
        HitA.classList.replace("ship2_vertical", "ship2_verticalT");
      }
      if (HitA.classList.contains("ship3_vertical")) {
        HitA.classList.replace("ship3_vertical", "ship3_verticalT");
      }
      if (HitA.classList.contains("ship1_flat")) {
        HitA.classList.replace("ship1_flat", "ship1_flatT");
      }
      if (HitA.classList.contains("ship2_flat")) {
        HitA.classList.replace("ship2_flat", "ship2_flatT");
      }
      if (HitA.classList.contains("ship3_flat")) {
        HitA.classList.replace("ship3_flat", "ship3_flatT");
      }
      if (HitA.classList.contains("empty") || HitA.classList.contains("square")) {
        HitA.classList.replace("empty", "mishit");
        HitA.classList.replace("square", "mishit");
        chang_game_na_woterA();
        chang_game_na_water();
      }

    });
  }
}
////Illumination of numbers and digits
function Lampki_ONgame() {
  for (var nr = 0; nr <= 99; nr++) {
    for (var i = 0; i <= 9; i++) {
      var list = document.getElementById('pold' + (nr + 1));
      var liczba = document.getElementById('liczb' + i);
      var litera = document.getElementById('litr' + i);
      if (list.classList.contains("gold")) {
        if (nr % 10 == i) {  
          litera.classList.replace("lightA", "light1");
        }        
        if ((nr - (nr % 10))/10 == i) {
          liczba.classList.replace("lightA", "light1");
        }
      }
  }
}
}
////Illumination of numbers and digits
function Lampki_ONAgame() {
  for (var nr = 0; nr <= 99; nr++) {
    for (var i = 0; i <= 9; i++) {
      var list = document.getElementById('poldA' + (nr + 1));
      var liczba = document.getElementById('liczbA' + i);
      var litera = document.getElementById('litrA' + i);
      if (list.classList.contains("gold")) {
        if (nr % 10 == i) {  
          litera.classList.replace("lightA", "light1");
        }        
        if ((nr - (nr % 10))/10 == i) {
          liczba.classList.replace("lightA", "light1");
        }
      }
    }
  }
}
function turnoff_sun_game() {
  for (var nr = 1; nr <= list.length; nr++) {
    var Variable1 = document.getElementById('pold' + nr);
    if (Variable1.classList.contains("gold")) {
      Variable1.classList.replace("gold", "water");
    }
  }
}
function turnoff_sun_Agame() {
  for (var nr = 1; nr <= list.length; nr++) {
    var Variable1 = document.getElementById('poldA' + nr);
    if (Variable1.classList.contains("gold")) {
      Variable1.classList.replace("gold", "water");
    }
  }
}


////changing the boards locks
  function chang_game_na_water() {
    for (var nr = 1; nr <= list.length; nr++) {
      var Variable1 = document.getElementById('pold' + nr);
      Variable1.classList.replace("cross", "water")
      }
    }

  function chang_game_na_waterA() {
    for (var nr = 1; nr <= list.length; nr++) {
      var Variable1 = document.getElementById('poldA' + nr);
      Variable1.classList.replace("cross", "water")
    }
  }

  function chang_game_na_woter() {
    for (var nr = 1; nr <= list.length; nr++) {
      var Variable1 = document.getElementById('pold' + nr);
      Variable1.classList.replace("water", "cross")
    }
  }

  function chang_game_na_woterA() {
     for (var nr = 1; nr <= list.length; nr++) {
        var Variable1 = document.getElementById('poldA' + nr);
        Variable1.classList.replace("water", "cross")
      }
   }





function start() {



First_play();
Second_play();


}

window.onload = start;
