//api key: eab4e9eeab38496d93728ed135cf160c
//q3/http://api.ipapi.com/
//!mettre la position d'un internaute sur une carte
    // let lon = document.querySelector(".l")
    // let La = document.querySelector(".L")
    // let url = "http://api.ipapi.com/193.50.159.42?access_key=eab4e9eeab38496d93728ed135cf160c";
    // fetch(url)
    // .then((resp)=>resp.json())
    // .then((data)=>{
    //     La.textContent+=data.latitude,
    //     lon.textContent+=data.longitude 
    // }


    // )

    // //map
    // var map = L.map('map').setView([51.505, -0.09], 13);

    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG9tZXNkYXkiLCJhIjoiY2t3dzR1YnczMDA4YzJ3cGx6NW9oM3J5ZCJ9.1f3UpoIsOHyNX6AEquBkQQ', {
    //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     maxZoom: 18,
    //     id: 'mapbox/streets-v11',
    //     tileSize: 512,
    //     zoomOffset: -1,
    //     accessToken: 'your.mapbox.access.token'
    // }).addTo(map);
    // var popup = L.popup()
    //     .setLatLng([51.513, -0.09])
    //     .setContent("Vous êtes ici")
    //     .openOn(map);

var map = L.map('map').setView([51.505, -0.09], 13);1
var greenIcon = L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var redIcon = L.icon({
    iconUrl: 'leaf-red.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var orangeIcon = L.icon({
    iconUrl: 'leaf-orange.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZG9tZXNkYXkiLCJhIjoiY2t3dzR1YnczMDA4YzJ3cGx6NW9oM3J5ZCJ9.1f3UpoIsOHyNX6AEquBkQQ'
}).addTo(map);
    
    // fetch("https://igm.univ-mlv.fr/~gambette/ENSIUT/autrices/data.php")
    //     .then((resp) => resp.json())
    //     .then(((data) => {
           
    //       data.forEach(el => {
    //         d=el.coordNaissance.reverse()
    //         birth = parseInt(el.anneeNaissance)
    //         if (birth<1800){
    //             var marker = L.marker(d,{icon:greenIcon}).addTo(map);
    //             marker.bindPopup(`${el.autriceLabel}`).openPopup();
    //         }
    //         else if( birth>1800 && birth <1900){
    //             var marker = L.marker(d,{icon:orangeIcon}).addTo(map);
    //             marker.bindPopup(`${el.autriceLabel}`).openPopup();
    //         }
    //         else if( birth>1900){
    //             var marker = L.marker(d,{icon:redIcon}).addTo(map);
    //             marker.bindPopup(`${el.autriceLabel}`).openPopup();
    //         }
           
            
    //       });

            
              
      
    //     }))


//Q9

class SPARQLQueryDispatcher {
	constructor( endpoint ) {
		this.endpoint = endpoint;
	}

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `#Femmes de lettres francophones mortes avant 1951, classées en fonction du nombre de liens de sites de leur élément avec leur pays de nationalité et lieu de naissance
#defaultView:ImageGrid
SELECT DISTINCT ?autrice ?autriceLabel ?coordNaissance (MIN(?photo) AS ?laphoto) (MIN(?dateNaissance) AS ?naissance) (YEAR(?naissance) AS ?anneeNaissance) (MIN(?dateMort) AS ?mort) (YEAR(?mort) AS ?anneeMort) ?linkcount ?lieuNaissance WHERE {
  ?autrice wdt:P106 wd:Q486748;
    wdt:P1412 wd:Q150;
    wdt:P21 wd:Q6581072;
    wdt:P19 ?lieuNaissance;
    wikibase:sitelinks ?linkcount;
    wdt:P18 ?photo;
    wdt:P569 ?dateNaissance;
    wdt:P570 ?dateMort.
  ?lieuNaissance wdt:P625 ?coordNaissance.
  FILTER(?dateMort < "1951-01-01T00:00:00Z"^^xsd:dateTime)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fr,en". }
}
GROUP BY ?autrice ?autriceLabel ?coordNaissance ?laphoto ?mort ?linkcount ?lieuNaissance
ORDER BY DESC (?linkcount)`;

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
queryDispatcher.query( sparqlQuery ).then( (data)=>data.results.bindings.forEach(function(element){ 
coordBrut = element.coordNaissance.value,
//suppression des caractère inutile
coordBrut = coordBrut.replace("Point(",""),
coordBrut =coordBrut.replace(")","")
let words = coordBrut.split(' ')
longitude = parseFloat(words[0])
latitude = parseFloat(words [1])
L.marker([latitude,longitude],{icon:redIcon}).addTo(map);


 }));






