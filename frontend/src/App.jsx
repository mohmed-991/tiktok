import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import UserDashboard from './pages/UserDashboard';
import OffersPage from './pages/OffersPage';
import TrackingPage from './pages/TrackingPage';
import PendingPage from './pages/PendingPage';
import DriverDashboard from './pages/DriverDashboard';
import AdminDashboard from './pages/AdminDashboard';

const apiBase = 'http://127.0.0.1:8000/api';
const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

function AppContent() {
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const routePolylineRef = useRef(null);
  const markerRef = useRef({ from: null, to: null, driver: null });
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fromAddress, setFromAddress] = useState('موقعي الحالي');
  const [toAddress, setToAddress] = useState('مكان الوصول');
  const [fromLat, setFromLat] = useState(30.0444);
  const [fromLng, setFromLng] = useState(31.2357);
  const [toLat, setToLat] = useState(30.0465);
  const [toLng, setToLng] = useState(31.2389);
  const [requestId, setRequestId] = useState(null);
  const [offers, setOffers] = useState([]);
  const [offerPrice, setOfferPrice] = useState('');
  const [driverRequests, setDriverRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState('from');
  const [searchResults, setSearchResults] = useState([]);
  const [locationError, setLocationError] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [driverAddress, setDriverAddress] = useState('');
  const [documentFront, setDocumentFront] = useState(null);
  const [documentBack, setDocumentBack] = useState(null);
  const [toktokPhoto, setToktokPhoto] = useState(null);
  const [pendingMessage, setPendingMessage] = useState('');
  const [adminDrivers, setAdminDrivers] = useState([]);
  const [suggestedPrice, setSuggestedPrice] = useState(35);
  const [sortOffers, setSortOffers] = useState('price');
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [isDriverOnline, setIsDriverOnline] = useState(true);
  const [rideInfo, setRideInfo] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [googleReady, setGoogleReady] = useState(false);
  const [routeDistanceKm, setRouteDistanceKm] = useState(null);
  const [routeDurationText, setRouteDurationText] = useState('');
  const [routeDurationMinutes, setRouteDurationMinutes] = useState(null);
  const [autocompleteService, setAutocompleteService] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 30.0444, lng: 31.2357 });

  useEffect(() => {
    document.title = 'Toktok Booking';
  }, []);

  useEffect(() => {
    if (!googleApiKey) {
      setMessage('يرجى إعداد VITE_GOOGLE_MAPS_API_KEY في ملف .env');
      return;
    }

    if (window.google?.maps?.places) {
      setGoogleReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleReady(true);
    script.onerror = () => setMessage('فشل تحميل خرائط Google، تأكد من مفتاح API والقيود.');
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!googleReady || !window.google?.maps) return;
    setAutocompleteService(new window.google.maps.places.AutocompleteService());
    setPlacesService(new window.google.maps.places.PlacesService(document.createElement('div')));
    setGeocoder(new window.google.maps.Geocoder());
    setDirectionsService(new window.google.maps.DirectionsService());
  }, [googleReady]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => {},
      { timeout: 10000 }
    );
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const mapInstance = L.map(mapContainerRef.current, {
      center: [fromLat, fromLng],
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapInstance);

    mapRef.current = mapInstance;
  }, [fromLat, fromLng]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map._leaflet_id) return;

    const createIcon = (color) =>
      L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-dot ${color}"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

    const updateMarker = (key, coords, label, color) => {
      if (markerRef.current[key]) {
        map.removeLayer(markerRef.current[key]);
      }

      const marker = L.marker(coords, {
        icon: createIcon(color),
        draggable: true,
      })
        .addTo(map)
        .bindPopup(label);

      marker.on('dragend', () => {
        const latlng = marker.getLatLng();
        handleMarkerDragEnd(key, latlng.lat, latlng.lng);
      });

      markerRef.current[key] = marker;
    };

    updateMarker('from', [fromLat, fromLng], `التحميل: ${fromAddress}`, 'blue');
    updateMarker('to', [toLat, toLng], `الوصول: ${toAddress}`, 'green');

    if (user?.role === 'driver' && user.driver_lat && user.driver_lng) {
      updateMarker('driver', [user.driver_lat, user.driver_lng], 'موقعك الحالي', 'orange');
    }

    if (routePolylineRef.current) {
      map.removeLayer(routePolylineRef.current);
      routePolylineRef.current = null;
    }

    map.fitBounds(L.latLngBounds([[fromLat, fromLng], [toLat, toLng]]), { padding: [60, 60] });
  }, [fromLat, fromLng, toLat, toLng, fromAddress, toAddress, user]);

  const authHeaders = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const handleApi = async (url, method, body, form = false) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`${apiBase}${url}`, {
        method,
        headers: {
          // إضافة الـ Accept هنا بتجبر السيرفر يرد JSON بدل ما يحولك لصفحة تانية
          'Accept': 'application/json', 
          ...(form ? authHeaders : { 'Content-Type': 'application/json', ...authHeaders }),
        },
        body: form ? body : body ? JSON.stringify(body) : undefined,
      });
      const data = await response.json();
      setLoading(false);
      return { ok: response.ok, data };
    } catch (error) {
      setLoading(false);
      // دي الرسالة اللي كانت بتظهرلك في واجهة المستخدم
      return { ok: false, data: { error: 'فشل الاتصال بالسيرفر' } }; 
    }
  };
  const computeDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const computeSuggestedPrice = () => {
    const distance = computeDistance(fromLat, fromLng, toLat, toLng);
    return Math.max(25, Math.round(distance * 9 + 5));
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('المتصفح لا يدعم تحديد الموقع. أكتب العنوان يدوياً.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setFromLat(lat);
        setFromLng(lng);
        setFromAddress('موقعي الحالي');
        setUserLocation({ lat, lng });
        setLocationError('');
      },
      () => {
        setLocationError('تعذّر تحديد الموقع. أرجو كتابة العنوان بالتفصيل.');
      },
      { timeout: 10000 }
    );
  };

  const performPlaceSearch = async (input) => {
    if (!autocompleteService || !googleReady) {
      setMessage('خدمة بحث Google غير جاهزة بعد');
      return;
    }
    const request = {
      input,
      location: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
      radius: 30000,
      componentRestrictions: { country: 'eg' },
    };

    autocompleteService.getPlacePredictions(request, (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
        setSearchResults([]);
        return;
      }
      setSearchResults(predictions.map((prediction) => ({
        place_id: prediction.place_id,
        description: prediction.description,
      })));
    });
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      performPlaceSearch(searchTerm.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, autocompleteService, googleReady, userLocation]);

  const searchAddress = async () => {
    if (!searchTerm.trim()) {
      setMessage('أدخل عنوان للبحث');
      return;
    }
    performPlaceSearch(searchTerm.trim());
  };

  const getPlaceDetails = (placeId) =>
    new Promise((resolve, reject) => {
      if (!placesService) {
        reject(new Error('Places service unavailable'));
        return;
      }
      placesService.getDetails(
        { placeId, fields: ['formatted_address', 'geometry'] },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            resolve(place);
          } else {
            reject(new Error(`Place details failed: ${status}`));
          }
        }
      );
    });

  const handleMarkerDragEnd = (key, lat, lng) => {
    if (!geocoder || !window.google?.maps) {
      setMessage('خدمة Google غير متوفرة لتحويل الموقع إلى عنوان');
      return;
    }

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
        const address = results[0].formatted_address;
        if (key === 'from') {
          setFromLat(lat);
          setFromLng(lng);
          setFromAddress(address);
        } else if (key === 'to') {
          setToLat(lat);
          setToLng(lng);
          setToAddress(address);
        }
        setSearchResults([]);
        setSearchTerm('');
      } else {
        setLocationError('تعذّر تحويل النقطة إلى عنوان. الرجاء المحاولة مجدداً.');
      }
    });
  };

  const selectSearchResult = async (item) => {
    try {
      const place = await getPlaceDetails(item.place_id);
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const address = place.formatted_address || item.description;

      if (searchMode === 'from') {
        setFromLat(lat);
        setFromLng(lng);
        setFromAddress(address);
      } else {
        setToLat(lat);
        setToLng(lng);
        setToAddress(address);
      }
      setSearchResults([]);
      setSearchTerm('');
      setLocationError('');
    } catch (error) {
      setMessage('فشل استرجاع تفاصيل العنوان من Google');
    }
  };

  useEffect(() => {
    if (!googleReady || !directionsService || !mapRef.current || !mapRef.current._leaflet_id) return;
    if (!fromLat || !fromLng || !toLat || !toLng) return;

    directionsService.route(
      {
        origin: { lat: parseFloat(fromLat), lng: parseFloat(fromLng) },
        destination: { lat: parseFloat(toLat), lng: parseFloat(toLng) },
        travelMode: window.google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: 'best_guess',
        },
      },
      (result, status) => {
        if (status !== window.google.maps.DirectionsStatus.OK || !result) {
          setMessage('تعذّر الحصول على المسار من Google');
          return;
        }

        const leg = result.routes[0]?.legs?.[0];
        if (!leg) return;

        const distanceKm = leg.distance.value / 1000;
        const durationText = leg.duration_in_traffic?.text || leg.duration.text;
        const durationMinutes = Math.round((leg.duration_in_traffic?.value || leg.duration.value) / 60);

        setRouteDistanceKm(distanceKm);
        setRouteDurationText(durationText);
        setRouteDurationMinutes(durationMinutes);

        const path = result.routes[0].overview_path.map((point) => [point.lat(), point.lng()]);
        if (routePolylineRef.current) {
          mapRef.current.removeLayer(routePolylineRef.current);
        }
        routePolylineRef.current = L.polyline(path, { color: 'blue', weight: 5, opacity: 0.7 }).addTo(mapRef.current);
        mapRef.current.fitBounds(routePolylineRef.current.getBounds(), { padding: [60, 60] });
      }
    );
  }, [fromLat, fromLng, toLat, toLng, googleReady, directionsService]);

  const logout = () => {
    setUser(null);
    setToken('');
    setRequestId(null);
    setOffers([]);
    setDriverRequests([]);
    setRideInfo(null);
    setSelectedOfferId(null);
    setMessage('');
    navigate('/');
  };

  const register = async () => {
    const form = new FormData();
    form.append('name', name);
    form.append('phone', phone);
    form.append('password', password);
    form.append('role', role);

    if (role === 'driver') {
      form.append('vehicle_number', vehicleNumber);
      form.append('license_number', licenseNumber);
      form.append('driver_address', driverAddress);
      if (documentFront) form.append('document_front', documentFront);
      if (documentBack) form.append('document_back', documentBack);
      if (toktokPhoto) form.append('toktok_photo', toktokPhoto);
    }

    const { ok, data } = await handleApi('/register', 'POST', form, true);
    if (ok) {
      setUser(data);
      setToken(data.api_token);
      setMessage(data.message || 'تم تسجيل الحساب بنجاح');
      if (data.role === 'admin') {
        navigate('/admin');
      } else if (data.status !== 'approved') {
        setPendingMessage(data.message || 'حسابك تحت المراجعة وسيتم تفعيله بعد موافقة الإدارة.');
        navigate('/pending');
      } else if (data.role === 'driver') {
        navigate('/driver');
      } else {
        navigate('/user');
      }
    } else {
      setMessage(data.error || 'حدث خطأ في التسجيل');
    }
  };

  const login = async () => {
    const { ok, data } = await handleApi('/login', 'POST', { phone, password });
    if (ok) {
      setUser(data);
      setToken(data.api_token);
      setMessage(data.message || 'تم تسجيل الدخول بنجاح');
      if (data.role === 'admin') {
        navigate('/admin');
      } else if (data.status !== 'approved') {
        setPendingMessage(data.message || 'حسابك تحت المراجعة وسيتم تفعيله بعد موافقة الإدارة.');
        navigate('/pending');
      } else if (data.role === 'driver') {
        navigate('/driver');
      } else {
        navigate('/user');
      }
    } else {
      setMessage(data.error || 'فشل تسجيل الدخول');
    }
  };

  const createRequest = async () => {
    const payload = {
      from_address: fromAddress,
      to_address: toAddress,
      from_lat: parseFloat(fromLat),
      from_lng: parseFloat(fromLng),
      to_lat: parseFloat(toLat),
      to_lng: parseFloat(toLng),
      suggested_price: parseFloat(suggestedPrice) || computeSuggestedPrice(),
      route_distance_km: routeDistanceKm ? parseFloat(routeDistanceKm.toFixed(2)) : null,
      route_duration_minutes: routeDurationMinutes,
      estimated_fare: routeDistanceKm ? Math.max(25, Math.round(routeDistanceKm * 9 + 5)) : null,
    };

    const { ok, data } = await handleApi('/request', 'POST', payload);
    if (ok) {
      setRequestId(data.request_id);
      setRideInfo({ ...payload, request_id: data.request_id, estimated_price: data.estimated_price });
      setMessage('تم إرسال الطلب، انتظر عروض السائقين');
      navigate('/offers');
    } else {
      setMessage(data.error || 'فشل إنشاء الطلب');
    }
  };

  const loadOffers = async () => {
    if (!requestId) return;
    const { ok, data } = await handleApi(`/offers/${requestId}`, 'GET');
    if (ok) {
      setOffers(data);
    } else {
      setMessage(data.error || 'فشل تحميل العروض');
    }
  };

  const acceptOffer = async (offerId) => {
    const { ok, data } = await handleApi('/accept-offer', 'POST', { offer_id: offerId });
    if (ok) {
      setMessage('تم اختيار السائق بنجاح');
      navigate('/tracking');
    } else {
      setMessage(data.error || 'فشل اختيار العرض');
    }
  };

  const loadDriverRequests = async () => {
    const { ok, data } = await handleApi('/driver/requests', 'GET');
    if (ok) {
      setDriverRequests(data);
    } else {
      setMessage(data.error || 'فشل تحميل الطلبات');
    }
  };

  const submitOffer = async (request_id) => {
    const { ok, data } = await handleApi('/offer', 'POST', {
      request_id,
      driver_id: user.id,
      price: parseFloat(offerPrice) || 20,
    });
    if (ok) {
      setMessage('تم إرسال العرض، انتظر قبول المستخدم');
      setOfferPrice('');
    } else {
      setMessage(data.error || 'فشل إرسال العرض');
    }
  };

  const updateDriverLocation = async () => {
    const { ok, data } = await handleApi('/driver/location', 'POST', {
      lat: parseFloat(fromLat),
      lng: parseFloat(fromLng),
    });
    if (ok) {
      setMessage('تم تحديث موقعك بنجاح');
      setUser((prev) => ({ ...prev, driver_lat: fromLat, driver_lng: fromLng }));
    } else {
      setMessage(data.error || 'فشل حفظ الموقع');
    }
  };

  const loadPendingAccounts = async () => {
    const { ok, data } = await handleApi('/admin/pending-accounts', 'GET');
    if (ok) {
      setAdminDrivers(data);
    } else {
      setMessage(data.error || 'فشل تحميل الحسابات المعلقة');
    }
  };

  const approveAccount = async (accountId) => {
    const { ok, data } = await handleApi('/admin/approve-account', 'POST', { account_id: accountId });
    if (ok) {
      setMessage('تم تفعيل الحساب');
      loadPendingAccounts();
    } else {
      setMessage(data.error || 'فشل تفعيل الحساب');
    }
  };

  const distanceText = useMemo(() => {
    if (routeDistanceKm !== null) {
      return `المسار: ${routeDistanceKm.toFixed(1)} كم • ETA: ${routeDurationText}`;
    }
    const km = computeDistance(fromLat, fromLng, toLat, toLng);
    return `المسافة التقريبية: ${km.toFixed(1)} كم`;
  }, [fromLat, fromLng, toLat, toLng, routeDistanceKm, routeDurationText]);

  return (
    <div className="app-shell">
      <header className="site-nav">
        <div className="site-brand">Toktok</div>
        <div className="nav-actions">
          <button className="secondary-btn" onClick={() => { setAuthMode('login'); navigate('/auth'); }}>
            تسجيل دخول
          </button>
          <button className="secondary-btn" onClick={() => { setAuthMode('register'); setRole('user'); navigate('/auth'); }}>
            تسجيل جديد
          </button>
          <button onClick={() => { setAuthMode('register'); setRole('driver'); navigate('/auth'); }}>
            كن سائق
          </button>
        </div>
      </header>

      <main className="content-card">
        <Routes>
          <Route
            path="/"
            element={<LandingPage
              onStart={() => { setAuthMode('login'); navigate('/auth'); }}
              onBecomeDriver={() => { setAuthMode('register'); setRole('driver'); navigate('/auth'); }}
            />}
          />
          <Route
            path="/auth"
            element={<AuthPage
              mode={authMode}
              role={role}
              name={name}
              phone={phone}
              password={password}
              vehicleNumber={vehicleNumber}
              licenseNumber={licenseNumber}
              driverAddress={driverAddress}
              setRole={setRole}
              setName={setName}
              setPhone={setPhone}
              setPassword={setPassword}
              setVehicleNumber={setVehicleNumber}
              setLicenseNumber={setLicenseNumber}
              setDriverAddress={setDriverAddress}
              setDocumentFront={setDocumentFront}
              setDocumentBack={setDocumentBack}
              setToktokPhoto={setToktokPhoto}
              onLogin={login}
              onRegister={register}
              onSwitchMode={() => setAuthMode((prev) => (prev === 'login' ? 'register' : 'login'))}
              loading={loading}
            />}
          />
          <Route
            path="/user"
            element={<UserDashboard
              user={user}
              mapRef={mapContainerRef}
              distanceText={distanceText}
              fromAddress={fromAddress}
              toAddress={toAddress}
              searchTerm={searchTerm}
              searchMode={searchMode}
              searchResults={searchResults}
              locationError={locationError}
              suggestedPrice={suggestedPrice}
              loading={loading}
              onDetectLocation={detectLocation}
              onSearchAddress={searchAddress}
              onSelectSearchResult={selectSearchResult}
              setSearchMode={setSearchMode}
              setSearchTerm={setSearchTerm}
              setFromAddress={setFromAddress}
              setToAddress={setToAddress}
              setSuggestedPrice={setSuggestedPrice}
              onCreateRequest={createRequest}
              onLogout={logout}
            />}
          />
          <Route
            path="/offers"
            element={<OffersPage
              offers={offers}
              loadOffers={loadOffers}
              sortOffers={sortOffers}
              setSortOffers={setSortOffers}
              selectedOfferId={selectedOfferId}
              setSelectedOfferId={setSelectedOfferId}
              acceptOffer={acceptOffer}
              rideInfo={rideInfo}
              loading={loading}
            />}
          />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/pending" element={<PendingPage pendingMessage={pendingMessage} onLogout={logout} />} />
          <Route
            path="/driver"
            element={<DriverDashboard
              user={user}
              driverRequests={driverRequests}
              offerPrice={offerPrice}
              setOfferPrice={setOfferPrice}
              onUpdateLocation={updateDriverLocation}
              onLoadRequests={loadDriverRequests}
              onSubmitOffer={submitOffer}
              isDriverOnline={isDriverOnline}
              setIsDriverOnline={setIsDriverOnline}
              onLogout={logout}
            />}
          />
          <Route
            path="/admin"
            element={<AdminDashboard
              adminDrivers={adminDrivers}
              loadPendingAccounts={loadPendingAccounts}
              approveAccount={approveAccount}
              onLogout={logout}
            />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {message && <div className="message-box">{message}</div>}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
