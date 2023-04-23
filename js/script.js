console.log("credit 'gooey cursor' by satchmorun [https://codepen.io/satchmorun/pen/JoGVwb]")

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf = requestAnimationFrame;
var caf = cancelAnimationFrame;

var W, H;
var TAU = Math.PI*2;

function resize() {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
}

var Len = 50;
var xs = new Array(Len);
var ys = new Array(Len);

function dist(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return Math.sqrt(dx*dx + dy*dy);
}

function ease(n) {
  return 3*n*n - 2*n*n*n;
}

function Goo(opts) {
  var len = opts.len;
  var xs = new Array(len);
  var ys = new Array(len);
  var rs = new Array(len);
  var radius = opts.radius
  var hr = radius/2;
  var border = opts.border;
  var bg = opts.bg;
  var fg = opts.fg;
  
  var animating = null;
  var Threshold = 0.1;
  var i;
  
  for (i = 0; i < len; i++) {
    rs[i] = hr + hr*(1 - i/len);
  }
  
  function update(x0, y0) {
    var same = 0;
    xs[0] = x0;
    ys[0] = y0;

    for (i = 1; i < len; i++) {
      if (!(x = xs[i])) x = xs[i] = x0;
      if (!(y = ys[i])) y = ys[i] = y0;
      var dx = x0 - x;
      var dy = y0 - y;
      var d = Math.sqrt(dx*dx + dy*dy);
      
      if (d < Threshold) {
        xs[i] = x0;
        ys[i] = y0;
        same++;
      } else {
        xs[i] += dx * 0.7;
        ys[i] += dy * 0.7;
      }
      
      x0 = x;
      y0 = y;
    }
    
    draw(len);
    if (same < len - 1) {
      raf(function() {
        update(xs[0], ys[0]);
      });
    }
  }

  function draw(n) {
    ctx.clearRect(0, 0, W, H);
    
    for (i = n-1; i >= 0; i--) {
      x = xs[i];
      y = ys[i];
      ctx.beginPath();
      ctx.arc(x, y, border + rs[i], 0, TAU);
      ctx.fillStyle = bg;
      ctx.fill();
    }
    for (i = n-1; i >= 0; i--) {
      x = xs[i];
      y = ys[i];
      ctx.beginPath();
      ctx.arc(x, y, rs[i], 0, TAU);
      ctx.fillStyle = fg;
      ctx.fill();
    }
  }
  
  return {
    update: update
  };
}

var goo = Goo({
  len: 120,
  radius: 20,
  border: 0,
  bg: 'rgb(199, 233, 47,0.1)',
  fg: 'rgb(199, 233, 47,0.1)'
});

resize();
document.onmousemove = function(e) {
  goo.update(e.clientX, e.clientY);
};
goo.update(W/2, H/2, 0, 0);


// /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
// function myFunction() {
//   var x = document.getElementById("myTopnav");
//   if (x.className === "navMenu") {
//     x.className += " responsive";
//   } else {
//     x.className = "navMenu";
//   }
// } 

// Scroll to top button --------------------------

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 



// Overlay for colophon
function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
} 