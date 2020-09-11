var map;
function initMap() {
    var sousse={
        lat:35.8288,
        lng:10.640499999999975
    }

    var mestir={
        lat:35.7709,
        lng:10.827199999999948
    }
    var jemmel={
        lat:35.6215,
        lng:10.762899999999945
    }
    var zaremdin={
        lat:35.6183,
        lng:10.756399999999985
    }
    var content ="<h1>bonjour jemmel</h1>";
  map = new google.maps.Map(document.getElementById('map'), {
    center:sousse,
    zoom: 10
  });
 
  var marker = new google.maps.Marker({
    position: sousse,
    map: map,
    title: 'Hello sousse!'

  });

 
  var marker1 = new google.maps.Marker({
    position: mestir,
    map: map,
    title: 'Hello mestir!'
  });

  var info=new google.maps.InfoWindow({
      content:content
  });

  var marker2 = new google.maps.Marker({
    position: jemmel,
    map: map
  });

  marker2.addListener('click',function(){
      info.open(map,marker2)
  });

  var marker3 = new google.maps.Marker({
    position: zaremdin,
    map: map,
    title: 'Hello jemmel!'
  });
}

