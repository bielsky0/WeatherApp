import view from "./view.js";

class MapView extends view {
  _parentElement = document.querySelector(".search");
  _map = L.map("map").setView([51.505, -0.09], 13);

  constructor() {
    super();
    this._loadMap();
    console.log("siema mapa z tej stroy");
  }

  _generateMatkup() {}

  _loadMap() {
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._map);
  }
}

export default new MapView();
