"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type StorePin = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: "in_stock" | "low" | "out_of_stock";
  sealName: string;
  series: string;
  address?: string;
  quantity?: number;
  location?: string;
  perPersonLimit?: number;
  perTypeLimit?: number;
  postedBy: string;
  updatedBy: string;
  updatedAt: string;
  comment?: string;
};

const statusConfig = {
  in_stock:     { label: "在庫あり", color: "#4ade80", bg: "#f0fdf4", border: "#86efac" },
  low:          { label: "残りわずか", color: "#facc15", bg: "#fefce8", border: "#fde047" },
  out_of_stock: { label: "在庫なし", color: "#d1d5db", bg: "#f9fafb", border: "#e5e7eb" },
};

function createIcon(status: StorePin["status"]) {
  const color = statusConfig[status].color;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" fill="none">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24s16-14 16-24C32 7.163 24.837 0 16 0z" fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="16" cy="16" r="6" fill="white" opacity="0.9"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
}

function MapClickHandler({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick?.(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// 現在地に移動するコンポーネント
function LocateButton() {
  const map = useMap();
  return (
    <button
      onClick={() => {
        map.locate({ setView: true, maxZoom: 15 });
      }}
      className="absolute bottom-20 right-3 z-[1000] bg-white border border-stone-200 rounded-lg w-9 h-9 flex items-center justify-center shadow-sm hover:bg-stone-50 transition-colors"
    >
      <svg className="w-4 h-4 text-stone-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export default function Map({ pins, onPinClick, onMapClick, pickMode }: {
  pins: StorePin[];
  onPinClick?: (pin: StorePin) => void;
  onMapClick?: (lat: number, lng: number) => void;
  pickMode?: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-stone-100 flex items-center justify-center">
        <p className="text-stone-400 text-sm">地図を読み込み中...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={[35.6812, 139.7671]}
      zoom={13}
      className="w-full h-full z-0"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onMapClick={onMapClick} />
      <LocateButton />
      {pickMode && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-stone-900 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg pointer-events-none">
          地図をタップして場所を選択
        </div>
      )}
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          position={[pin.lat, pin.lng]}
          icon={createIcon(pin.status)}
          eventHandlers={{ click: () => onPinClick?.(pin) }}
        >
          <Popup>
            <div className="min-w-[180px] space-y-1">
              <p className="font-bold text-stone-900 text-xs">{pin.name}</p>
              <span
                className="inline-block text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  background: statusConfig[pin.status].bg,
                  border: `1px solid ${statusConfig[pin.status].border}`,
                  color: pin.status === "out_of_stock" ? "#6b7280" : "#374151",
                }}
              >
                {statusConfig[pin.status].label}
              </span>
              <p className="text-xs text-stone-700 font-bold">{pin.sealName}</p>
              <p className="text-xs text-stone-400">{pin.series}</p>
              {pin.location   && <p className="text-xs text-stone-500">場所：{pin.location}</p>}
              {pin.quantity   && <p className="text-xs text-stone-500">数量：{pin.quantity}個</p>}
              {pin.perPersonLimit && <p className="text-xs text-stone-500">1人{pin.perPersonLimit}個まで</p>}
              {pin.perTypeLimit   && <p className="text-xs text-stone-500">1種類{pin.perTypeLimit}個まで</p>}
              {pin.comment    && <p className="text-xs text-stone-500 italic">"{pin.comment}"</p>}
              <p className="text-xs text-stone-400">投稿：@{pin.postedBy} · {pin.updatedAt}</p>
              {pin.updatedBy !== pin.postedBy && (
                <p className="text-xs text-stone-400">修正：@{pin.updatedBy}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
