'use client'

import { useState, useEffect, useRef } from 'react'

// Student data for all classes
const studentData = {
  'IX-1': [
    'Alden Freda Hutapea', 'Bascelinus Gabriel Samosir', 'Birgitta Clarence Anabel Situmorang',
    'Boy Kevin Vincensius Karo Karo', 'Christian Dimitry Joaquin Purba', 'Daniel Mettiu Krisoli Sihite',
    'Feby Rosari Hutasoit', 'Grace Dellania Daely', 'Grisella Viane Sitanggang', 'Hendrick William Manurung',
    'Intan Hotmaita Solin', 'Jelita Permata Sari Br Sihombing', 'Joel Master Sigalingging',
    'Josua Gabriel Sinaga', 'Nadya Christabel Adora Sinaga', 'Nicolaus Varendra Komkaimu', 'Olivia Sirait',
    'Otto Bil Silaban', 'Paian Halomoan Sijabat', 'Raquel Marito Br. Simanungkalit',
    'Renata Juli Yanti Br Simanjuntak', 'Romualdus Sabastian Turnip', 'Samuel Siboro',
    'Steve Randy Tukunang', 'Tasya Aurelia Purba', 'Theresia Viona Valentine Br Siregar',
    'Vellysa Oktaviani Saragih', 'Wahyu Silaban', 'William Alfegio Saragih', 'Yohana Putri Hutapea',
    'Theresia Madelyn Saragih'
  ],
  'IX-2': [
    'Ayu Aprilia Tamba', 'Caroline Galia Paskah Sitanggang', 'Carolus Hotma Tua Barus',
    'Citra Ayu Agatha Sihite', 'Clinton Armando Simarmata', 'Daniel Simbolon', 'Delta Saputra Zega',
    'Erti Deo Tera Siahaan', 'Felix Hizkia Pandiangan', 'Gabriel Zanetty Purba',
    'Giska Ananda Evelyn Pakpahan', 'Glend Cristhoper Siahaan', 'Glory Pray Hutapea',
    'Gracia Margaret Br Tungkir Silalahi', 'Januari Sinaga', 'Joanna Sisilia Aruan',
    'Jovanka Marito Nainggolan', 'Medica Amanda Putri Sitorus', 'Melvin Buulolo', 'Nadya Natasya Br. Jawak',
    'Nicely Alexa Doane Lumbantobing', 'Nikita Cahaya Theresia Hutagaol', 'Noventhree Siahaan',
    'Rafael Pandi Sagala', 'Reguel Cristona Nainggolan', 'Rendy Sinaga', 'Restu Febrian Sinaga',
    'Revan Cristian Samuel Sihombing', 'Rindu Gracesia Sitorus Pane', 'Steven Saegel Simarmata',
    'Tirza Hana Putri Gultom', 'Tupal Pardamean Sagala'
  ],
  'IX-3': [
    'Agato Genetik Zamili', 'Amel Zebua', 'Brigitta Nauli Br Sinaga', 'Christ Abel Eliora Situngkir',
    'Clara Duma Riris Haloho', 'Daniel Octavianus Siahaan', 'Denada Natalyne Sianipar',
    'Desra Melinda Waty Simatupang', 'Dinda Silitonga', 'Dwi Safa Pinem', 'Fely Cristin Hutagalung',
    'Garly Fransiskus Theo Sitanggang', 'Gilbert Wageri Pasaribu', 'Gracia Uli Asi Br Turnip',
    'Graciella Simbolon', 'Jeremia Christian Simbolon', 'Limanri Oktania Gultom',
    'Melvin Alvin Ricardo Silitonga', 'Natalia Arleta Purba', 'Nehemia N P Nainggolan',
    'Oscarindo Abraham Lincol Samuel Silalahi', 'Palito De Alpacino Siregar', 'Ravael Ferdinand Hutagalung',
    'Reymon Tristan Sijabat', 'Santo Petrus Sihombing', 'Sarah Oktarisa Nababan', 'Theo Eduardo Pinem',
    'Willy Bonaventura Situmorang', 'Yustinus Sihar Syahputra Hutagaol', 'Niko Naek Tua Marbun',
    'Patricia Bella Paskah Siahaan'
  ]
}

// Countdown target date: June 2, 2:00 PM WIB (Asia/Jakarta)
const targetDate = new Date('2025-06-02T14:00:00+07:00')

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [showRandomResult, setShowRandomResult] = useState(false)
  const [randomResult, setRandomResult] = useState<{ name: string; status: string } | null>(null)
  const [showFinalResult, setShowFinalResult] = useState(false)
  const [showTapToReveal, setShowTapToReveal] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([])
  const [celebrate, setCelebrate] = useState(false)

  // Particle generation
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      duration: Math.random() * 3 + 2
    }))
    setParticles(newParticles)
  }, [])

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      const diff = targetDate.getTime() - now.getTime()

      if (diff <= 0) {
        setIsAnnouncementOpen(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(interval)
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Search functionality
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = searchQuery.trim().toLowerCase()

    if (!trimmedQuery) {
      alert('Silakan masukkan nama lengkap Anda')
      return
    }

    setIsSearching(true)
    setSearchResult(null)
    setShowRandomResult(false)
    setShowTapToReveal(false)
    setShowFinalResult(false)

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Find student
    let foundStudent: { name: string; className: string } | null = null

    for (const [className, students] of Object.entries(studentData)) {
      const found = students.find(student => student.toLowerCase() === trimmedQuery)
      if (found) {
        foundStudent = { name: found, className }
        break
      }
    }

    if (!foundStudent) {
      setIsSearching(false)
      alert('Nama tidak ditemukan. Silakan periksa kembali nama lengkap Anda.')
      return
    }

    setIsSearching(false)
    setSearchResult(foundStudent)
    setShowRandomResult(true)

    // Random pass/fail animation (simulate lottery)
    const results = [
      { name: foundStudent.name, status: 'LULUS' },
      { name: foundStudent.name, status: 'TIDAK LULUS' },
      { name: foundStudent.name, status: 'LULUS' },
      { name: foundStudent.name, status: 'TIDAK LULUS' },
      { name: foundStudent.name, status: 'LULUS' }
    ]

    let iteration = 0
    const interval = setInterval(() => {
      if (iteration < 15) {
        setRandomResult(results[Math.floor(Math.random() * results.length)])
        iteration++
      } else {
        clearInterval(interval)
        setShowRandomResult(false)
        setShowTapToReveal(true)
        setRandomResult(null)
      }
    }, 150)
  }

  const handleTapToReveal = () => {
    setShowTapToReveal(false)
    setShowFinalResult(true)
    setCelebrate(true)
  }

  const scrollToSection = () => {
    document.getElementById('announcement')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF9E6] to-white text-[#1A1A1A]">
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: '#F4C542',
              animation: `float ${particle.duration}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* School badge decoration */}
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-[#F4C542] to-[#FFD95A] flex items-center justify-center shadow-lg animate-bounce-slow">
            <span className="text-4xl font-bold text-white">🎓</span>
          </div>

          {/* Main title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight animate-slide-up">
            <span className="block text-[#F4C542]">PENGUMUMAN</span>
            <span className="block text-[#1A1A1A]">KELULUSAN</span>
          </h1>

          {/* Subtitle */}
          <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl font-semibold text-[#1A1A1A]">
              SMP SWASTA RK MAKMUR / BUDIMURNI-4
            </p>
            <p className="text-lg text-gray-600">Tahun Ajaran 2025/2026</p>
          </div>

          {/* Countdown */}
          {!isAnnouncementOpen ? (
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto">
                <p className="text-sm md:text-base text-gray-600 mb-4 font-medium">
                  Pengumuman akan dibuka dalam:
                </p>
                <div className="grid grid-cols-4 gap-3 md:gap-4">
                  {[
                    { value: timeLeft.days, label: 'Hari' },
                    { value: timeLeft.hours, label: 'Jam' },
                    { value: timeLeft.minutes, label: 'Menit' },
                    { value: timeLeft.seconds, label: 'Detik' }
                  ].map((item) => (
                    <div key={item.label} className="bg-gradient-to-br from-[#F4C542] to-[#FFD95A] rounded-xl p-3 md:p-4 text-center">
                      <span className="text-2xl md:text-4xl font-black text-white block">
                        {String(item.value).padStart(2, '0')}
                      </span>
                      <span className="text-xs md:text-sm font-medium text-white/90">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-4">
                  2 Juni 2025, 14:00 WIB
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={scrollToSection}
              className="animate-slide-up px-8 py-4 bg-gradient-to-r from-[#F4C542] to-[#FFD95A] text-[#1A1A1A] font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              style={{ animationDelay: '0.4s' }}
            >
              Lihat Pengumuman →
            </button>
          )}
        </div>
      </section>

      {/* Announcement Section */}
      <section id="announcement" className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] animate-fade-in">
              Cek Hasil Kelulusan
            </h2>
            <p className="text-gray-600 animate-fade-in">
              Masukkan nama lengkap Anda untuk melihat hasil
            </p>
          </div>

          {!isAnnouncementOpen ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Pengumuman Belum Dibuka</h3>
              <p className="text-gray-600">
                Silakan tunggu hingga 2 Juni 2025, pukul 14:00 WIB
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Search form */}
              <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda..."
                    className="flex-1 px-6 py-4 rounded-xl border-2 border-[#F4C542] focus:outline-none focus:border-[#FFD95A] text-lg transition-colors"
                    disabled={isSearching}
                  />
                  <button
                    type="submit"
                    disabled={isSearching || !searchQuery.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-[#F4C542] to-[#FFD95A] text-[#1A1A1A] font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSearching ? 'Mencari...' : 'Cek Hasil'}
                  </button>
                </div>
              </form>

              {/* Loading state */}
              {isSearching && (
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-pulse">
                  <div className="text-6xl mb-4 animate-spin">🎰</div>
                  <h3 className="text-xl font-bold mb-2">Sedang Memeriksa...</h3>
                  <p className="text-gray-600">
                    Memproses data kelulusan Anda
                  </p>
                </div>
              )}

              {/* Random result animation */}
              {showRandomResult && randomResult && (
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-shake">
                  <div className="text-6xl mb-4">🎲</div>
                  <h3 className="text-2xl font-bold mb-4">{randomResult.name}</h3>
                  <div className={`text-3xl md:text-5xl font-black px-6 py-4 rounded-xl inline-block ${
                    randomResult.status === 'LULUS' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {randomResult.status}
                  </div>
                </div>
              )}

              {/* Tap to reveal */}
              {showTapToReveal && (
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-bounce">
                  <div className="text-6xl mb-4">🎁</div>
                  <h3 className="text-2xl font-bold mb-4">Selamat!</h3>
                  <p className="text-gray-600 mb-6">
                    Hasil kelulusan Anda sudah siap
                  </p>
                  <button
                    onClick={handleTapToReveal}
                    className="px-12 py-4 bg-gradient-to-r from-[#F4C542] to-[#FFD95A] text-[#1A1A1A] font-bold text-xl rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    TAP UNTUK MELIHAT HASIL
                  </button>
                </div>
              )}

              {/* Final result */}
              {showFinalResult && searchResult && (
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-slide-up">
                  {celebrate && (
                    <div className="fixed inset-0 pointer-events-none z-50">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute text-4xl animate-confetti"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `-50px`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${Math.random() * 2 + 2}s`
                          }}
                        >
                          {['🎉', '🎊', '✨', '🌟', '🎓'][Math.floor(Math.random() * 5)]}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-6xl mb-4 animate-bounce">🎊</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {searchResult.className}
                  </h3>
                  <h2 className="text-2xl md:text-3xl font-black mb-6">
                    {searchResult.name}
                  </h2>
                  <div className="bg-gradient-to-r from-green-400 to-green-600 text-white text-4xl md:text-6xl font-black px-8 py-6 rounded-2xl inline-block shadow-lg animate-scale-up">
                    LULUS
                  </div>
                  <p className="text-gray-600 mt-6 text-lg">
                    Selamat! Anda berhasil lulus dan melanjutkan ke jenjang berikutnya.
                  </p>
                  <div className="mt-8 flex justify-center gap-4">
                    {['🎉', '🎓', '✨', '🌟', '🎊'].map((emoji, i) => (
                      <span key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                        {emoji}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#F4C542] text-[#1A1A1A] py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-semibold">© 2025 SMP SWASTA RK MAKMUR / BUDIMURNI-4</p>
          <p className="text-sm text-[#1A1A1A]/80 mt-1">
            Selamat kepada semua siswa yang telah menyelesaikan pendidikan
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }

        @keyframes scale-up {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-scale-up {
          animation: scale-up 0.6s ease-out;
        }

        .animate-confetti {
          animation: confetti 4s ease-out forwards;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  )
}