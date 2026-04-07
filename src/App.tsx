/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import WaterSofteners from './pages/WaterSofteners';
import WaterHeaters from './pages/WaterHeaters';
import WaterFiltration from './pages/WaterFiltration';
import ServiceAreas from './pages/ServiceAreas';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Gallery from './pages/Gallery';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/water-softeners" element={<WaterSofteners />} />
          <Route path="services/water-heaters" element={<WaterHeaters />} />
          <Route path="services/water-filtration" element={<WaterFiltration />} />
          <Route path="service-areas" element={<ServiceAreas />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}


