import view from "./view.js";

class MapView extends view {
  _parentElement = document.querySelector(".search");
  _titleLayer = new L.TileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }
  );
  map = new L.map("map", {
    center: [0, 0],
    zoom: 3,
    layers: [this._titleLayer],
  });
  marker;

  addHandlerClick(handler) {
    this.map.on("click", function (e) {
      handler(e.latlng);
    });
  }
}

export default new MapView();
