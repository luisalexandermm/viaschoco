window.MapComponent = function MapComponent({ reports, geoSensors = [], geoAlerts = [], highlightReportId, enableClickToSet, onMapClick, tempMarker }) {
  const mapRef = React.useRef(null);
  const mapInstance = React.useRef(null);
  const markers = React.useRef({});
  const propsRef = React.useRef({ reports, geoSensors, geoAlerts, highlightReportId, enableClickToSet, onMapClick, tempMarker });

  const getMarkerColor = (report) => {
    const status = report && report.status ? report.status : report;
    if (status === 'Cerrada') return 'red';
    if (status === 'Mala') return 'orange';
    if (status === 'Regular') return 'yellow';
    return 'green';
  };

  const createMarkerIcon = (color, symbol = '') => {
    return L.divIcon({
      html: `<div style="display:flex;align-items:center;justify-content:center;width:2.3rem;height:2.3rem;border-radius:999px;background:${color};box-shadow:0 10px 24px rgba(0,0,0,0.18);"></div>`,
      className: ''
    });
  };

  const resolveAlertCoordinates = (alert, sensorMap) => {
    const sensor = sensorMap[alert.sensorId];
    if (sensor && sensor.lat && sensor.lng) {
      return { lat: sensor.lat, lng: sensor.lng };
    }
    return { lat: 5.5, lng: -76.0 };
  };

  React.useEffect(() => {
    propsRef.current = { reports, geoSensors, geoAlerts, highlightReportId, enableClickToSet, onMapClick, tempMarker };
  }, [reports, geoSensors, geoAlerts, highlightReportId, enableClickToSet, onMapClick, tempMarker]);

  React.useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [5.7, -76.3],
        zoom: 7,
        minZoom: 6,
        maxZoom: 15,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(mapInstance.current);

      mapInstance.current.on('click', function(e) {
        if (propsRef.current.enableClickToSet && propsRef.current.onMapClick) {
          propsRef.current.onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
        }
      });
    }

    const sensorMap = geoSensors.reduce((acc, sensor) => {
      if (sensor && sensor.id) acc[sensor.id] = sensor;
      return acc;
    }, {});

    const updateMarker = (id, position, icon, popup) => {
      if (!mapInstance.current) return;
      if (markers.current[id]) {
        markers.current[id].setLatLng(position);
        markers.current[id].setPopupContent(popup);
      } else {
        markers.current[id] = L.marker(position, { icon }).addTo(mapInstance.current).bindPopup(popup);
      }
    };

    // Reports removed from map display - shown only in dedicated section
    // reports.forEach(report => {
    //   const color = getMarkerColor(report);
    //   updateMarker(`report-${report.id}`, [report.lat, report.lng], createMarkerIcon(color, 'R'), `<strong>${report.title}</strong><br/>${report.location}<br/>${report.status}`);
    // });

    // GeoSensors removed from map display - disabled temporarily during geosentinel development
    // geoSensors.forEach(sensor => {
    //   if (sensor.lat && sensor.lng) {
    //     updateMarker(`sensor-${sensor.id}`, [sensor.lat, sensor.lng], createMarkerIcon('#0b84c6', 'S'), `<strong>Sensor</strong><br/>${sensor.name || sensor.id}`);
    //   }
    // });

    // GeoAlerts removed from map display - disabled temporarily during geosentinel development
    // geoAlerts.forEach(alert => {
    //   const coords = resolveAlertCoordinates(alert, sensorMap);
    //   if (coords) {
    //     updateMarker(`alert-${alert.id}`, [coords.lat, coords.lng], createMarkerIcon('#dc2626', 'A'), `<strong>Alerta</strong><br/>${alert.message || alert.type}`);
    //   }
    // });

    if (propsRef.current.highlightReportId) {
      const id = `report-${propsRef.current.highlightReportId}`;
      const marker = markers.current[id];
      if (marker) {
        marker.openPopup();
        mapInstance.current.setView(marker.getLatLng(), 10, { animate: true });
      }
    }

    // Location marker display disabled temporarily
    // if (propsRef.current.tempMarker) {
    //   const latLng = [propsRef.current.tempMarker.lat, propsRef.current.tempMarker.lng];
    //   updateMarker('temp-marker', latLng, createMarkerIcon('#2563eb', '+'), 'Ubicación seleccionada');
    // }

    return () => {
      Object.values(markers.current).forEach(marker => {
        if (mapInstance.current && mapInstance.current.hasLayer(marker)) {
          mapInstance.current.removeLayer(marker);
        }
      });
      markers.current = {};
    };
  }, [reports, geoSensors, geoAlerts]);

  return <div ref={mapRef} className="map-display relative h-[520px] rounded-[2rem] overflow-hidden border border-slate-200 shadow-[0_30px_70px_rgba(15,23,42,0.16)] bg-slate-950/5" />;
}
