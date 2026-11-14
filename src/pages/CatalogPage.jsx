import { useState, useEffect } from 'react'

export default function CatalogPage({ favorites, onToggleFavorite }) {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('bookvault_books')
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Pemrograman Web Progressive', author: 'Alexandro', year: 2024 },
      { id: 2, title: 'Arsitektur RESTful API Modern', author: 'Sarah Wijaya', year: 2025 }
    ]
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    localStorage.setItem('bookvault_books', JSON.stringify(books))
  }, [books])

  // Create & Update (Submit Handler)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !author || !year) return

    if (editId !== null) {
      // Aksi Update
      setBooks(books.map(b => b.id === editId ? { ...b, title, author, year } : b))
      setEditId(null)
    } else {
      // Aksi Create
      const newBook = { id: Date.now(), title, author, year }
      setBooks([...books, newBook])
    }
    setTitle('')
    setAuthor('')
    setYear('')
  }

  // Persiapan Edit
  const handleEdit = (book) => {
    setEditId(book.id)
    setTitle(book.title)
    setAuthor(book.author)
    setYear(book.year)
  }

  // Aksi Delete
  const handleDelete = (id) => {
    setBooks(books.filter(b => b.id !== id))
  }

  return (
    <div className="page-container">
      <h2>Manajemen Katalog Buku (CRUD)</h2>
      
      {/* Form Input Data */}
      <form onSubmit={handleSubmit} className="crud-form">
        <input 
          type="text" 
          placeholder="Judul Buku" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Penulis" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Tahun Terbit" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          required 
        />
        <button type="submit" className="btn-submit">
          {editId !== null ? 'Simpan Perubahan' : 'Tambah Buku Baru'}
        </button>
      </form>

      {/* List / Grid Data */}
      <div className="book-grid">
        {books.map(book => {
          const isFav = favorites.some(fav => fav.id === book.id)
          return (
            <div key={book.id} className="book-card">
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>Penulis: {book.author} ({year || book.year})</p>
              </div>
              <div className="book-actions">
                <button 
                  onClick={() => onToggleFavorite(book)} 
                  className={`btn-fav ${isFav ? 'active' : ''}`}
                >
                  {isFav ? '❤️ Disukai' : '🤍 Suka'}
                </button>
                <button onClick={() => handleEdit(book)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(book.id)} className="btn-delete">Hapus</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}