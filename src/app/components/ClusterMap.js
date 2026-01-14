"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function ClusterMap({ campgrounds }) {
   const mapContainer = useRef(null);

   useEffect(() => {
      if (!mapContainer.current) return;

      const mapData = {
         type: "FeatureCollection",
         features: campgrounds.map((camp) => ({
            type: "Feature",
            properties: {
               id: camp._id,
               title: camp.title,
               location: camp.location,
            },
            geometry: camp.geometry,
         })),
      };

      const map = new mapboxgl.Map({
         container: mapContainer.current,
         // light-v11 este excelent, dar stilul "outdoors-v12" oferă un look mai Apple-Nature
         style: "mapbox://styles/mapbox/light-v11",
         center: [25.0, 45.9],
         zoom: 6,
         projection: "globe", // Efect de glob la zoom out
      });

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");

      map.on("load", () => {
         // Adăugăm ceață pe orizont pentru un look cinematic (3D feeling)
         map.setFog({
            color: "rgb(255, 255, 255)",
            "high-color": "rgb(200, 210, 200)",
            "horizon-blend": 0.02,
         });

         map.addSource("campgrounds", {
            type: "geojson",
            data: mapData,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50,
         });

         // LAYER CLUSTERE: Stil rafinat cu bordură
         map.addLayer({
            id: "clusters",
            type: "circle",
            source: "campgrounds",
            filter: ["has", "point_count"],
            paint: {
               "circle-color": "#14532d", // green-900
               "circle-radius": ["step", ["get", "point_count"], 20, 10, 28, 30, 35],
               "circle-stroke-width": 4,
               "circle-stroke-color": "rgba(20, 83, 45, 0.2)",
            },
         });

         map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "campgrounds",
            filter: ["has", "point_count"],
            layout: {
               "text-field": "{point_count}",
               "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
               "text-size": 14,
            },
            paint: { "text-color": "#ffffff" },
         });

         // LAYER PUNCTE: Folosim portocaliul tău vibrant
         map.addLayer({
            id: "unclustered-point",
            type: "circle",
            source: "campgrounds",
            filter: ["!", ["has", "point_count"]],
            paint: {
               "circle-color": "#ea580c",
               "circle-radius": 7,
               "circle-stroke-width": 3,
               "circle-stroke-color": "#ffffff",
            },
         });

         // POP-UP STILIZAT
         map.on("click", "unclustered-point", (e) => {
            const { title, id } = e.features[0].properties;
            const coordinates = e.features[0].geometry.coordinates.slice();

            // HTML stilizat pentru a se potrivi cu restul site-ului
            const popupHTML = `
               <div style="padding: 10px; font-family: inherit;">
                  <h4 style="margin: 0 0 8px 0; font-weight: 900; color: #1c1917; font-size: 14px;">${title}</h4>
                  <a href="/campgrounds/${id}" 
                     style="display: block; background: #14532d; color: white; text-decoration: none; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; text-align: center; transition: all 0.2s;">
                     VEZI DETALII →
                  </a>
               </div>
            `;

            new mapboxgl.Popup({ offset: 15, closeButton: false }).setLngLat(coordinates).setHTML(popupHTML).addTo(map);
         });

         // Schimbă cursorul la hover
         map.on("mouseenter", "clusters", () => (map.getCanvas().style.cursor = "pointer"));
         map.on("mouseleave", "clusters", () => (map.getCanvas().style.cursor = ""));
         map.on("mouseenter", "unclustered-point", () => (map.getCanvas().style.cursor = "pointer"));
         map.on("mouseleave", "unclustered-point", () => (map.getCanvas().style.cursor = ""));
      });

      return () => map.remove();
   }, [campgrounds]);

   // Returnăm container-ul cu design-ul Apple-style stabilit în pagina de explore
   return (
      <div
         ref={mapContainer}
         className="w-full h-full" // H-full deoarece e într-un container fix în page.js
      />
   );
}
