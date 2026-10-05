export default function KontakPage() {
    return(
        <main style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <div style={{backgroundColor: "#f0f0f0", borderRadius: "8px",padding:"30px",margin :"20px"}}>
            <h1 style={{color: "blue"}}>Kontak</h1>
            <p style={{color:"blue"}}>Ini adalah halaman kontak.</p>
            <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <h2 style={{color: "blue"}}>Informasi Kontak</h2>
                 <a href="https://www.instagram.com/m_fahd.28" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Instagram
                </a>
                <a href="mailto:mmalikfahd8@gmail.com" className="text-blue-500 hover:underline">
                    Email
                </a>
            </div>
        </div>
        </main>
    )
}