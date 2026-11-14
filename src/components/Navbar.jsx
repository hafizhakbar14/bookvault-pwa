export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <button 
        className={activeTab === 'catalog' ? 'nav-btn active' : 'nav-btn'} 
        onClick={() => setActiveTab('catalog')}
      >
        📖 Katalog & CRUD
      </button>
      <button 
        className={activeTab === 'favorites' ? 'nav-btn active' : 'nav-btn'} 
        onClick={() => setActiveTab('favorites')}
      >
        ❤️ Favorit
      </button>
      <button 
        className={activeTab === 'profile' ? 'nav-btn active' : 'nav-btn'} 
        onClick={() => setActiveTab('profile')}
      >
        👤 Profil
      </button>
    </nav>
  )
}