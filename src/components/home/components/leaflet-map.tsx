"use client";

import type { Map as LeafletMapInstance } from "leaflet";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type LeafletMapProps = {
  center: [number, number];
  className?: string;
  title: string;
  zoom?: number;
};

export function LeafletMap({
  center,
  className,
  title,
  zoom = 15,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMapInstance | null>(null);
  const [lat, lng] = center;

  useEffect(() => {
    let disposed = false;
    let frameId: number | null = null;

    async function initMap() {
      const L = await import("leaflet");

      if (disposed || !containerRef.current || mapRef.current) {
        return;
      }

      const map = L.map(containerRef.current, {
        attributionControl: true,
        center: [lat, lng],
        scrollWheelZoom: false,
        zoom,
        zoomControl: true,
      });

      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      L.marker([lat, lng], {
        icon: L.divIcon({
          className: "demo-map-marker",
          html: '<span class="demo-map-marker__pin"></span>',
          iconAnchor: [17, 34],
          iconSize: [34, 34],
          popupAnchor: [0, -30],
        }),
        title,
      }).addTo(map);

      frameId = requestAnimationFrame(() => {
        if (!disposed && mapRef.current === map) {
          map.invalidateSize();
        }
      });
    }

    initMap();

    return () => {
      disposed = true;
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng, title, zoom]);

  return (
    <div
      ref={containerRef}
      aria-label={title}
      className={cn("h-full w-full", className)}
      role="img"
    />
  );
}
