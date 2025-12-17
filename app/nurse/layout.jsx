
import "@/style/css/home.css"
import 'react-toastify/dist/ReactToastify.css' // ✅ Import CSS

export default function NurseLayout({ children }) {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-teal-50 to-white">
            {children}
        </div>
    )
}
