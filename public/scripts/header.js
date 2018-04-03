function openNav() {
  if (document.documentElement.clientWidth <= 600) {
    document.getElementById("mySidenav").style.width = "65%";
  } else {
    document.getElementById("mySidenav").style.width = "200px";
  }
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
