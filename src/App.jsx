import { useState } from 'react'
import Navbar from './components/Navbar'
import CatalogPage from './pages/CatalogPage'
import FavoritesPage from './pages/FavoritesPage'
import ProfilePage from './pages/ProfilePage'
import PWABadge from './components/PWABadge'
import './App.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog')
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('bookvault_favs')
    return saved ? JSON.parse(saved) : []
  })

  // Fungsi Toggle Favorit
  const handleToggleFavorite = (book) => {
    let updatedFavs
    if (favorites.some(fav => fav.id === book.id)) {
      updatedFavs = favorites.filter(fav => fav.id !== book.id)
    } else {
      updatedFavs = [...favorites, book]
    }
    setFavorites(updatedFavs)
    localStorage.setItem('bookvault_favs', JSON.stringify(updatedFavs))
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>BookVault 📚 PWA Responsi</h1>
      </header>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="app-main">
        {activeTab === 'catalog' && (
          <CatalogPage 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite} 
          />
        )}
        {activeTab === 'favorites' && (
          <FavoritesPage 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite} 
          />
        )}
        {activeTab === 'profile' && <ProfilePage />}
      </main>

      <PWABadge />

      <footer className="app-footer">
        <p>Responsi Praktikum PPB 2026</p>
      </footer>
    </div>
  )
}