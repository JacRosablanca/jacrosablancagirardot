"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo, useRef } from "react";
// @ts-ignore
import L from "leaflet";

type Coordenadas = { lat: number; lng: number } | null;
type UbicacionMapProps = {
  setCoordenadas: (c: { lat: number; lng: number }) => void;
  coordenadas: Coordenadas;
};

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function UbicacionMap({ setCoordenadas, coordenadas }: UbicacionMapProps) {
  const center = useMemo(() => ({ lat: 4.310232981781647, lng: -74.80062561966065 }), []);
  const mapRef = useRef<any>(null);

  // Nuevo método: click en el mapa usando el evento onClick del contenedor
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!mapRef.current) return;
    // Obtén el mapa de leaflet
    const map = mapRef.current.leafletElement || mapRef.current;
    // Obtén el punto relativo al contenedor
    const bounds = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    // Convierte el punto a coordenadas lat/lng
    const latlng = map.containerPointToLatLng([x, y]);
    setCoordenadas({ lat: latlng.lat, lng: latlng.lng });
  };

  return (
    <div style={{ width: "100%", height: "100%" }} onClick={handleMapClick}>
      <MapContainer
        center={coordenadas || center}
        zoom={18}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution="Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        {coordenadas && (
          <Marker position={[coordenadas.lat, coordenadas.lng]} icon={markerIcon} />
        )}
      </MapContainer>
    </div>
  );
}
