export default function FavoritesPage({ favorites, onToggleFavorite }) {
  return (
    <div className="page-container">
      <h2>Daftar Buku Favorit Anda</h2>
      {favorites.length === 0 ? (
        <p className="empty-state">Belum ada buku favorit yang ditambahkan.</p>
      ) : (
        <div className="book-grid">
          {favorites.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>Penulis: {book.author} ({book.year})</p>
              </div>
              <button 
                onClick={() => onToggleFavorite(book)} 
                className="btn-fav active"
              >
                ❤️ Hapus dari Favorit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}